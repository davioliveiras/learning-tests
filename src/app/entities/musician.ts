export class Musician {
    private name: string
    private fullName: string
    private email: string
    private birthday: Date
    private country: string
    private occupations: string[]
    private description: string
    private site: string | null

    getName() {
        return this.name
    }

    getFullName() {
        return this.fullName
    }

    getEmail() {
        return this.email
    }

    getBirthday() {
        return this.birthday
    }

    getCountry() {
        return this.country
    }

    getOcupations() {
        return this.occupations
    }

    getDescription() {
        return this.description
    }

    getSite() {
        return this.site
    }

    addOccupation(newOccupation: string) {
        this.occupations.push(newOccupation)
    }

    constructor(name: string, fullName: string, email: string, birthday: Date, country: string, occupations: string[], description: string,
        site: string | null) {

        if (occupations.length < 1) throw new Error('O músico deve ter pelo menos uma ocupação (guitarrista, por exemplo).')

        this.name = name
        this.fullName = fullName
        this.email = email
        this.birthday = birthday
        this.country = country
        this.occupations = occupations
        this.description = description
        this.site = site
    }
}