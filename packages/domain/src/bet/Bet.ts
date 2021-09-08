export class Bet {
    
    constructor(private betId: string,
        private description: string,
        private endDate: Date,
        private tokens: number) {}

        getTokens(): number {
            return this.tokens;
        }
        getEndDate(): Date {
            return this.endDate;
        }
        getDescription(): string {
            return this.description;
        }
        
}