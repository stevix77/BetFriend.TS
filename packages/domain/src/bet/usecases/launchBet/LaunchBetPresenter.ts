import { Bet } from "../../Bet";

export interface ILaunchBetPresenter {
    fail(arg0: { property: string; message: string; });
    present(bet: Bet) : void
}