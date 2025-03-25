import { beforeEach, describe, expect, it, vi } from "vitest";
import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { User } from "../../../entities/User/User";

const mockUserRepository = {
    create: vi.fn(),
    findAll: vi.fn(),
    findById: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };
  
  const userDeleted = new User({
      fullName: "John Doeeeeee",
      email: "johnnnnnnnn@gmail.com",
      password: "12345",
      cpf: "98548788054",
      birthday: "2000-01-01",
      profileId: "1",
  },"sdada6s45d654ad465sa456d645a")
    
describe("Delete User", () => {
    const deleteUser = new DeleteUserUseCase(mockUserRepository);

    beforeEach(() => {
        vi.resetAllMocks();
    })

    it("should be a possible delete user successfully", async () => {
        mockUserRepository.findById.mockResolvedValue(userDeleted);
        mockUserRepository.delete.mockResolvedValue(userDeleted);

        const response = await deleteUser.delete("sdada6s45d654ad465sa456d645a");
        
        expect(response.body).toBeInstanceOf(User);
        expect(response.StatusCode).toBe(200)
        expect(response.message).toBe("Usuário deletado com sucesso")
    });

    it("should not be possible to delete user that does not exist", async () => {
        mockUserRepository.findById.mockResolvedValue(null);

        const response = await deleteUser.delete("12333");

        expect(response.body).toEqual({});
        expect(response.message).toBe("Nenhum usuário encontrado")
        expect(response.StatusCode).toBe(404)
    })
})