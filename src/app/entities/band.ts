import { Musician } from "./musician"

export class Band {
    private name: string
    private formedAt: number
    private country: string
    private site?: string
    private members: Musician[]

    getName(){
        return this.name
    }

    getFormedAt(){
        return this.formedAt
    }

    getCoutry(){
        return this.country
    }

    getSite(){
        return this.site
    }

    getMembers(){
        return this.members
    }

    addMember(newMember: Musician){
        const m = this.members.find((alreadyMember) => alreadyMember.getName() == newMember.getName())
        if(m)
            throw new Error('Este membro já participa desta banda.')
        else
            this.members.push(newMember)
    }

    removeMember(name: string){
        const a: Musician[] = []

        const m = this.members.map((alreadyMember) => {
            if(alreadyMember.getName() != name){
                a.push(alreadyMember)
            }
        })

        if(m.length == a.length)
            throw new Error('Esse membro não participa dessa banda.')
        else
            this.members = a
    }
    

    constructor(name: string, formedAt: number, country: string, site: string, members: Musician[]){
        this.name = name
        this.formedAt = formedAt
        this.country = country
        this.site = site
        this.members = members
        if (members.length < 2){
            throw new Error('Uma banda deve ser criada com pelo menos 2 membros. Crie eles primeiro.')
        }
    }
}