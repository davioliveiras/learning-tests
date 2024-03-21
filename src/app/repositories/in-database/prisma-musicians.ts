import { Musician } from "../../entities/musician";
import { MusicianRepository } from "../musicians-repositories";
import { prisma } from "../../libs/prisma";
import { Band } from "@/app/entities/band";

export class PrismaMusicians implements MusicianRepository {

    async create(musician: Musician): Promise<void> {
        await prisma.musician.create({
            data: {
                name: musician.getName(),
                fullName: musician.getFullName(),
                email: musician.getEmail(),
                birthday: musician.getBirthday(),
                country: musician.getCountry(),
                occupations: musician.getOcupations(),
                description: musician.getDescription(),
                site: musician.getSite()
            }
        })
    }

    async findMusicianByName(name: string): Promise<Musician | null> {
        const m = await prisma.musician.findFirst({
            where: {
                name: name
            }
        })

        if (m) {
            const musician = new Musician(m.name, m.fullName, m.email, m.birthday, m.country, m.occupations, m.description,
                m.site)
            return musician
        }
        return null
    }

    async findMusicianBands(musicianName: string): Promise<Band[] | null> {
        const m = await prisma.musician.findUnique({
            where: {
                name: musicianName
            },
            include: {
                bands: {
                    include: {
                        Band: true
                    }
                }
            }
        })

        if (m) {
            const bands = m.bands
            const arrayBands: Band[] = []
            bands.forEach((b) => {
                const newB = new Band(b.Band.name, b.Band.formedAt, b.Band.country, b.Band.site)
                arrayBands.push(newB)
            })
            return arrayBands
        }

        return null
    }

    async addOccupation(name: string, occupation: string): Promise<void> {

        await prisma.musician.update({
            where: {
                name: name
            },
            data: {
                occupations: {
                    push: occupation
                }
            }
        })
    }
}