import { User } from "../entities/user"
import { UserRepository } from "../repositories/users-repositories"

interface CreateUserRequest {
    name: string
    email: string
    birthday: Date
}

type CreateUserResponse = User

export class CreateUser {

    constructor(private userRepository: UserRepository){}

    async execute({name, email, birthday}: CreateUserRequest): Promise<CreateUserResponse> {

        const userEmailUsed = await this.userRepository.findUsedEmail(email)

        if (userEmailUsed) throw new Error('E-mail já usado')

        const user = new User(name, email, birthday)

        await this.userRepository.create(user)

        return user
    }
}