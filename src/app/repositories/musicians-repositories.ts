import { Musician } from "../entities/musician";

export interface MusicianRepository {

    create(musician: Musician): Promise<void>

    editDescription(description: string, name: string): Promise<void>

    addOccupation(occupation: string, name: string): Promise<void>

    editSite(site: string, name: string): Promise<void>

    findByName(name: string): Promise<Musician | null>
}