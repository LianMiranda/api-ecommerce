import { IHttpReturn } from "../../controllers/protocols";
import { IUserRepository } from "../../repositories/user/IUserRepository";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async delete(id: string): Promise<IHttpReturn<IUserReturns | object>> {
    const verifyUserExists = await this.findById(id);

    if (!verifyUserExists.status) {
      return {
        status: false,
        StatusCode: 404,
        message: "Nenhum usuário encontrado",
        body: {},
      };
    }

    const user = await this.userRepository.delete(id);

    return {
      status: true,
      StatusCode: 200,
      message: "Usuário deletado",
      body: user,
    };
  }


}
