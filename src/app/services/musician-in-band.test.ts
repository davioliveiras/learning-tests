import { expect, it } from "vitest";
import { InMemoryBands } from "../repositories/in-memory/in-memory-bands";
import { MusicianInBand } from "./musician-in-band";
import { Band } from "../entities/band";
import { CreateBand } from "./create-band";
import { kiko, rafael, felipe, angra } from "../libs/data-tests";

const repository = new InMemoryBands()
const serviceCreateBand = new CreateBand(repository)

serviceCreateBand.create({band: angra})
const serviceMusicianInBand = new MusicianInBand(serviceCreateBand.getRepository())

it('should be able to add a musician in the band', async () => {    
    await expect(serviceMusicianInBand.addMusician({bandName: 'Angra', musician: felipe})).resolves.toBeInstanceOf(Band)
})

it('should not be able to add a musician in a band he already participates in', async () => {    
    await expect(serviceMusicianInBand.addMusician({bandName: 'Angra', musician: rafael})).rejects.toBeInstanceOf(Error)
})

it('should be able to remove a musician from the band', async () => {    
    await expect(serviceMusicianInBand.removeMusician({bandName: 'Angra', musicianName: 'Kiko Loureiro'})).resolves.toBeInstanceOf(Band)
})

it('should not be able to remove a musician from a band he does not participate in', async () => {    
    await expect(serviceMusicianInBand.removeMusician({bandName: 'Angra', musicianName: 'Kiko Loureiro'})).rejects.toBeInstanceOf(Error)
})