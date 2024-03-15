// interface userProps {
//     name: string,
//     email: string
// }

export class User {
    private name: string
    private email: string
    private birthday: Date

    getName(){
        return this.name
    }

    getEmail(){
        return this.email
    }
    getBirthday(){
        return this.birthday
    }

    setName(name: string){
        this.name = name
    }

    constructor (name: string, email: string, birthday: Date){
        const date = new Date
        let age = date.getFullYear() - birthday.getFullYear()
        const m = birthday.getMonth() - date.getMonth()
        const d = birthday.getDay() - date.getDay()
        
        if (m > 0){
            age--
        }else
        if(m == 0 && d < 0){
            age--
        } 

        if (age < 18) throw new Error('Você precisar ter pelo menos 18 anos.')

        this.name = name
        this.email = email
        this.birthday = birthday
    }
}