import { Musician } from "../../entities/musician";
import { MusicianRepository } from "../musicians-repositories";
import { prisma } from "../../libs/prisma";


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

    async findByName(name: string): Promise<Musician | null> {
        const m = await prisma.musician.findFirst({
            where: {
                name: name
            }
        })

        if (m) {
            const musician = new Musician(m.name, m.fullName, m.email, m.birthday, m.country, m.occupations, m.description,
                m.site ? m.site : null)
            return musician
        }
        return null
    }

    async addOccupation(name: string, occupation: string): Promise<void> {

        const m = await prisma.musician.findUnique({
            where: {
                name: name
            }
        })

        if (m) {
            const musician = new Musician(m.name, m.fullName, m.email, m.birthday, m.country, m.occupations, m.description,
                m.site ? m.site : null)

            musician.addOccupation(occupation)

            await prisma.musician.update({
                where: {
                    name: name
                },
                data: {
                    occupations: musician.getOcupations()
                }
            })
        }

    }

    // async editDescription(description: string, name: string): Promise<void> {

    //     const m = await prisma.musician.findUnique({
    //         where: {
    //             name: name
    //         }
    //     })
    //     if (m) {
    //         const musician = new Musician(m.name, m.fullName, m.email, m.birthday, m.country, m.occupations, m.description,
    //             m.site ? m.site : undefined)

    //         musician.setDescription(description)

    //         await prisma.musician.update({
    //             where: {
    //                 name: name
    //             },
    //             data: musician.getDescription()
    //         })
    //     }
    // }    

    // async editSite(site: string, name: string): Promise<void> {
    //     await prisma.musician.update({
    //         where: {
    //             name: name
    //         },
    //         data: {
    //             site: site
    //         }
    //     })
    // }
}