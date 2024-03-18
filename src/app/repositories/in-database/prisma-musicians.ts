import { Musician } from "../../entities/musician";
import { MusicianRepository } from "../musicians-repositories";
import { prisma } from "../../libs/prisma";


export class PrismaMusicians implements MusicianRepository {
    async create(musician: Musician): Promise<void> {
        await prisma.user.create({
            data: {
                name: user.getName(),
                email: user.getEmail(),
                birthday: user.getBirthday()
            }
        })
    }
    
    async findUsedEmail(email: string): Promise<User | null> {
        const u = await prisma.user.findFirst({
            where:{
                email: email
            }
        })

        if(u) return new User(u.name, u.email, u.birthday)
        else return null
    }
}