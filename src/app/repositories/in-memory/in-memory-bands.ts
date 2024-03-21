import { Band } from "../../entities/band";
import { BandRepository } from "../bands-repositories";
import { Musician } from "../../entities/musician";
import { InMemoryDatabase } from "../../tests/in-memory-structure";
import { InMemoryMusicians } from "./in-memory-musicians";
import { MusicianRepository } from "../musicians-repositories";
import { Member } from "../../entities/member";
import { angra, felipe, kiko, kikoInAngra, rafael, rafaelInAngra } from "../../libs/data-tests";

export class InMemoryBands implements BandRepository {

    public InMemoryDatabase: InMemoryDatabase = { bands: [angra], musicians: [kiko, rafael, felipe], members: [kikoInAngra, rafaelInAngra] }

    async create(name: string, formedAt: number, country: string, site: string): Promise<Band> {
        const band = new Band(name, formedAt, country, site)
        this.InMemoryDatabase.bands.push(band)
        return band
    }

    async findMusiciansToCreateBand(name: string): Promise<Musician | null> {
        const m = this.InMemoryDatabase.musicians.find((item) => item.getName() == name)
        if (m)
            return m
        else
            return null
    }

    async findMembersBand(name: string): Promise<Musician[]> {
        const result: Musician[] = []
        this.InMemoryDatabase.members.map(async (item) => {
            if (item.getBandName() == name) {
                const m = await this.findMusiciansToCreateBand(item.getMusicianName())
                if (m) {
                    result.push(m)
                }
            }
        })
        return result
    }

    async findBandByName(name: string): Promise<Band | null> {
        const band = this.InMemoryDatabase.bands.find((band) => band.getName() == name)
        if (band) {
            return band
        }
        else return null
    }

    async addMember(musicianName: string, bandName: string): Promise<void> {
        const member = new Member(musicianName, bandName)
        this.InMemoryDatabase.members.push(member)
    }

    async removeMember(musicianName: string, bandName: string): Promise<void> {
        this.InMemoryDatabase.members.map((item, index) => {
            if (item.getBandName() == bandName && item.getMusicianName() == musicianName) {
                this.InMemoryDatabase.members.splice(index, 1)
            }
        })
    }
}