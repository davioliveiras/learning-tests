import { expect, it } from "vitest";
import { Band } from "../entities/band";
import { Musician } from "../entities/musician";
import { CreateBand } from "./create-band";
import { InMemoryBands } from "../repositories/in-memory/in-memory-bands";
import { describe } from "node:test";

    const repository = new InMemoryBands()
    const service = new CreateBand(repository)

    const Kiko = new Musician('Kiko Loureiro', 'Pedro Henrique Loureiro', 'store@kikoloureiro.com', new Date('6/16/1972'), 
    'Brazil', ['Guitarist'], 'Pedro Henrique "Kiko" Loureiro is a Brazilian guitarist. He has been a member of several heavy '+
    'metal bands, including Angra and Megadeth.', 'kikoloureiro.com')

    const Rafael = new Musician('Rafael Bittencourt', 'Rafael de Paula Souza Neto', 'toplinkmusicshows@hotmail.com', new Date('10/20/1971'), 
    'Brazil', ['Guitarist', 'Vocalist'], 'Rafael "Bittencourt" de Paula Souza Neto é um cantor, compositor, guitarrista '+
    'violonista e produtor brasileiro, conhecido pelo seu trabalho como guitarrista da banda de power metal Angra, da qual é '+
    'fundador e único membro ativo em todas as formações.', 'rafaelbittencourt.com/')


describe('create a band', () => {
    it('should be able create a band', async () => {        

        const b = new Band('Megadeth', 1983, 'United States of America', 'megadeth.com', [Kiko, Rafael])

        await expect(service.create({band: b})).resolves.toBeInstanceOf(Band)
    })
})