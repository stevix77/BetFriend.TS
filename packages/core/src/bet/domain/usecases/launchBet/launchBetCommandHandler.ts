import {LaunchBetCommand} from './LaunchBetCommand'
import {IBetRepository} from '../../IBetRepository'
import { IDateTimeProvider } from '../../iDateTimeProvider';
import { IUuidGenerator } from '../../iuuidGenerator';
import { Bet } from '../../bet';

export class LaunchBetCommandHandler {
    constructor(private betRepository: IBetRepository,
                private dateTimeProvider: IDateTimeProvider,
                private uuidGenerator: IUuidGenerator) {}

    async handle(command: LaunchBetCommand) : Promise<string> {
        
        this.validateCommand(command);
            
        const betId = this.uuidGenerator.generate();
        const bet = new Bet(betId, 
                            command.description,
                            command.endDate,
                            command.tokens)
        await this.betRepository.save(bet);

        return betId;

    }

    private validateCommand(command: LaunchBetCommand) {
        if (command.description.length == 0) {
            throw new Error('description is required');
        }

        if (command.endDate < this.dateTimeProvider.getDate()) {
            throw new Error('end date must be after the current date');
        }
    }
}