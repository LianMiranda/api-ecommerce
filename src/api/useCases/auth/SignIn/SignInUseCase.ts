import { IUserRepository } from "../../../repositories/user/IUserRepository";
import { ISignInRequestDTO } from "./SignInRequestDTO";
import { IHttpReturn } from "../../../controllers/protocols";
import { compare } from "../../../../helpers/encryption";
import { tokenGenerate } from "../../../../helpers/auth/token";
import { CustomError } from "../../../../helpers/CustomError/customError";

export class SignInUseCase {
  constructor(private userRepository: IUserRepository) {}

  async signIn(data: ISignInRequestDTO): Promise<IHttpReturn<string | object>> {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (!userExists) {
      throw new CustomError("Credenciais inválidas", 400);
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

      throw new CustomError("Credenciais inválidas", 400);
    } catch (error) {
      console.error(error);
      throw new CustomError("Internal server error", 500);
    }
  }
}
