import { hashPassword } from "../../../../helpers/encryption";
import { IUserRepository } from "../../../repositories/user/IUserRepository";
import { User } from "../../../entities/User/User";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async create(data: ICreateUserRequestDTO) {

    const isNull = Object.values(data).some(
      (value) => value === null || value === ""
    );

    if (isNull) {
      return {
        status: false,
        StatusCode: 400,
        message: "Verifique os campos!",
        body: {},
      };
    }

    const hash = await hashPassword(data.password);

    data.password = hash;

    try {
      const user = new User(data);

      await this.userRepository.create(user);

      return {
        status: true,
        StatusCode: 201,
        message: "Usuário criado com sucesso",
        body: user,
      };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any).code === "P2002") {
        return {
          status: false,
          StatusCode: 400,
          message: "Email ou CPF já cadastrados",
          body: {},
        };
      }

      console.error(error);

      return {
        status: false,
        StatusCode: 500,
        message: "Internal server error",
        body: {},
      };
    }
  }
}
