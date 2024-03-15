import { User } from "../entities/user";

export interface UserRepository {
    /** 
    * @user usuário que será cadastrado 
    * @returns devolve o usuário criado
    */
    create(user: User): Promise<void>

    findUsedEmail(email: string): Promise<User | null>
}