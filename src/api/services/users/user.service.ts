import { UsersRepository } from "../../repositories/user/user";
import {IUserInput, IUserReturns } from "../../controllers/users/userProtocols";
import { IHttpReturn } from "../../controllers/protocols";


const userRepository = new UsersRepository();

export class UserService{
    static async create(data: IUserInput):Promise<IHttpReturn<IUserReturns[] | object>>{
        const isNull = Object.values(data).some(value => value === null || value === "");
        //TODO Verificar email unico e cpf
        if(isNull){ 
            return {
                StatusCode: 400,
                message: "Alguns campos estão faltando",
                body: {}
            }
        }

        const user: IUserReturns = await userRepository.create(data)
        
        return{
            StatusCode: 200,
            message: "Usuário criado com sucesso",
            body: user
        };    
    }

    static async findAll():Promise<IHttpReturn<IUserReturns[]>>{
        const user: IUserReturns[] = await userRepository.findAll()

        if(user.length != 0){
            return{
                StatusCode: 200,
                message: "Usuários encontrados",
                body: user
            };    
        }

        return{
            StatusCode: 404,
            message: "Nenhum usuário encontrado",
            body: []
        };   
    }
}