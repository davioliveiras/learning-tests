import { Band } from "@/app/entities/band";
import { BandRepository } from "../bands-repositories";
import { Musician } from "@/app/entities/musician";
import { prisma } from "@/app/libs/prisma";
import { MusicianRepository } from "../musicians-repositories";

export class PrismaBands implements BandRepository {

    async create(name: string,
        formedAt: number,
        country: string, site: string, membersNames: string[]): Promise<Band> {

        const musicians = []
        for (let i = 0; i < membersNames.length; i++) {
            musicians.push(await prisma.musician.findFirst({
                where: {
                    name: membersNames[i]
                },
                select: {
                    id: true
                }
            })
            )
        }

        const b = await prisma.band.create({
            data: {
                name: name,
                formedAt: formedAt,
                country: country,
                site: site,
            }
        })

        musicians.forEach(async (m) => {
            await prisma.memberOnBand.create({
                data: {
                    musicianId: m.id,
                    bandId: b.id
                }
            })
        })

        const band = new Band(b.name, b.formedAt, b.country, b.site, membersNames)
        return band
    }

    async findByName(name: string): Promise<Band | null> {
        const b = await prisma.band.findFirst({
            where: {
                name: name
            },
            include: {
                Musicians: true
            }
        })

        if (b) {
            const ms = await prisma.musician.findMany({
                include: {
                    bands: {
                        where: {
                            bandId: b.id
                        }
                    }
                }
            })

            const members: string[] = []
            ms.forEach((m) => {
                members.push(m.name)
            })

            const band = new Band(b.name, b.formedAt, b.country, b.site, members)
            return band
        }
        return null
    }

    async findByMusician(musicianName: string): Promise<Band[] | null> {
        const musician = await prisma.musician.findFirst({
            where: {
                name: musicianName
            },
            include: {
                bands: true
            }
        })

        if (musician) {
            const bands = await prisma.band.findMany({
                include: {
                    Musicians: {
                        where: {
                            musicianId: musician.id
                        }
                    }
                }
            })

            if (bands) {
                const bArray: Band[] = []
                bands.forEach((item) => {
                    const b = new Band(item.name, item.formedAt, item.country, item.site, [''])
                    bArray.push(b)
                })
                return bArray
            }
        }

        return null
    }
}