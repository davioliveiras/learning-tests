import { describe, it, expect } from "vitest";
import { CreateMusician } from "./create-musician";
import { InMemoryMusicians } from "../../repositories/in-memory/in-memory-musicians";
import { Musician } from "../../entities/musician";

describe('create an musician', () => {

    const musiciansRepository = new InMemoryMusicians
    const service = new CreateMusician(musiciansRepository)

    it('should be able to create an musician', async () => {

        await expect(service.execute({
            name: 'Dave Mustaine',
            fullName: 'David Scott Mustaine',
            email: 'store@kikoloureiro.com',
            birthday: new Date('6/16/1972'),
            country: 'Brazil',
            occupations: ['Guitarist'],
            description: 'A brazilian guitarist.',
            site: null
        })).resolves.toEqual('Criado.')
    })

    it('should not be able to create an musician with an name already used', async () => {

        await expect(service.execute({
            name: 'Kiko Loureiro',
            fullName: 'Pedro Henrique Loureiro',
            email: 'store@kikoloureiro.com',
            birthday: new Date('6/16/1972'),
            country: 'Brazil',
            occupations: ['Guitarist'],
            description: 'A brazilian guitarist',
            site: 'null'
        })).rejects.toBeInstanceOf(Error)
    })
})