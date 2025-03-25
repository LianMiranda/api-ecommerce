import { IUserRepository } from "../../../repositories/user/IUserRepository";
import {  ISignInRequestDTO } from "./SignInRequestDTO";
import { IHttpReturn } from "../../../controllers/protocols";

export class SignInUseCase {
  constructor(private userRepository: IUserRepository) {}

  async signIn(data: ISignInRequestDTO): Promise<IHttpReturn<object>> {
    
  }
}
