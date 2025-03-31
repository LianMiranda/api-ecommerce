import { RegisterUserController } from "../../../controllers/auth/Register/Register";
import { createUserUseCase } from "../../user/CreateUser";
import { RegisterUseCase } from "./RegiserUseCase";

const registerUseCase = new RegisterUseCase(createUserUseCase);
const registerController = new RegisterUserController(registerUseCase);

export { registerController };
