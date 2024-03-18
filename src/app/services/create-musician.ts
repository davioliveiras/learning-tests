import { Musician } from "../entities/musician"
import { MusicianRepository } from "../repositories/musicians-repositories"

interface CreateMusicianRequest {
    name: string
    fullName: string
    email: string
    birthday: Date
    country: string
    occupations: string[]
    description: string
    site?: string
}

type CreateMusicianResponse = Musician

export class CreateMusician {

    constructor(private musicanRepository: MusicianRepository){}

    async execute({name, fullName, email, birthday, country, occupations, 
        description, site}: CreateMusicianRequest): Promise<CreateMusicianResponse> {

        const musicianAlreadyCreated = await this.musicanRepository.findByName(name)

        if (musicianAlreadyCreated) throw new Error('Esse músico já está cadastrado.')

        const musician = new Musician(name, fullName, email, birthday, country, occupations, description, site)

        await this.musicanRepository.create(musician)

        return musician
    }
}