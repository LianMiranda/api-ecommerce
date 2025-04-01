import { compare } from "../../../../helpers/encryption";
import { IUserRepository } from "../../../repositories/user/IUserRepository";
import { IUpdateUserRequestDTO } from "./UpdateUserDTO";
import { hashPassword } from "../../../../helpers/encryption";
import { emailValidator } from "../../../../helpers/validators/emailValidator";
import { cpfValidator } from "../../../../helpers/validators/cpfValidator";
import { dateValidator } from "../../../../helpers/validators/dateValidator";
import { CustomError } from "../../../../helpers/CustomError/customError";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async update(id: string, data: IUpdateUserRequestDTO) {
    const user = await this.userRepository.findById(id);

    if (!user) {
          throw new CustomError("Nenhum usuário encontrado", 404);
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
        throw new CustomError("Informe um cpf válido e somente com números", 400);
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
       throw new CustomError("A senha atual do usuário deve ser digitada", 400)
      }


      const isValidPassword = await compare(data.actualPassword, user.password);

      console.log(isValidPassword);
      

      if (!isValidPassword) {
        throw new CustomError("As senhas não condizem", 401)
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
        throw new CustomError("Email ou CPF já cadastrados", 409);
      }

      console.log(error);

      throw new CustomError("Internal server error", 500);
    }
  }
}
