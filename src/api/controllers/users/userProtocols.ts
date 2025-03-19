export interface IUserInput {
  fullName: string;
  email: string;
  password: string;
  cpf: string;
  birthday: Date;
  profileId: string;
}

export interface IUserReturns {
    fullName: string;
    email: string;
    cpf: string;
    birthday: Date;
    profileId: string;
}
