import { Bet } from "./bet";

export interface IBetRepository {
    save(bet: Bet) : Promise<void>
}