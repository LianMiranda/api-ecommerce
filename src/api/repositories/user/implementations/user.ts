import { PrismaClient } from "@prisma/client";
import {
  IUserInput,
  IUserUpdate,
} from "../../../controllers/users/userProtocols";
import { IUserRepository } from "../IUserRepository";
import { User } from "../../../entities/User/User";

const prisma = new PrismaClient();

export class UsersRepository implements IUserRepository {
  private model;

  constructor() {
    this.model = prisma.user;
  }

  async create(data: IUserInput): Promise<User> {
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

  async findAll(): Promise<User[]> {
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

  async findById(id: string):Promise<User | null> {
    return this.model.findUnique({
      where: { id },
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

  async update(id: string, data: Partial<IUserUpdate>): Promise<User>{
    return this.model.update({
      where: { id },
      data: data,
    });
  }

  async delete(id: string): Promise<User>{
    return this.model.delete({
      where: { id },
      select: {
        id: true,
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
