import { IUserRepository } from "../../../repositories/user/IUserRepository";
import { ISignInRequestDTO } from "./SignInRequestDTO";
import { IHttpReturn } from "../../../controllers/protocols";
import { compare } from "../../../../helpers/encryption";
import { tokenGenerate } from "../../../../helpers/auth/token";

export class SignInUseCase {
  constructor(private userRepository: IUserRepository) {}

  async signIn(data: ISignInRequestDTO): Promise<IHttpReturn<string | object>> {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (!userExists) {
      return {
        StatusCode: 404,
        status: false,
        message: "Credenciais inválidas",
        body: {},
      };
    }

    try {
      const verifyPasswords = await compare(data.password, userExists.password);

      if (verifyPasswords) {
        const token = await tokenGenerate(userExists, 3600000);

        return {
          StatusCode: 200,
          status: true,
          message: "Usuário logado!",
          body: token,
        };
      }

      return {
        StatusCode: 400,
        status: false,
        message: "Credenciais inválidas",
        body: {},
      };
    } catch (error) {
      console.error(error);

      return {
        StatusCode: 500,
        status: false,
        message: "Internal server error",
        body: {},
      };
    }
  }
}
