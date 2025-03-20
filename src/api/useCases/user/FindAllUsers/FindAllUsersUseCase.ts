import { IUserRepository } from "../../../repositories/user/IUserRepository";

export class FindAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async findAll(){
    const user = await this.userRepository.findAll();

    if (user.length != 0) {
      return {
        status: true,
        StatusCode: 200,
        message: "Usuários encontrados",
        body: user,
      };
    }

    return {
      status: false,
      StatusCode: 404,
      message: "Nenhum usuário encontrado",
      body: [],
    };
  }
}
