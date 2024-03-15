import { User } from "../../entities/user";

export interface UserRepository {
    create(user: User): Promise<void>
    findUsedEmail(email: string): Promise<User | null>
}