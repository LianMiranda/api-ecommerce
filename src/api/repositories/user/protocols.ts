import { IUserInput, IUserReturns, IUserUpdate } from "../../controllers/users/userProtocols";

export interface IUserRepository{
    create(data: IUserInput):Promise<IUserReturns>
    findAll():Promise<IUserReturns[]>
    findById(id: string):Promise<IUserReturns | null>
    update(id: string, data: IUserUpdate):Promise<IUserReturns>
    delete(id: string):Promise<IUserReturns>
}