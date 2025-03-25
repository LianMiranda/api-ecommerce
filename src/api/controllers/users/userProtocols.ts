export interface IUserInput {
  fullName: string;
  email: string;
  password: string;
  cpf: string;
  birthday: string;
  profileId: string;
}

export interface IUserUpdate extends Partial<IUserInput> {
  actualPassword?: string;
}

