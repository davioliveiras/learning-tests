import { User } from "../../entities/user";
import { UserRepository } from "../users-repositories";
import { prisma } from "../../libs/prisma";


export class PrismaUsers implements UserRepository {
    async create(user: User): Promise<void> {
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