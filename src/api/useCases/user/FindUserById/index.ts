import { FindUserByIdController } from "../../../controllers/users/FindUserById/FindById";
import { UsersRepository } from "../../../repositories/user/implementations/user";
import { FindUserByIdUseCase } from "./FindUserByIdUseCase";

const usersRepository = new UsersRepository();
const findUserByIdUseCase = new FindUserByIdUseCase(usersRepository);
const findUserByIdController = new FindUserByIdController(findUserByIdUseCase);

export {findUserByIdUseCase, findUserByIdController}




