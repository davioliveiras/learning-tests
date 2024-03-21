import { describe, it, expect, expectTypeOf } from "vitest";
import { InMemoryMusicians } from "../../repositories/in-memory/in-memory-musicians";
import { Musician } from "../../entities/musician";
import { FindMusician } from "./find-musician";
import { Band } from "../../entities/band";

describe('find an musician', () => {
    const musiciansRepository = new InMemoryMusicians
    const findService = new FindMusician(musiciansRepository)

    it('should be able to find a musician', async () => {
        await expect(findService.execute({ name: 'Kiko Loureiro' })).resolves.toEqual({
            musician: expect.any(Musician),
            bands: expect.any(Array<Band>)
        })
    })

    it('should be able to find a musician without bands', async () => {
        await expect(findService.execute({ name: 'Felipe Andreoli' })).resolves.toEqual({
            musician: expect.any(Musician),
            bands: null
        })
    })

    it('should not be able to find a musician', async () => {
        await expect(findService.execute({ name: 'Tom Morelo' })).resolves.toBeNull()
    })
})