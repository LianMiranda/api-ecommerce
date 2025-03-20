export interface ICreateUserRequestDTO {
  fullName: string;
  email: string;
  password: string;
  cpf: string;
  birthday: Date;
  profileId: string;
}
