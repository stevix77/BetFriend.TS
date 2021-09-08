import { InMemoryBetRepository } from "../../../infrastructure/repositories/inMemory/InMemoryBetRepository";
import { IBetRepository } from "../../src/bet/IBetRepository";
import { IDateTimeProvider } from "../../src/bet/IDateTimeProvider";
import { IUuidGenerator } from "../../src/bet/IUuidGenerator";
import { LaunchBetCommandHandler } from "../../src/bet/usecases/launchBet/LaunchBetCommandHandler";
import { ILaunchBetPresenter } from "../../src/bet/usecases/launchBet/LaunchBetPresenter";
import { LaunchBetPresenter } from "../adapters/LaunchBetPresenter";
import { LocalDateTimeProvider } from "../adapters/LocalDateTimeProvider";
import { LocalUUIDGenerator } from "../adapters/LocalUUIDGenerator";

export class LaunchCommandHandlerBuilder {
    private betRepository: IBetRepository;
    private dateTimeProvider: IDateTimeProvider;
    private uuidGenerator: IUuidGenerator;
    private presenter: ILaunchBetPresenter;

    constructor() {
        this.uuidGenerator = new LocalUUIDGenerator();
        this.presenter = new LaunchBetPresenter();
        this.betRepository = new InMemoryBetRepository()
        this.dateTimeProvider = new LocalDateTimeProvider(new Date())
    }

    withDateTimeProvider(dateTimeProvider: IDateTimeProvider) {
        this.dateTimeProvider = dateTimeProvider;
        return this;
    }

    withBetRepository(betRepository: IBetRepository) {
        this.betRepository = betRepository;
        return this;
    }

    build() {
        return new LaunchBetCommandHandler(this.betRepository,
                                            this.dateTimeProvider,
                                            this.uuidGenerator,
                                            this.presenter)
    }
}