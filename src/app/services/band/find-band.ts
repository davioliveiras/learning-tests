import { Band } from "@/app/entities/band";
import { Musician } from "@/app/entities/musician";
import { BandRepository } from "@/app/repositories/bands-repositories";

interface FindBandByNameRequest {
    name: string
}

interface FindBandByNameResponse {
    band: Band,
    musicians: Array<Musician>
}

export class FindBandByName {

    constructor(private bandRepo: BandRepository) { }

    async execute(req: FindBandByNameRequest): Promise<FindBandByNameResponse | null> {
        const b = await this.bandRepo.findBandByName(req.name)
        if (b) {
            const m = await this.bandRepo.findMembersBand(req.name)
            const response = {
                band: b,
                musicians: m
            }
            return response
        }
        else {
            return null
        }
    }
}