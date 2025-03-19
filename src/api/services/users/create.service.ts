import { UsersRepository } from "../../repositories/user/user";
import {IUserInput, IUserReturns } from "../../controllers/users/userProtocols";
import { IHttpReturn } from "../../controllers/protocols";

export class UserServiceCreate{

    static async create(data: IUserInput):Promise<IHttpReturn<IUserReturns | object>>{
        const isNull = Object.values(data).some(value => value === null || value === "");
        
        if(isNull){ 
          return {
            StatusCode: 400,
            message: "Alguns campos estão faltando",
            body: {}
          }
        }

        const userRepository = new UsersRepository();
        const user = await userRepository.create(data)
        
        return{
            StatusCode: 200,
            message: "Usuário criado com sucesso",
            body: user
        };    
    }
}