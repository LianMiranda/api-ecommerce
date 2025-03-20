import { IUserRepository } from "../../../repositories/user/IUserRepository";

export class FindUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async findById(id: string){
    const user = await this.userRepository.findById(id);

    if (user) {
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
