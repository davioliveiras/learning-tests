import { Band } from "@/app/entities/band";
import { Musician } from "@/app/entities/musician";
import { BandRepository } from "@/app/repositories/bands-repositories";

interface FindBandByMusiciansRequest {
    name: string
}

interface FindBandByMusiciansResponse {
    bands: Band[]
}

export class FindBandsByMusician {

    constructor(private bandRepo: BandRepository) { }

    async execute(req: FindBandByMusiciansRequest): Promise<FindBandByMusiciansResponse | null> {
        const b = await this.bandRepo.findByMusician(req.name)
        if (b) {
            return { bands: b }
        }
        else {
            return null
        }
    }
}