import { Band } from "../../entities/band"
import { Musician } from "../../entities/musician"
import { MusicianRepository } from "../../repositories/musicians-repositories"

interface FindMusicianRequest {
    name: string
}

type FindMusicianResponse = { musician: Musician, bands: Band[] | null } | null

export class FindMusician {

    constructor(private musicanRepository: MusicianRepository) { }

    async execute({ name }: FindMusicianRequest): Promise<FindMusicianResponse> {

        const musician = await this.musicanRepository.findMusicianByName(name)

        if (musician) {
            const bands = await this.musicanRepository.findMusicianBands(name)
            return { musician: musician, bands: bands }
        }
        else return null
    }
}