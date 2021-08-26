import {LaunchBetCommand} from './launchBetCommand'
import {IBetRepository} from '../../iBetRepository'

export class LaunchBetCommandHandler {
    constructor(private betRepository: IBetRepository) {}

    async handle(command: LaunchBetCommand) {
        await this.betRepository.save(command.betId,
                                     command.description,
                                     command.endDate,
                                     command.tokens)
    }
}