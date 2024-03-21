import { Band } from "@/app/entities/band";
import { BandRepository } from "../bands-repositories";
import { Musician } from "@/app/entities/musician";
import { prisma } from "@/app/libs/prisma";
import { MusicianRepository } from "../musicians-repositories";

export class PrismaBands implements BandRepository {

    async create(name: string, formedAt: number, country: string, site: string): Promise<Band> {

        const b = await prisma.band.create({
            data: {
                name: name,
                formedAt: formedAt,
                country: country,
                site: site,
            }
        })

        const band = new Band(b.name, b.formedAt, b.country, b.site)
        return band
    }

    async findMusiciansToCreateBand(name: string): Promise<Musician | null> {
        const m = await prisma.musician.findUnique({
            where: {
                name: name
            }
        })

        if (m) {
            const newM = new Musician(m.name, m.fullName, m.email, m.birthday,
                m.country, m.occupations, m.description, m.site)
            return newM
        } else return null
    }

    async findBandByName(name: string): Promise<Band | null> {
        const b = await prisma.band.findUnique({
            where: {
                name: name
            }
        })
        if (b) {
            const band = new Band(b.name, b.formedAt, b.country, b.site)
            return band
        }
        return null
    }

    async findMembersBand(musicianName: string): Promise<Musician[]> {
        const m = await prisma.band.findFirst({
            where: {
                name: musicianName
            },
            include: {
                Musicians: {
                    include: {
                        Musician: true
                    }
                }
            }
        })

        const memberArray: Musician[] = []

        if (m) {
            const members = m.Musicians
            members.forEach((m) => {
                const newM = new Musician(m.Musician.name, m.Musician.fullName, m.Musician.email, m.Musician.birthday,
                    m.Musician.country, m.Musician.occupations, m.Musician.description, m.Musician.site)
                memberArray.push(newM)
            })
        }

        return memberArray
    }

    async addMember(musicianName: string, bandName: string): Promise<void> {

        await prisma.musician.update({
            where: {
                name: musicianName
            },
            data: {
                bands: {
                    create: {
                        Band: {
                            connect: {
                                name: bandName
                            }
                        }
                    }
                }
            }
        })
    }

    async removeMember(musicianName: string, bandName: string): Promise<void> {
        const b = await prisma.band.findUnique({
            where: {
                name: bandName
            }
        })

        const m = await prisma.musician.findUnique({
            where: {
                name: musicianName
            }
        })

        if (m && b) {
            await prisma.memberOnBand.delete({
                where: {
                    musicianId_bandId: {
                        musicianId: m?.id,
                        bandId: b?.id
                    }
                }
            })
        }
    }
}