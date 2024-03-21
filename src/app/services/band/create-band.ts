import { Musician } from "@/app/entities/musician";
import { Band } from "../../entities/band";
import { BandRepository } from "../../repositories/bands-repositories";
import { MusicianRepository } from "../../repositories/musicians-repositories";

interface CreateBrandRequest {
    name: string,
    formedAt: number,
    country: string,
    site: string,
    members: string[]
}

export class CreateBand {

    constructor(private repository: BandRepository) { }

    async execute(req: CreateBrandRequest): Promise<Band> {
        const b = req

        if (await this.repository.findBandByName(b.name)) {
            throw new Error('Uma banda com esse nome já existe.')
        }

        if (b.members.length < 2) {
            throw new Error('A banda precisa ser criada com pelo menos dois membros.')
        }

        let e = false
        await b.members.forEach(async (item) => {
            const hasMusician = await this.repository.findMusiciansToCreateBand(item)
            if (!hasMusician)
                e = true
        })

        if (e) {
            throw new Error('A banda não foi criada. Pelo menos um dos músicos não foi encontrado.')
        }

        const band = await this.repository.create(b.name, b.formedAt, b.country, b.site)

        b.members.forEach(async (item) => {
            await this.repository.addMember(item, band.getName())
        })

        return band
    }
}