export interface IBetRepository {
    getById(betId: string)
    save(betId: string,
        description: string,
        endDate: Date,
        tokens: number)    
}