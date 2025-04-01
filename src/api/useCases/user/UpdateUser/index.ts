import { UpdateUserController } from "../../../controllers/users/UpdateUser/Update";
import { UsersRepository } from "../../../repositories/user/implementations/user";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

const userRepository = new UsersRepository();
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const updateUserController = new UpdateUserController(updateUserUseCase);

export{updateUserController}