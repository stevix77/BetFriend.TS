import { IDateTimeProvider } from "../../src/bet/domain/iDateTimeProvider";

export class LocalDateTimeProvider implements IDateTimeProvider {
    constructor(private date: Date) {}
    
    getDate(): Date {
        return this.date
    }

}