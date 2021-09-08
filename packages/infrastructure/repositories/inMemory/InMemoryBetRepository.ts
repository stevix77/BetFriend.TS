import {IBetRepository} from '../../../domain/src/bet/IBetRepository'
import {Bet} from '../../../domain/src/bet/Bet'

export class InMemoryBetRepository implements IBetRepository{

    private bets: Bet[]

    constructor() {
        this.bets = [];
    }

    getBets() {
        return this.bets;
    }

    save(bet: Bet): Promise<void> {
        this.bets.push(bet);
        return new Promise(resolve => resolve())
    }
}