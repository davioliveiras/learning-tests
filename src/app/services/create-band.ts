import { Band } from "../entities/band";
import { BandRepository } from "../repositories/bands-repositories";

interface CreateBrandRequest {
    name: string,
    formedAt: number,
    country: string,
    site: string,
    memberName1: string, memberName2: string
}

type CreateBrandResponse = string

export class CreateBand {

    constructor(private repository: BandRepository) { }

    getRepository() {
        return this.repository
    }

    async create(req: CreateBrandRequest): Promise<CreateBrandResponse> {
        const b = req
        await this.repository.create(b.name, b.formedAt, b.country, b.site, b.memberName1, b.memberName2)
        return b.name
    }
}