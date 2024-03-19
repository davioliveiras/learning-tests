import { Band } from "@/app/entities/band";
import { BandRepository } from "../bands-repositories";
import { Musician } from "@/app/entities/musician";
import { prisma } from "@/app/libs/prisma";

export class PrismaBands implements BandRepository {

    async create(name: string,
        formedAt: number,
        country: string, site: string, memberName1: string, memberName2: string): Promise<void> {

        const m1 = await prisma.musician.findFirst({
            where: {
                name: memberName1
            }
        })

        const m2 = await prisma.musician.findFirst({
            where: {
                name: memberName2
            }
        })

        if (m1 && m2) {
            await prisma.band.create({
                data: {
                    name: name,
                    formedAt: formedAt,
                    country: country,
                    site: site,
                    Musicians: {
                        create: [{ musicianId: m1.id }, { musicianId: m2.id }]
                    }
                },
                include: {
                    Musicians: true
                }
            })
        }
    }

    async findByName(name: string): Promise<Band | null> {
        return null
    }

    async findByMusician(musicianName: string): Promise<Band[] | null> {
        const bands: Band[] = []

        return null
    }

    async addMusician(musician: Musician, bandName: string): Promise<Band | null> {
        return null
    }

    async removeMusician(musicianName: string, bandName: string): Promise<Band | null> {
        return null
    }

}