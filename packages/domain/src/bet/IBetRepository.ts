import { Bet } from "./bet";

export interface IBetRepository {
    getById(betId: string) : Promise<Bet>
    save(bet: Bet) : Promise<void>
}