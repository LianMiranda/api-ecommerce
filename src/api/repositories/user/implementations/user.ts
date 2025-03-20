import { PrismaClient } from "@prisma/client";
import {
  IUserInput,
  IUserReturns,
  IUserUpdate,
} from "../../../controllers/users/userProtocols";
import { IUserRepository } from "../IUserRepository";

const prisma = new PrismaClient();

export class UsersRepository implements IUserRepository {
  private model;

  constructor() {
    this.model = prisma.user;
  }

  async create(data: IUserInput): Promise<IUserReturns> {
    return this.model.create({
      data: data,
      select: {
        id: true,
        fullName: true,
        email: true,
        password: true,
        cpf: true,
        birthday: true,
        profileId: true,
      },
    });
  }

  async findAll(): Promise<IUserReturns[]> {
    return this.model.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        password: true,
        cpf: true,
        birthday: true,
        profileId: true,
      },
    });
  }

  async findById(id: string):Promise<IUserReturns | null> {
    return this.model.findUnique({
      where: { id },
      select: {
        fullName: true,
        email: true,
        password: true,
        cpf: true,
        birthday: true,
        profileId: true,
      },
    });
  }

  async update(id: string, data: Partial<IUserUpdate>): Promise<IUserReturns>{
    return this.model.update({
      where: { id },
      data: data,
    });
  }

  async delete(id: string): Promise<IUserReturns>{
    return this.model.delete({
      where: { id },
      select: {
        fullName: true,
        password: true,
        email: true,
        cpf: true,
        birthday: true,
        profileId: true,
      },
    });
  }
}
