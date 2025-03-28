import { CustomError } from "../../../../helpers/CustomError/customError";
import { IUserRepository } from "../../../repositories/user/IUserRepository";

export class FindAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async findAll() {
    const user = await this.userRepository.findAll();

    if (user.length != 0) {
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
