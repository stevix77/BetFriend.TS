import {IUuidGenerator} from '../src/bet/IUuidGenerator'
import {LaunchBetCommand} from '../src/bet/usecases/launchBet/LaunchBetCommand'
import { LaunchBetCommandHandler} from '../src/bet/usecases/launchBet/LaunchBetCommandHandler'
import {LocalUUIDGenerator} from './adapters/LocalUUIDGenerator'
import {InMemoryBetRepository} from '../../infrastructure/repositories/inMemory/InMemoryBetRepository'
import { LocalDateTimeProvider } from './adapters/LocalDateTimeProvider'
import { IDateTimeProvider } from '../src/bet/IDateTimeProvider'
import { LaunchBetPresenter } from './adapters/LaunchBetPresenter'
import { LaunchCommandBuilder } from './builders/launchCommandBuilder'
import { LaunchCommandHandlerBuilder } from './builders/LaunchCommandHandlerBuilder'

describe("launch bet handler", () => {
    
    test('should create bet when model is valid', async () => {
        
        //arrange
        const command = new LaunchCommandBuilder()
                                    .withDescription("description")
                                    .withEndDate(new Date(2021, 8, 2))
                                    .withTokens(30)
                                    .build();
        const repo = new InMemoryBetRepository();
        const handler = new LaunchCommandHandlerBuilder()
                                .withBetRepository(repo)
                                .withDateTimeProvider(new LocalDateTimeProvider(new Date(2021, 4, 4)))
                                .build();

        //act
        await handler.handle(command)

        //assert
        const bet = repo.getBets()[0];
        expect(bet).not.toBe(null)
        expect(bet.getTokens()).toEqual(command.tokens)
        expect(bet.getEndDate()).toEqual(command.endDate)
        expect(bet.getDescription()).toEqual(command.description)
    });

    test('bet should not be saved when description is empty', async() => {
        
        //arrange
        const description = ""
        const endDate: Date = new Date(2000, 2, 2)
        const command = new LaunchBetCommand(description, 
                                            endDate,
                                            1)

        const betRepository = new InMemoryBetRepository()
        const presenter = new LaunchBetPresenter()
        const handler = new LaunchBetCommandHandler(betRepository, new LocalDateTimeProvider(new Date(2000, 1, 1)), new LocalUUIDGenerator(), presenter)

        //act
        await handler.handle(command);

        //assert
        const bet = betRepository.getBets()[0] 
        expect(bet).toBe(undefined)
    })

    test('should throw Error when the end date is before current date', async() => {
        
        //arrange
        const uuidGenerator: IUuidGenerator = new LocalUUIDGenerator();
        const description = "description"
        const endDate: Date = new Date(2021, 2, 2)
        const command = new LaunchBetCommand(description, 
                                            endDate,
                                            1)

        const betRepository = new InMemoryBetRepository()
        const dateTimeProvider: IDateTimeProvider = new LocalDateTimeProvider(new Date(2021, 7, 20))
        const presenter = new LaunchBetPresenter()
        const handler = new LaunchBetCommandHandler(betRepository, dateTimeProvider, new LocalUUIDGenerator(), presenter)

        //act
        await handler.handle(command)
        
        //assert
        const bet = betRepository.getBets()[0] 
        expect(bet).toBe(undefined)
    })

    
})
