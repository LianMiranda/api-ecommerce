import { IUserInput, IUserUpdate } from "../../controllers/users/userProtocols";
import { User } from "../../entities/User/User";

export interface IUserRepository{
    create(data: IUserInput):Promise<User>
    findAll():Promise<User[]>
    findById(id: string):Promise<User | null>
    findByEmail(email: string):Promise<User | null>
    update(id: string, data: IUserUpdate):Promise<User>
    delete(id: string):Promise<User>
}