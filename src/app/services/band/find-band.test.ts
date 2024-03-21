import { expect, it } from "vitest";
import { Band } from "../../entities/band";
import { Musician } from "../../entities/musician";
import { InMemoryBands } from "../../repositories/in-memory/in-memory-bands";
import { describe } from "node:test";

import { FindBandByName } from "./find-band";

const bandRepository = new InMemoryBands()
const bandService = new FindBandByName(bandRepository)

describe('find a band', () => {
    it('should be able to find a band', async () => {

        // console.log(await bandService.execute({ name: 'Angra' }))

        expect(bandService.execute({ name: 'Angra' })).resolves.toEqual({
            band: expect.any(Band),
            musicians: expect.any(Array<Musician>)
        })
    })

    it('should not be able to find a band', async () => {
        expect(bandService.execute({ name: 'Calcinha Preta' })).resolves.toBeNull()
    })
})