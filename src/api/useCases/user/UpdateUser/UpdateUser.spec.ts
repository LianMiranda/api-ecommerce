import { beforeEach, describe, expect, it, vi } from "vitest";
import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { User } from "../../../entities/User/User";
import { IUpdateUserRequestDTO } from "./UpdateUserDTO";

const mockUserRepository = {
  create: vi.fn(),
  findAll: vi.fn(),
  findById: vi.fn(),
  findByEmail: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const userTestExample: User = new User(
  {
    fullName: "Fulano",
    email: "fulano@gmail.com",
    password: "12345",
    cpf: "47613744035",
    birthday: "2000-01-01",
    profileId: "1",
  },
  "dlsksdljksaldkjasdkljasd"
);

const userTestExampleUpdated: IUpdateUserRequestDTO = {
  fullName: "Fulano da Silva Sauro",
  email: "fulano123@gmail.com",
  birthday: "2004-02-12",
};

describe("Update User", () => {
  const updateUser = new UpdateUserUseCase(mockUserRepository);

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should be possible to successfully update the user", async () => {
    mockUserRepository.findById.mockResolvedValue(userTestExample);
    mockUserRepository.update.mockImplementation((id, data) => {
      id = "dlsksdljksaldkjasdkljasd";
      const updatedData = { ...userTestExample, ...data };
      return Promise.resolve(new User(updatedData, id));
    });

    const response = await updateUser.update(
      "dlsksdljksaldkjasdkljasd",
      userTestExampleUpdated
    );

    expect(response.StatusCode).toBe(200);
    expect(response.message).toBe("Usuário atualizado com sucesso");
    expect(response.body).toBeInstanceOf(User);
  });

  it("should not be possible to update a user that does not exist", async () => {
    mockUserRepository.findById.mockResolvedValue(null);

    await expect(
      updateUser.update("1234", userTestExampleUpdated)
    ).rejects.toThrow("Nenhum usuário encontrado");
  });

  it("it should not be possible to update a user who has only added the new password", async () => {
    mockUserRepository.findById.mockResolvedValue(userTestExample);
    mockUserRepository.update.mockImplementation((id, data) => {
      id = "dlsksdljksaldkjasdkljasd";
      const updatedData = { ...userTestExample, ...data };
      return Promise.resolve(new User(updatedData, id));
    });

    await expect(
      updateUser.update("dlsksdljksaldkjasdkljasd", {
        password: "12222",
      })
    ).rejects.toThrow("A senha atual do usuário deve ser digitada");
  });

  it("should not be possible to update a user who has added wrong actualPassword", async () => {
    mockUserRepository.findById.mockResolvedValue(userTestExample);
    mockUserRepository.update.mockImplementation((id, data) => {
      id = "dlsksdljksaldkjasdkljasd";
      const updatedData = { ...userTestExample, ...data };
      return Promise.resolve(new User(updatedData, id));
    });

    await expect(
      updateUser.update("dlsksdljksaldkjasdkljasd", {
        password: "12222",
        actualPassword: "552233",
      })
    ).rejects.toThrow("As senhas não condizem");
  });

  it("it should not be possible to update a user who added an invalid CPF", async () => {
    mockUserRepository.findById.mockResolvedValue(userTestExample);
    mockUserRepository.update.mockImplementation((id, data) => {
      id = "dlsksdljksaldkjasdkljasd";
      const updatedData = { ...userTestExample, ...data };
      return Promise.resolve(new User(updatedData, id));
    });
    expect(
      updateUser.update("dlsksdljksaldkjasdkljasd", {
        cpf: "12312312323",
      })
    ).rejects.toThrow("Informe um cpf válido e somente com números");
  });

  it("it should not be possible to update a user who added an invalid email", async () => {
    mockUserRepository.findById.mockResolvedValue(userTestExample);
    mockUserRepository.update.mockImplementation((id, data) => {
      id = "dlsksdljksaldkjasdkljasd";
      const updatedData = { ...userTestExample, ...data };
      return Promise.resolve(new User(updatedData, id));
    });

    await expect(
      updateUser.update("dlsksdljksaldkjasdkljasd", {
        email: "lian@.com",
      })
    ).rejects.toThrow("Informe um endereço de email válido");
  });

  it("it should not be possible to update a user who added an invalid birthday format", async () => {
    mockUserRepository.findById.mockResolvedValue(userTestExample);
    mockUserRepository.update.mockImplementation((id, data) => {
      id = "dlsksdljksaldkjasdkljasd";
      const updatedData = { ...userTestExample, ...data };
      return Promise.resolve(new User(updatedData, id));
    });
    await expect(
      updateUser.update("dlsksdljksaldkjasdkljasd", {
        birthday: "2000/01/01",
      })
    ).rejects.toThrow("Verifique se a data esta no formato YYYY-MM-DD");
  });

  it("it should not be possible to update the user with data from another user that already exists", async () => {
    mockUserRepository.findById.mockResolvedValue(userTestExample);
    mockUserRepository.update.mockRejectedValueOnce({ code: "P2002" });

    expect(
      updateUser.update("dlsksdljksaldkjasdkljasd", {
        email: "lian@gmail.com",
        cpf: "05143709040",
      })
    ).rejects.toThrow("Email ou CPF já cadastrados");
  });
});
