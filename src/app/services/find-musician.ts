import { Musician } from "../entities/musician"
import { MusicianRepository } from "../repositories/musicians-repositories"

interface FindMusicianRequest {
    name: string
}

type FindMusicianResponse = Musician | null

export class FindMusician {

    constructor(private musicanRepository: MusicianRepository) { }

    async execute({ name }: FindMusicianRequest): Promise<FindMusicianResponse> {

        const musician = await this.musicanRepository.findByName(name)

        if (musician) return musician
        else return null
    }
}