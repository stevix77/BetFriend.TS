import {IUuidGenerator} from '../src/bet/IUuidGenerator'
import {LaunchBetCommand} from '../src/bet/usecases/launchBet/LaunchBetCommand'
import {IPresenterOutput, LaunchBetCommandHandler} from '../src/bet/usecases/launchBet/LaunchBetCommandHandler'
import {LocalUUIDGenerator} from './adapters/LocalUUIDGenerator'
import {IBetRepository} from '../src/bet/IBetRepository'
import {InMemoryBetRepository} from '../../infrastructure/repositories/inMemory/InMemoryBetRepository'
import { LocalDateTimeProvider } from './adapters/LocalDateTimeProvider'
import { IDateTimeProvider } from '../src/bet/IDateTimeProvider'
import { Bet } from '../src/bet/Bet'

describe("launch bet handler", () => {
    test('should create bet when model is valid', async () => {
        //arrange
        const uuidGenerator: IUuidGenerator = new LocalUUIDGenerator();
        const description = "description"
        const endDate: Date = new Date(2021, 8, 2)
        const command = new LaunchBetCommand(description, 
                                            endDate,
                                            30)
        const presenter = new LaunchBetPresenter();
        const betRepository: IBetRepository = new InMemoryBetRepository()
        const handler = new LaunchBetCommandHandler(betRepository, 
                                                new LocalDateTimeProvider(new Date(2021, 4, 4)),
                                                uuidGenerator,
                                                presenter)

        //act
        await handler.handle(command)

        //assert
        expect(presenter.viewModel.id).not.toBeNull()
        expect(presenter.viewModel.description).toEqual(command.description)
        expect(presenter.viewModel.tokens).toEqual(command.tokens)
        expect(presenter.viewModel.endDate).toEqual(command.endDate)
    });

    test('should throw Error when description is empty', async() => {
        
        //arrange
        const description = ""
        const endDate: Date = new Date(2000, 2, 2)
        const command = new LaunchBetCommand(description, 
                                            endDate,
                                            1)

        const betRepository: IBetRepository = new InMemoryBetRepository()
        const presenter = new LaunchBetPresenter()
        const handler = new LaunchBetCommandHandler(betRepository, new LocalDateTimeProvider(new Date(2000, 1, 1)), new LocalUUIDGenerator(), presenter)

        //act
        await handler.handle(command);

        //assert
        expect(presenter.viewModel.error.property).toBe("description")
        expect(presenter.viewModel.error.message).toBe('description is required')
    })

    test('should throw Error when the end date is before current date', async() => {
        
        //arrange
        const uuidGenerator: IUuidGenerator = new LocalUUIDGenerator();
        const description = "description"
        const endDate: Date = new Date(2021, 2, 2)
        const command = new LaunchBetCommand(description, 
                                            endDate,
                                            1)

        const betRepository: IBetRepository = new InMemoryBetRepository()
        const dateTimeProvider: IDateTimeProvider = new LocalDateTimeProvider(new Date(2021, 7, 20))
        const presenter = new LaunchBetPresenter()
        const handler = new LaunchBetCommandHandler(betRepository, dateTimeProvider, new LocalUUIDGenerator(), presenter)

        //act
        await handler.handle(command)
        
        //assert
        expect(presenter.viewModel.error.property).toBe("endDate")
        expect(presenter.viewModel.error.message).toBe('end date must be after the current date')
    })
})

export class LaunchBetPresenter implements IPresenterOutput<BetViewModel> {
    viewModel: BetViewModel | any = {}
    present(obj: Bet) : void{
        this.viewModel = {
            id: obj.getBetId(),
            description: obj.getDescription(),
            endDate: obj.getEndDate(),
            tokens: obj.getTokens()
        };
    }
}

export class BetViewModel {
    id: string;
    description: string;
    endDate: Date;
    tokens: number;
}