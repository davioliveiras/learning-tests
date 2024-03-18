import { Band } from "@/app/entities/band";
import { BandRepository } from "../bands-repositories";
import { Musician } from "@/app/entities/musician";

export class InMemoryBands implements BandRepository{

    public InMemoryDatabase: Band[] = []

    async create(band: Band): Promise<void> {
        this.InMemoryDatabase.push(band)
    }

    async findByName(name: string): Promise<Band | null> {
        const band = this.InMemoryDatabase.find((band) => { band.getName() == name })
        if(band) return band
        else return null
    }

    async findByMusician(musicianName: string): Promise<Band[] | null> {
        const bands: Band[] = []

        this.InMemoryDatabase.map((band) => {
            const membersBand = band.getMembers()
            membersBand.find((member) => { if(member.getName() == musicianName) bands.push(band)})
        })
        
        return bands
    }

    async addMusician(musician: Musician, bandName: string): Promise<Band | null> {
        const b = this.InMemoryDatabase.find((band) => band.getName() == bandName)
        if (b) {
            b.addMember(musician)
            this.InMemoryDatabase.find((band) => { if(band.getName() == bandName) band = b})
            return b
        } 
        else {
            console.log(b)
            return null
        }
    }

    async removeMusician(musicianName: string, bandName: string): Promise<Band | null> {
        const b = this.InMemoryDatabase.find((band) => band.getName() == bandName)        
        if(b) {
            b.removeMember(musicianName)
            this.InMemoryDatabase.find((band) => { if(band.getName() == bandName) band = b})
            return b
        }
        else return null
    }
    
}