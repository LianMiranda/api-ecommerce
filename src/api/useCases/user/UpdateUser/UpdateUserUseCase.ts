import { compare } from "bcrypt";
import { IUserRepository } from "../../../repositories/user/IUserRepository";
import { IUpdateUserRequestDTO } from "./UpdateUserDTO";
import { hashPassword } from "../../../../helpers/encryption";
import { emailValidator } from "../../../../helpers/validators/emailValidator";
import { cpfValidator } from "../../../../helpers/validators/cpfValidator";
import { dateValidator } from "../../../../helpers/validators/dateValidator";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async update(id: string, data: IUpdateUserRequestDTO) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return {
        status: false,
        StatusCode: 404,
        message: "Usuário não encontrado",
        body: {},
      };
    }

    const userUpdate: IUpdateUserRequestDTO = {};

    if (data.fullName && data.fullName.trim() != "")
      userUpdate.fullName = data.fullName;
    if (data.email && data.email.trim() != "") {
      const checkNewEmail = await emailValidator(data.email);

      if (!checkNewEmail.status) return checkNewEmail;

      userUpdate.email = data.email;
    }
    if (data.cpf && data.cpf.trim() != "") {
      const checkNewCpf = await cpfValidator(data.cpf);

      if (!checkNewCpf) {
        return {
          status: false,
          StatusCode: 400,
          message: "Informe um cpf válido e somente com números",
          body: {},
        };
      }

      userUpdate.cpf = data.cpf;
    }
    if (data.birthday && data.birthday.trim() != "") {
      const checkBirthday = await dateValidator(data.birthday);

      if (!checkBirthday.status) {
        return checkBirthday;
      }

      userUpdate.birthday = data.birthday;
    }
    if (data.password && data.password.trim() != "") {

      if(!data.actualPassword){
        return {
          status: false,
          StatusCode: 400,
          message: "A senha atual do usuário deve ser digitada",
          body: {},
        };
      }


      const isValidPassword = await compare(
        data.actualPassword ?? "",
        user?.password ?? ""
      );

      if (!isValidPassword) {
        return {
          status: false,
          StatusCode: 400,
          message: "As senhas não condizem",
          body: {},
        };
      }

      const hash = await hashPassword(data.password);

      userUpdate.password = hash;
    }

    try {
      const update = await this.userRepository.update(id, userUpdate);

      return {
        status: true,
        StatusCode: 200,
        message: "Usuário atualizado com sucesso",
        body: update,
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

      console.log(error);

      return {
        status: false,
        StatusCode: 500,
        message: "Internal server error",
        body: {},
      };
    }
  }
}
