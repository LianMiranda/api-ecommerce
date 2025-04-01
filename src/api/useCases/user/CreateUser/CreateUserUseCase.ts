/* The `CreateUserUseCase` class handles the creation of a new user by validating input data, hashing
the password, and interacting with the user repository. */
import { hashPassword } from "../../../../helpers/encryption";
import { IUserRepository } from "../../../repositories/user/IUserRepository";
import { User } from "../../../entities/User/User";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { emailValidator } from "../../../../helpers/validators/emailValidator";
import { dateValidator } from "../../../../helpers/validators/dateValidator";
import { IHttpReturn } from "../../../controllers/protocols";
import { cpfValidator } from "../../../../helpers/validators/cpfValidator";
import { CustomError } from "../../../../helpers/CustomError/customError";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async create(data: ICreateUserRequestDTO): Promise<IHttpReturn<object>> {
    const isNull = Object.values(data).some(
      (value) =>
        (typeof value === "string" && value.trim() === "") ||
        (value instanceof Date && isNaN(value.getTime())) ||
        value === null
    );

    if (isNull) {
      throw new CustomError("Nenhum campo pode estar vazio!", 400);
    }

    const checkEmail = await emailValidator(data.email);

    if (!checkEmail.status) {
      return checkEmail;
    }

    const checkCpf = await cpfValidator(data.cpf);

    if (!checkCpf) {
      throw new CustomError("Informe um cpf válido e somente com números", 400);
    }

    const checkBirthday = await dateValidator(data.birthday.toString());

    if (!checkBirthday.status) {
      return checkBirthday;
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
      console.log(error);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any).code === "P2002") {
        throw new CustomError("Email ou CPF já cadastrados", 409);
      }

      throw new CustomError("Internal server error", 500);
    }
  }
}
