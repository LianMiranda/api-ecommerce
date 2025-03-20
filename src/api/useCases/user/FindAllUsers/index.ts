import { FindAllUsersController } from "../../../controllers/users/FindAllUsers/FindAll";
import { UsersRepository } from "../../../repositories/user/implementations/user";
import { FindAllUsersUseCase } from "./FindAllUsersUseCase";

const usersRepository = new UsersRepository();
const findAllUsersUseCase = new FindAllUsersUseCase(usersRepository);
const findAllUsersController = new FindAllUsersController(findAllUsersUseCase);

export{findAllUsersUseCase, findAllUsersController}


