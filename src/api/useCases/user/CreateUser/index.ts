import { CreateUserController } from "../../../controllers/users/UserCreate/Create";
import { UsersRepository } from "../../../repositories/user/implementations/user";
import { CreateUserUseCase } from "./CreateUserUseCase";

const usersRepository = new UsersRepository();
const createUser = new CreateUserUseCase(usersRepository);
const createUserController = new CreateUserController(createUser);

export {createUser, createUserController};