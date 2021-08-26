import {IUuidGenerator} from '../../iuuidGenerator'
export class LaunchBetCommand {

    betId: string

    constructor(private uuidGenerator: IUuidGenerator,
                public description: string,
                public endDate: Date,
                public tokens: number) {
                    this.betId = uuidGenerator.generate().toString()

                }
}