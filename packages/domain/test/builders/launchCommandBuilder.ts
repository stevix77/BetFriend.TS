import { LaunchBetCommand } from "../../src/bet/usecases/launchBet/LaunchBetCommand";

export class LaunchCommandBuilder {
    private description: string = ""
    private endDate: Date
    private tokens: number

    withDescription(description: string) {
        this.description = description;
        return this;
    }

    withEndDate(date: Date) {
        this.endDate = date;
        return this;
    }

    withTokens(tokens: number) {
        this.tokens = tokens;
        return this;
    }

    build() {
        return new LaunchBetCommand(this.description, 
                                    this.endDate,
                                    this.tokens)
    }
}