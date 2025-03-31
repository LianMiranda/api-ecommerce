import { ProfileController } from "../../../controllers/users/Profile/Profile";
import { UsersRepository } from "../../../repositories/user/implementations/user";
import { ProfileUseCase } from "./ProfileUseCase";

const usersRepository = new UsersRepository();
const profileUseCase = new ProfileUseCase(usersRepository);
const profileController = new ProfileController(profileUseCase);

export { profileController };
