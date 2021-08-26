import {IBetRepository} from '../domain/iBetRepository'
import {Bet} from '../../bet/domain/bet'

export class InMemoryBetRepository implements IBetRepository{

    bets: Bet[]

    constructor(bets: Bet[] = null) {
        this.bets = bets == null ? [] : bets
    }

    getById(betId: string) {
        return this.bets[0]
    }

    save(betId: string,
        description: string,
        endDate: Date,
        tokens: number) {
            this.bets.push(new Bet())
        }
}