import { beforeEach, describe, expect, it, vi } from "vitest";
import { User } from "../../../entities/User/User";
import { FindUserByIdUseCase } from "./FindUserByIdUseCase";

const mockUserRepository = {
  create: vi.fn(),
  findAll: vi.fn(),
  findById: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const userExpectExemple = [
  new User({
    fullName: "John Super Doe",
    email: "john-super-doe@gmail.com",
    password: "12345",
    cpf: "35285851025",
    birthday: "2000-01-01",
    profileId: "1",
  }, "1"),
];

describe("Find User By Id", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    const findById = new FindUserByIdUseCase(mockUserRepository);

    it("should get the specific user", async () => {
        mockUserRepository.findById.mockResolvedValue(userExpectExemple[0]);
        const response = await findById.findById("1");        

        expect(response.StatusCode).toBe(200);
        expect(response.body).toBeInstanceOf(User);
        expect(response.message).toBe("Usuários encontrados");
    })

    it("should not get the specific user if it does not exist", async () => {
        mockUserRepository.findById.mockResolvedValue(null);
        const response = await findById.findById("321321312312");        

        expect(response.body).toEqual([]);
        expect(response.message).toBe("Nenhum usuário encontrado");
        expect(response.StatusCode).toBe(404)
    })
});
