export interface IUserInput {
  fullName: string;
  email: string;
  password: string;
  cpf: string;
  birthday: Date;
  profileId: string;
}

export interface IUserReturns {
    id?: string
    fullName: string;
    email: string;
    password: string;
    cpf: string;
    birthday: Date;
    profileId: string;
}
export interface IUserUpdate extends IUserInput {
   actualPassword: string;
}



