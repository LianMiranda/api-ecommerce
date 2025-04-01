// import { UsersRepository } from "../../../repositories/user/implementations/user";
import { DeleteUserController } from "../../../controllers/users/DeleteUser/Delete";
import { UsersRepository } from "../../../repositories/user/implementations/user";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

const userRepository = new UsersRepository();
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserController }