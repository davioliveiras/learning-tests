import { User }  from '../../entities/user'
import { UserRepository } from '../users-repositories';

export class InMemoryUsers implements UserRepository{
    public users: User[] = []

    async create(user: User): Promise<void> {
        this.users.push(user)
    }

    async findUsedEmail(email: string): Promise<User | null> {
        const userWithEmailUsed = this.users.find((user) => {
            if (email == user.getEmail()) return user
        })
        if (userWithEmailUsed)
            return userWithEmailUsed
        else return null
    }
}