import {IUuidGenerator} from '../../src/bet/domain/iuuidGenerator'
export class LocalUUIDGenerator implements IUuidGenerator {
    generate() {
        return "uuid-genere"
    }
}