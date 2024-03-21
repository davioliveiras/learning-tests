import { expect, it } from "vitest";
import { Band } from "../../entities/band";
import { Musician } from "../../entities/musician";
import { CreateBand } from "./create-band";
import { InMemoryBands } from "../../repositories/in-memory/in-memory-bands";
import { describe } from "vitest";
import { InMemoryMusicians } from "../../repositories/in-memory/in-memory-musicians";
import { CreateMusician } from "../musician/create-musician";
import { kiko } from "@/app/libs/data-tests";

const bandRepository = new InMemoryBands()
const bandService = new CreateBand(bandRepository)

describe('create a band', () => {
    it('should be able create a band', async () => {

        await expect(bandService.execute({
            name: 'Trio Kiko',
            formedAt: 1983,
            country: 'United States of America',
            site: 'megadeth.com',
            members: ['Kiko Loureiro', 'Felipe Andreoli']
        })).resolves.toBeInstanceOf(Band)

    })

    it('should not be able create a band with a used name', async () => {

        await expect(bandService.execute({
            name: 'Angra',
            formedAt: 1983,
            country: 'United States of America',
            site: 'megadeth.com',
            members: ['Kiko Loureiro', 'Felipe Andreoli']
        })).rejects.toThrow(Error)

    })

    it('should not be able create a band with just one musician', async () => {

        await expect(bandService.execute({
            name: 'Just one',
            formedAt: 1983,
            country: 'United States of America',
            site: 'megadeth.com',
            members: ['Kiko Loureiro']
        })).rejects.toThrow(Error)

    })

    it('should not be able create a band with a ghost', async () => {

        await expect(bandService.execute({
            name: 'Just one',
            formedAt: 1983,
            country: 'United States of America',
            site: 'megadeth.com',
            members: ['Kiko Loureiro', 'John Frusciante']
        })).rejects.toThrow(Error)

    })
})