import { Band } from "../entities/band";
import { Musician } from "../entities/musician";
import { BandRepository } from "./bands-repositories";

export interface MusicianRepository {

    create(musician: Musician): Promise<void>

    findMusicianByName(musicianName: string): Promise<Musician | null>

    findMusicianBands(musicianName: string): Promise<Band[] | null>

    addOccupation(musicianName: string, occupation: string): Promise<void>
}