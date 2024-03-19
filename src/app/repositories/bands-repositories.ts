import { Band } from "../entities/band";
import { Musician } from "../entities/musician";

export interface BandRepository {
    create(name: string,
        formedAt: number,
        country: string,
        site: string, memberName1: string, memberName2: string): Promise<void>

    findByName(name: string): Promise<Band | null>
    findByMusician(musicianName: string): Promise<Band[] | null>

    addMusician(musician: Musician, bandName: string): Promise<Band | null>
    removeMusician(musicianName: string, bandName: string): Promise<Band | null>
}