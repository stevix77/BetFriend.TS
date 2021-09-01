import {IBetRepository} from '../../../domain/src/bet/IBetRepository'
import {Bet} from '../../../domain/src/bet/Bet'

export class InMemoryBetRepository implements IBetRepository{

    bets: Bet[]

    constructor() {
        this.bets = [];
    }

    getById(betId: string) : Promise<Bet> {
        const bet = this.bets.find(x => x.getBetId() == betId);
        return new Promise(resolve => resolve(bet))
    }

    save(bet: Bet): Promise<void> {
        this.bets.push(bet);
        return new Promise(resolve => resolve())
    }
}