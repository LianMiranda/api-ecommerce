import { v4 } from "uuid";

export class User {
  public readonly id!: string;
  public fullName!: string;
  public email!: string;
  public password!: string;
  public cpf!: string;
  public birthday!: string;
  public profileId!: string;

  constructor(props: Omit<User, "id">, id?: string) {
    this.id = id ?? v4();
    Object.assign(this, props);

    const isNull = Object.values(props).some(
      (value) => value === null || value === ""
    );

    if (isNull) {
      throw new Error("Nenhum campo pode estar vazio");
    }
  }
}
