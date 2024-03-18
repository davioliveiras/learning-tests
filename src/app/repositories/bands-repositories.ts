import { Band } from "../entities/band";
import { Musician } from "../entities/musician";

export interface BandRepository{
    create(band: Band): Promise<void>

    findByName(name: string): Promise<Band | null>
    findByMusician(musicianName: string): Promise<Band[] | null>

    addMusician(musician: Musician, bandName: string): Promise<Band | null>
    removeMusician(musicianName: string, bandName: string): Promise<Band | null>
}