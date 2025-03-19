import { UsersRepository } from "../../repositories/user/user";
import {
  IUserInput,
  IUserReturns,
} from "../../controllers/users/userProtocols";
import { IHttpReturn } from "../../controllers/protocols";
import { hashPassword } from "../../../helpers/encryption";

const userRepository = new UsersRepository();

export class UserService {
  static async create(
    data: IUserInput
  ): Promise<IHttpReturn<IUserReturns | object>> {
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

    data.password = hash.toString();

    try {
      const user: IUserReturns = await userRepository.create(data);

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

  static async findAll(): Promise<IHttpReturn<IUserReturns[]>> {
    const user: IUserReturns[] = await userRepository.findAll();

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

  static async findById(
    id: string
  ): Promise<IHttpReturn<IUserReturns | object>> {
    const user: IUserReturns | null = await userRepository.findById(id);

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

  static async delete(id: string): Promise<IHttpReturn<IUserReturns | object>> {
    const verifyUserExists = await this.findById(id);

    if (!verifyUserExists.status) {
      return {
        StatusCode: 404,
        message: "Nenhum usuário encontrado",
        body: {},
      };
    }

    const user = await userRepository.delete(id);

    return {
      StatusCode: 200,
      message: "Usuário deletado",
      body: user,
    };
  }
}
