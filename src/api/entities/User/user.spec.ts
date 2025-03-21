import { expect, test } from "vitest"
import { User } from "./User"


test("create an user", () => {
    const user = new User({
        fullName: "John Doe",
        email: "john@gmail.com ",
        password: "12345",
        cpf: "00011122233",
        birthday: new Date("2000-01-01"),
        profileId: "1",
    });

    expect(user).toBeInstanceOf(User);
    expect(user.fullName).toEqual("John Doe")
})

test("it should not be possible to create a user with empty fields", () => {

    expect(() => {
        return new User({
            fullName: "John Doe",
            email: "",
            password: "12345",
            cpf: "00011122233",
            birthday: new Date("2000-01-01"),
            profileId: "1",
        });
    }).toThrow()
})