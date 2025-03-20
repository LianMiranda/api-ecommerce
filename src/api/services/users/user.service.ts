import {
  IUserReturns,
  IUserUpdate,
} from "../../controllers/users/userProtocols";
import { IHttpReturn } from "../../controllers/protocols";
import { compare, hashPassword } from "../../../helpers/encryption";
import { IUserRepository } from "../../repositories/user/IUserRepository";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async findById(
    id: string
  ): Promise<IHttpReturn<IUserReturns | object>> {
    const user: IUserReturns | null = await this.userRepository.findById(id);

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
      body: {},
    };
  }

  public async update(
    id: string,
    data: Partial<IUserUpdate>
  ): Promise<IHttpReturn<IUserReturns | object>> {


    const user = await this.findById(id);
    
    if(!user.status){
      return {
        status: false,
        StatusCode: 404,
        message: "Usuário não encontrado",
        body: {},
      };
    }

    const userBody = user.body as IUserReturns;
    const userUpdate: IUserUpdate = {};

    if (data.fullName && data.fullName.trim() != "") userUpdate.fullName = data.fullName;
    if (data.email && data.email.trim() != "") userUpdate.email = data.email;
    if (data.cpf && data.cpf.trim() != "") userUpdate.cpf = data.cpf;
    if (data.birthday && data.birthday.toString().trim() != "") userUpdate.birthday = new Date(data.birthday);
    if (data.password && data.password.trim() != "") {
      const isValidPassword = await compare(data.actualPassword ?? "", userBody.password);

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

  async delete(id: string): Promise<IHttpReturn<IUserReturns | object>> {
    const verifyUserExists = await this.findById(id);

    if (!verifyUserExists.status) {
      return {
        status: false,
        StatusCode: 404,
        message: "Nenhum usuário encontrado",
        body: {},
      };
    }

    const user = await this.userRepository.delete(id);

    return {
      status: true,
      StatusCode: 200,
      message: "Usuário deletado",
      body: user,
    };
  }


}
