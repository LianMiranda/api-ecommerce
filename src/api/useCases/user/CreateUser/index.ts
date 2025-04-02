import { UsersRepository } from "../../../repositories/user/implementations/user";
import { CreateUserUseCase } from "./CreateUserUseCase";

const usersRepository = new UsersRepository();
const createUserUseCase = new CreateUserUseCase(usersRepository);

export { createUserUseCase };
