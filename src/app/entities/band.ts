import { string } from "zod"
import { Musician } from "./musician"

export class Band {
    private name: string
    private formedAt: number
    private country: string
    private site: string | null

    getName() {
        return this.name
    }

    getFormedAt() {
        return this.formedAt
    }

    getCoutry() {
        return this.country
    }

    getSite() {
        return this.site
    }

    constructor(name: string, formedAt: number, country: string, site: string | null,) {
        this.name = name
        this.formedAt = formedAt
        this.country = country
        this.site = site

        /* validação feita no service */
        // if (membersNames.length < 2) {
        //     throw new Error('Uma banda deve ser criada com pelo menos 2 membros. Crie eles primeiro.')
        // }
    }
}