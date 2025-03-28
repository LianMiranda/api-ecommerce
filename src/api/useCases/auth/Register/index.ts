import { RegisterUserController } from "../../../controllers/auth/Register/Register";
import { createUserUseCase } from "../../user/CreateUser";
import { RegisterUseCase } from "./RegiserUseCase";

const registerUseCase = new RegisterUseCase(createUserUseCase);
const regiterController = new RegisterUserController(registerUseCase)

export {registerUseCase, regiterController}