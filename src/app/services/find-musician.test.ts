import { describe, it, expect } from "vitest";
import { CreateMusician } from "./create-musician";
import { InMemoryMusicians } from "../repositories/in-memory/in-memory-musicians";
import { Musician } from "../entities/musician";
import { FindMusician } from "./find-musician";

describe('find an musician', () => {
    it('should be able to find a musician', async () => {

        const musiciansRepository = new InMemoryMusicians
        const createService = new CreateMusician(musiciansRepository)

        await expect(createService.execute({
            name: 'Kiko Loureiro',
            fullName: 'Pedro Henrique Loureiro',
            email: 'store@kikoloureiro.com',
            birthday: new Date('6/16/1972'),
            country: 'Brazil',
            occupations: ['Guitarist'],
            description: 'A brazilian guitarist',
            site: 'null'
        })).resolves.toBeInstanceOf(Musician)


        const findService = new FindMusician(createService.getRepository())

        await expect(findService.execute({ name: 'Kiko Loureiro' })).resolves.toBeInstanceOf(Musician)

        await expect(findService.execute({ name: 'Rafael Bittencourt' })).resolves.toBeNull()
    })
})