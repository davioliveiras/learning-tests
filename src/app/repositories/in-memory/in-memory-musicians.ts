import { Musician }  from '../../entities/musician'
import { MusicianRepository } from '../musicians-repositories';

export class InMemoryMusicians implements MusicianRepository{
    public musicians: Musician[] = []

    async create(musician: Musician): Promise<void> {
        this.musicians.push(musician)
    }

    async findByName(name: string): Promise<Musician | null> {
        const musicianAlreadyCreated = this.musicians.find((musician) => {
            if (name == musician.getName()) return Musician
        })
        if (musicianAlreadyCreated)
            return musicianAlreadyCreated
        else return null
    }

    async addOccupation(occupation: string, name: string): Promise<void> {
        const m = this.musicians.find((musician) => musician.getName() == name)
        if(m){
            m.addOccupation(occupation)
            this.musicians.find((musician) => {if(musician.getName() == name) musician = m})
        }
    }

    async editSite(site: string, name: string): Promise<void> {
        const m = this.musicians.find((musician) => musician.getName() == name)
        if(m){
            m.setSite(site)
            this.musicians.find((musician) => {if(musician.getName() == name) musician = m})
        }
    }

    async editDescription(description: string, name: string): Promise<void> {
        const m = this.musicians.find((musician) => musician.getName() == name)
        if(m){
            m.setDescription(description)
            this.musicians.find((musician) => {if(musician.getName() == name) musician = m})
        }
    }
}