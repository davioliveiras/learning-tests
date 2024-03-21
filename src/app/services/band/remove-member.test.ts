import { InMemoryBands } from "../../repositories/in-memory/in-memory-bands";
import { describe, it } from "vitest";
import { expect } from "vitest";
import { RemoveMemberService } from "./remove-member";

const bandRepository = new InMemoryBands()
const service = new RemoveMemberService(bandRepository)

describe('revome member in the band', () => {

    it('should be able to remove a member in band', async () => {
        expect(service.execute('Kiko Loureiro', 'Angra')).resolves.toEqual('Removido.')
    })

    it('should not be able to remove a member that does not exist', async () => {
        expect(service.execute('John Frusciante', 'Angra')).rejects.toThrow(Error)
    })

    it('should not be able to remove a member in band that does not exist', async () => {
        expect(service.execute('Kiko Loureiro', 'Calcinha Preta')).rejects.toThrow(Error)
    })

    it('should not be able to remove a member in band he is already out', async () => {
        expect(service.execute('Felipe Andreoli', 'Angra')).rejects.toThrow(Error)
    })
})