import { InMemoryDatabase } from '@/app/tests/in-memory-structure';
import { Musician } from '../../entities/musician'
import { MusicianRepository } from '../musicians-repositories';
import { Band } from '@/app/entities/band';
import { angra, felipe, kiko, kikoInAngra, rafael, rafaelInAngra } from '../../libs/data-tests';

export class InMemoryMusicians implements MusicianRepository {
    public InMemoryDatabase: InMemoryDatabase = { bands: [angra], musicians: [kiko, rafael, felipe], members: [kikoInAngra, rafaelInAngra] }

    async create(musician: Musician): Promise<void> {
        this.InMemoryDatabase.musicians.push(musician)
    }

    async findMusicianByName(musicianName: string): Promise<Musician | null> {
        const musicianAlreadyCreated = this.InMemoryDatabase.musicians.find((musician) => musician.getName() == musicianName)
        if (musicianAlreadyCreated)
            return musicianAlreadyCreated
        else return null
    }

    async findMusicianBands(musicianName: string): Promise<Band[] | null> {
        const bands: Band[] = []

        this.InMemoryDatabase.members.map((members) => {
            if (members.getMusicianName() == musicianName) {
                const musicianBand = this.InMemoryDatabase.bands.find((band) => band.getName() == members.getBandName())
                if (musicianBand)
                    bands.push(musicianBand)
            }
        })

        if (bands.length == 0)
            return null
        else
            return bands
    }

    async addOccupation(musicianName: string, newOccupation: string): Promise<void> {
        this.InMemoryDatabase.musicians.find((musician) => {
            if (musician.getName() == musicianName)
                musician.addOccupation(newOccupation)
        })
    }
}