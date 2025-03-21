import {v4} from "uuid"

export class User{
    public readonly id!: string;
    public fullName!: string;
    public email!: string;
    public password!: string;
    public cpf!: string;
    public birthday!: Date;
    public profileId!: string;

    constructor(props: Omit<User, "id">, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id = v4()
        }
    }
}