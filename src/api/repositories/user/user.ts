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
            fullName: true,
            email: true,
            cpf: true,
            birthday: true,
            profileId: true,
          },
    })
  }
}
