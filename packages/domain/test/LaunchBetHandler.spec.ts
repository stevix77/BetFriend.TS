import {IUuidGenerator} from '../src/bet/IUuidGenerator'
import {LaunchBetCommand} from '../src/bet/usecases/launchBet/LaunchBetCommand'
import {LaunchBetCommandHandler} from '../src/bet/usecases/launchBet/LaunchBetCommandHandler'
import {LocalUUIDGenerator} from './adapters/LocalUUIDGenerator'
import {IBetRepository} from '../src/bet/IBetRepository'
import {InMemoryBetRepository} from '../../infrastructure/repositories/inMemory/InMemoryBetRepository'
import { LocalDateTimeProvider } from './adapters/LocalDateTimeProvider'
import { IDateTimeProvider } from '../src/bet/IDateTimeProvider'

describe("launch bet handler", () => {
    test('should create bet when model is valid', async () => {
        //arrange
        const uuidGenerator: IUuidGenerator = new LocalUUIDGenerator();
        const description = "description"
        const endDate: Date = new Date(2021, 8, 2)
        const command = new LaunchBetCommand(description, 
                                            endDate,
                                            30)
        const betRepository: IBetRepository = new InMemoryBetRepository()
        const handler = new LaunchBetCommandHandler(betRepository, 
                                                new LocalDateTimeProvider(new Date(2021, 4, 4)),
                                                uuidGenerator)

        //act
        const betId = await handler.handle(command)

        //assert
        const bet = await betRepository.getById(betId)
        expect(bet).not.toBe(undefined)
        expect(bet.getBetId()).toEqual(betId)
        expect(bet.getDescription()).toEqual(command.description)
        expect(bet.getTokens()).toEqual(command.tokens)
        expect(bet.getEndDate()).toEqual(command.endDate)
    });

    test('should throw Error when description is empty', async() => {
        
        //arrange
        const description = ""
        const endDate: Date = new Date(2000, 2, 2)
        const command = new LaunchBetCommand(description, 
                                            endDate,
                                            1)

        const betRepository: IBetRepository = new InMemoryBetRepository()
        const handler = new LaunchBetCommandHandler(betRepository, null, null)

        //act
        const error = handler.handle(command)

        //assert
        await expect(error).rejects.toThrowError('description is required')
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
        const handler = new LaunchBetCommandHandler(betRepository, dateTimeProvider, null)

        //act
        const error = handler.handle(command)
        
        //assert
        await expect(error).rejects.toThrowError('end date must be after the current date')
    })
})