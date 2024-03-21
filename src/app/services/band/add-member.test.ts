import { InMemoryBands } from "../../repositories/in-memory/in-memory-bands";
import { AddMemberService } from "./add-member";
import { describe, it } from "vitest";
import { expect } from "vitest";

const bandRepository = new InMemoryBands()
const service = new AddMemberService(bandRepository)

describe('add a new member in the band', () => {

    it('should be able to add a member in band', async () => {
        expect(service.execute('Felipe Andreoli', 'Angra')).resolves.toEqual('Adicionado.')
    })

    it('should not be able to add a member that does not exist', async () => {
        expect(service.execute('John Frusciante', 'Angra')).rejects.toThrow(Error)
    })

    it('should not be able to add a member in band that does not exist', async () => {
        expect(service.execute('Felipe Andreoli', 'Calcinha Preta')).rejects.toThrow(Error)
    })

    it('should not be able to add a member in band he is already in', async () => {
        expect(service.execute('Felipe Andreoli', 'Angra')).rejects.toThrow(Error)
    })
})