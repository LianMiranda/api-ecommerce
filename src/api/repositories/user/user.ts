import { PrismaClient } from "@prisma/client";
import { IUserInput } from "../../controllers/users/userProtocols";

const prisma = new PrismaClient();

export class UsersRepository {
  model;

  constructor() {
    this.model = prisma.user;
  }

  async create(data: IUserInput) {
    return this.model.create({
      data: data,
      select: {
        fullName: true,
        email: true,
        cpf: true,
        birthday: true,
        profileId: true,
      },
    });
  }

  async findAll(){
    return this.model.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        cpf: true,
        birthday: true,
        profileId: true,
      },
    });
  }

  async findById(id: string) {
    return this.model.findUnique({
      where: { id },
      select: {
        fullName: true,
        email: true,
        cpf: true,
        birthday: true,
        profileId: true,
      },
    });
  }

  async delete(id: string) {
    return this.model.delete({
      where: { id },
      select: {
        fullName: true,
        email: true,
        cpf: true,
        birthday: true,
        profileId: true,
      },
    });
  }
}
