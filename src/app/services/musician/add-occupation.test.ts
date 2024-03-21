import { describe, it, expect } from "vitest";
import { CreateMusician } from "./create-musician";
import { InMemoryMusicians } from "../../repositories/in-memory/in-memory-musicians";
import { Musician } from "../../entities/musician";
import { AddOccupation } from "./add-occupation";

describe('add a new occupation to an musician', () => {
    const musiciansRepository = new InMemoryMusicians
    const addOccupationService = new AddOccupation(musiciansRepository)

    it('should be able to add a new occupation', async () => {
        await expect(addOccupationService.execute({ name: 'Kiko Loureiro', occupation: 'Vocalista' })).resolves.toBeUndefined()
    })

    it('should not be able to add a occupation the musician already have', async () => {
        await expect(addOccupationService.execute({ name: 'Kiko Loureiro', occupation: 'Vocalista' })).rejects.toThrow()
    })

    it('should not be able to add a occupation to a musician does not exist', async () => {
        await expect(addOccupationService.execute({ name: 'Kiko do Chaves', occupation: 'Vocalista' })).rejects.toThrowError()
    })
})