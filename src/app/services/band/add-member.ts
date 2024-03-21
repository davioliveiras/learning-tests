import { BandRepository } from "../../repositories/bands-repositories";

export class AddMemberService {

    constructor(public bandRepo: BandRepository) { }

    async execute(musicianName: string, bandName: string): Promise<string> {
        if (await this.bandRepo.findMusiciansToCreateBand(musicianName) == null)
            throw new Error('Músico não encontrado.')

        if (await this.bandRepo.findBandByName(bandName) == null)
            throw new Error('Banda não encontrada.')

        const members = await this.bandRepo.findMembersBand(bandName)
        members.find((item) => {
            if (item.getName() == musicianName)
                throw new Error('O músico já está na banda.')
        })

        await this.bandRepo.addMember(musicianName, bandName)
        return 'Adicionado.'

    }
}