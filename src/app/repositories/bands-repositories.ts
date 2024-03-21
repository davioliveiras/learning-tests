import { Musician } from "../entities/musician";
import { Band } from "../entities/band";

export interface BandRepository {

    create(name: string, formedAt: number, country: string, site: string): Promise<Band>

    findMusiciansToCreateBand(name: string): Promise<Musician | null>

    findBandByName(name: string): Promise<Band | null>

    findMembersBand(name: string): Promise<Musician[]>

    addMember(musicianName: string, bandName: string): Promise<void>

    removeMember(musicianName: string, bandName: string): Promise<void>
}