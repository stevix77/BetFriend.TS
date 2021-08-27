import {IUuidGenerator} from '../../src/bet/domain/IUuidGenerator'
export class LocalUUIDGenerator implements IUuidGenerator {
    generate() {
        return "uuid-genere"
    }
}