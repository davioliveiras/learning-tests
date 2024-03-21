import { Musician } from "../../entities/musician"
import { MusicianRepository } from "../../repositories/musicians-repositories"

interface AddOccupationRequest {
    name: string
    occupation: string
}

export class AddOccupation {

    constructor(private musicanRepository: MusicianRepository) { }

    async execute({ name, occupation }: AddOccupationRequest): Promise<void> {

        const m = await this.musicanRepository.findMusicianByName(name)
        if (!m) throw new Error('A ocupação não foi adicionada pois esse músico não foi encontrado')

        m.getOcupations().map((musicianOccupations) => {
            if (musicianOccupations.includes(occupation)) {
                throw new Error('Esse músico já tem essa ocupação')
            }
        })
        await this.musicanRepository.addOccupation(name, occupation)
    }
}