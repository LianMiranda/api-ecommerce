import { describe, expect, it } from "vitest";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { UsersRepository } from "../../../repositories/user/implementations/user";
import { User } from "../../../entities/User/User";

const userRepository = new UsersRepository()

describe("Create User", () => {
    it('should be able to create an user', async () => {
        const createUser = new CreateUserUseCase(userRepository);

        const user =  await createUser.create({
            fullName: "John Doe",
            email: "john@gmail.com ",
            password: "12345",
            cpf: "00011122233",
            birthday: new Date("2000-01-01"),
            profileId: "1",
       });       

        expect(user.body).toBeInstanceOf(User);
        expect(user.message).toBe("Usuário criado com sucesso"); 
    })

    it('should be unable to create a user with empty fields', async () => {
        const createUser = new CreateUserUseCase(userRepository);

        const user =  await createUser.create({
            fullName: "John Doe",
            email: " ",
            password: "12345",
            cpf: "00011122233",
            birthday: new Date("2000-01-01"),
            profileId: "1",
       });       

        expect(user.body).toEqual({});
        expect(user.message).toBe("Nenhum campo pode estar vazio!"); 
    })
})