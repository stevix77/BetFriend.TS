import {IUuidGenerator} from '../src/bet/domain/iuuidGenerator'
import {LaunchBetCommand} from '../src/bet/domain/usecases/launchBet/launchBetCommand'
import {LaunchBetCommandHandler} from '../src/bet/domain/usecases/launchBet/launchBetCommandHandler'
import {LocalUUIDGenerator} from './infra/localUUIDGenerator'
import {IBetRepository} from '../src/bet/domain/iBetRepository'
import {InMemoryBetRepository} from '../src/bet/infra/inMemoryBetRepository'

describe("launch bet handler", () => {
    test('should create bet when model is valid', async () => {
        //arrange
        const uuidGenerator: IUuidGenerator = new LocalUUIDGenerator();
        const description = "description"
        const endDate: Date = new Date()
        const command = new LaunchBetCommand(uuidGenerator, 
                                            description, 
                                            endDate,
                                            30)
        const betRepository: IBetRepository = new InMemoryBetRepository()
        const handler = new LaunchBetCommandHandler(betRepository)

        //act
        await handler.handle(command)

        //assert
        const bet = betRepository.getById(command.betId)
        expect(bet).not.toBe(undefined)
    });
})