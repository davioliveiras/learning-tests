import { describe, it, expect } from "vitest";
import { CreateMusician } from "./create-musician";
import { InMemoryMusicians } from "../repositories/in-memory/in-memory-musicians";
import { Musician } from "../entities/musician";
import { AddOccupation } from "./add-occupation";

describe('add a new occupation to an musician', () => {
    it('should be able to add a new occupation', async () => {

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


        const addOccupationService = new AddOccupation(createService.getRepository())

        await expect(addOccupationService.execute({ name: 'Kiko do Chaves', occupation: 'Vocalista' })).rejects.toThrowError()
        await expect(addOccupationService.execute({ name: 'Kiko Loureiro', occupation: 'Vocalista' })).resolves.toBeUndefined()
        await expect(addOccupationService.execute({ name: 'Kiko Loureiro', occupation: 'Vocalista' })).rejects.toThrow()
    })
})