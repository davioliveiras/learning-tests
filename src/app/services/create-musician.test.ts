import { describe, it, expect } from "vitest";
import { CreateMusician } from "./create-musician";
import { InMemoryMusicians } from "../repositories/in-memory/in-memory-musicians";
import { Musician } from "../entities/musician";

describe('create an user', () => {
    it('should not be able to create an user with an name already used', async () => {

        const musiciansRepository = new InMemoryMusicians
        const service = new CreateMusician(musiciansRepository)

        await expect(service.execute({
            name: 'Kiko Loureiro',
            fullName: 'Pedro Henrique Loureiro',
            email: 'store@kikoloureiro.com',
            birthday: new Date('6/16/1972'),
            country: 'Brazil',
            occupations: ['Guitarist'],
            description: 'A brazilian guitarist.'
        })).resolves.toBeInstanceOf(Musician)

        await expect(service.execute({
            name: 'Kiko Loureiro',
            fullName: 'Pedro Henrique Loureiro',
            email: 'store@kikoloureiro.com',
            birthday: new Date('6/16/1972'),
            country: 'Brazil',
            occupations: ['Guitarist'],
            description: 'A brazilian guitarist'
        })).rejects.toBeInstanceOf(Error)
    })
})