import { CustomError } from "../../../../helpers/CustomError/customError";
import { IUserRepository } from "../../../repositories/user/IUserRepository";

export class DeleteUserUseCase{
    constructor(private userRepository: IUserRepository){}

    async delete(id: string){
        const verifyUserExists = await this.userRepository.findById(id);

        if (!verifyUserExists) {
         throw new CustomError("Nenhum usuário encontrado", 404)
        }

        const user = await this.userRepository.delete(id);

        return{
            status: true,
            StatusCode: 200,
            message: "Usuário deletado com sucesso",
            body: user
        }
    }
}