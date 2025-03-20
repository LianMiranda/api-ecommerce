import { ICreateUserRequestDTO } from "../CreateUser/CreateUserDTO";

export interface IUpdateUserRequestDTO extends Partial<ICreateUserRequestDTO> {
  actualPassword?: string;
}
