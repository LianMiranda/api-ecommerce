import { CustomError } from "../../../../helpers/CustomError/customError";
import { IHttpReturn } from "../../../controllers/protocols";
import { User } from "../../../entities/User/User";
import { IUserRepository } from "../../../repositories/user/IUserRepository";

export class FindUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async findById(id: string): Promise<IHttpReturn<User | []>> {
    const user = await this.userRepository.findById(id);

    if (user) {
      return {
        status: true,
        StatusCode: 200,
        message: "Usuários encontrados",
        body: user,
      };
    }

    throw new CustomError("Nenhum usuário encontrado", 404);
  }
}
