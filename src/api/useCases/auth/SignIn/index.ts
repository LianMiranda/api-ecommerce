import { SignInController } from "../../../controllers/auth/SignIn/SignIn";
import { UsersRepository } from "../../../repositories/user/implementations/user";
import { SignInUseCase } from "./SignInUseCase";

const userRepository = new UsersRepository();
const signInUseCase = new SignInUseCase(userRepository);
const signInController = new SignInController(signInUseCase);

export { signInController };
