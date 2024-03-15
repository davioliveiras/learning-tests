import { describe, it, expect } from "vitest";
import { CreateUser } from "./create-user";
import { InMemoryUsers } from "../repositories/in-memory/in-memory-users";
import { User } from "../entities/user";

describe('create an user', () => {
    it('should be not able to create an user with an email already used', async () => {

        const usersRepository = new InMemoryUsers
        const createUser = new CreateUser(usersRepository)

        await expect(createUser.execute({
            name: 'Davi',
            email: 'davi@gmail.com',
            birthday: new Date('07/04/2003')
        })).resolves.toBeInstanceOf(User)

        await expect(createUser.execute({
            name: 'Davi',
            email: 'davi@gmail.com',
            birthday: new Date('07/04/2003')
        })).rejects.toBeInstanceOf(Error)
    })
})