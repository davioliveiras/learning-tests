import { BandRepository } from "../../repositories/bands-repositories";

export class RemoveMemberService {
    constructor(public bandRepo: BandRepository) { }

    async execute(musicianName: string, bandName: string): Promise<string> {

        if (await this.bandRepo.findMusiciansToCreateBand(musicianName) == null)
            throw new Error('Músico não encontrado.')

        if (await this.bandRepo.findBandByName(bandName) == null)
            throw new Error('Banda não encontrada.')

        const members = await this.bandRepo.findMembersBand(bandName)

        // if (members.length == 2) {
        //     throw new Error('Essa banda só possui 2 membros.')
        // }

        let result: string = ''
        await Promise.all(members.map(async (item) => {
            if (item.getName() == musicianName) {
                await this.bandRepo.removeMember(musicianName, bandName)
                result = 'Removido.'
            }
        }))

        if (result == 'Removido.') {
            return result
        }

        throw new Error('O músico já não participa dessa banda.')
    }
}