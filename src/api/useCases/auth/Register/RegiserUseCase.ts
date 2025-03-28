import { tokenGenerate } from "../../../../helpers/auth/token";
import { IHttpReturn } from "../../../controllers/protocols";
import { User } from "../../../entities/User/User";
import { ICreateUserRequestDTO } from "../../user/CreateUser/CreateUserDTO";
import { CreateUserUseCase } from "../../user/CreateUser/CreateUserUseCase";

type userRegisterRequest = ICreateUserRequestDTO;


export class RegisterUseCase{
    constructor(private createUser: CreateUserUseCase){}

    async register(data: userRegisterRequest):Promise<IHttpReturn<object>>{
        const user = await this.createUser.create(data);
        
        if(!user.status){
            return user;
        }

        const userToTokenCreate = user.body as User;

        const token = await tokenGenerate(userToTokenCreate, 7200000);

        return{
            StatusCode: 201,
            message: "Usuário criado com sucesso!",
            access_token: token
        }

    }
}