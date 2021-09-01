import { IDateTimeProvider } from '../../src/bet/IDateTimeProvider';
export class LocalDateTimeProvider implements IDateTimeProvider {

    constructor(private date: Date) {

    }
    getDate(): Date {
        return this.date
    }

}