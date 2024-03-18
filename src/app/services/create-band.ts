import { Band } from "../entities/band";
import { BandRepository } from "../repositories/bands-repositories";

interface CreateBrandRequest{
    band: Band
}

type CreateBrandResponse = Band

export class CreateBand {

    constructor(private repository: BandRepository){}

    getRepository(){
        return this.repository
    }

    async create(req: CreateBrandRequest): Promise<CreateBrandResponse>{
        const b = req.band
        await this.repository.create(b)
        return b
    }
}