import { IUserRepository } from "../../../repositories/user/IUserRepository";

export class DeleteUserUseCase{
    constructor(private userRepository: IUserRepository){}

    async delete(id: string){
        const verifyUserExists = await this.userRepository.findById(id);

        if (!verifyUserExists) {
          return {
            status: false,
            StatusCode: 404,
            message: "Nenhum usuário encontrado",
            body: {},
          };
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