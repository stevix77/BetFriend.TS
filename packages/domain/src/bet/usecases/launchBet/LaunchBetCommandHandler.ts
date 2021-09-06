import {LaunchBetCommand} from './LaunchBetCommand'
import {IBetRepository} from '../../IBetRepository'
import { IDateTimeProvider } from '../../iDateTimeProvider';
import { IUuidGenerator } from '../../iuuidGenerator';
import { Bet } from '../../bet';
import { BetViewModel } from '../../../../test/LaunchBetHandler.spec';

export class LaunchBetCommandHandler {
    constructor(private betRepository: IBetRepository,
                private dateTimeProvider: IDateTimeProvider,
                private uuidGenerator: IUuidGenerator,
                private presenter: IPresenterOutput<BetViewModel>) {}

    async handle(command: LaunchBetCommand) : Promise<void> {
        this.validateCommand(command);
        if(this.presenter.viewModel.error)
            return;
                
        const betId = this.uuidGenerator.generate();
        const bet = new Bet(betId, 
                            command.description,
                            command.endDate,
                            command.tokens)
        await this.betRepository.save(bet);
        
        this.presenter.present(bet)

    }

    private validateCommand(command: LaunchBetCommand) {
        if (command.description.length == 0) {
            this.presenter.viewModel.error = {
                property: "description",
                message: 'description is required'
            }
        }

        if (command.endDate < this.dateTimeProvider.getDate()) {
            this.presenter.viewModel.error = {
                property: "endDate",
                message: 'end date must be after the current date'
            }
        }
    }
}

export interface IPresenterOutput<T> {
    viewModel: T | any
    present(obj: any);
    // fail()
}