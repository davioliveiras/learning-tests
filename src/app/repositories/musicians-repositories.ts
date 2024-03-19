import { Musician } from "../entities/musician";

export interface MusicianRepository {

    create(musician: Musician): Promise<void>

    findByName(name: string): Promise<Musician | null>

    addOccupation(name: string, occupation: string): Promise<void>

    // editDescription(description: string, name: string): Promise<void>

    // editSite(site: string, name: string): Promise<void>    
}