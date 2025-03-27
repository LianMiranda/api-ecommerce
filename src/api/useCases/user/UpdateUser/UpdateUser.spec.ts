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

    const response = await updateUser.update("1234", userTestExampleUpdated);

    expect(response.StatusCode).toBe(404);
    expect(response.message).toBe("Usuário não encontrado");
    expect(response.body).toEqual({});
  });

  it("it should not be possible to update a user who has only added the new password", async () => {
    mockUserRepository.findById.mockResolvedValue(userTestExample);
    mockUserRepository.update.mockImplementation((id, data) => {
      id = "dlsksdljksaldkjasdkljasd";
      const updatedData = { ...userTestExample, ...data };
      return Promise.resolve(new User(updatedData, id));
    });

    const response = await updateUser.update("dlsksdljksaldkjasdkljasd", {
      password: "12222",
    });

    expect(response.StatusCode).toBe(400);
    expect(response.message).toBe("A senha atual do usuário deve ser digitada");
    expect(response.body).toEqual({});
  });

  it("should not be possible to update a user who has added wrong actualPassword", async () => {
    mockUserRepository.findById.mockResolvedValue(userTestExample);
    mockUserRepository.update.mockImplementation((id, data) => {
      id = "dlsksdljksaldkjasdkljasd";
      const updatedData = { ...userTestExample, ...data };
      return Promise.resolve(new User(updatedData, id));
    });

    const response = await updateUser.update("dlsksdljksaldkjasdkljasd", {
      password: "12222",
      actualPassword: "552233",
    });

    expect(response.StatusCode).toBe(400);
    expect(response.message).toBe("As senhas não condizem");
    expect(response.body).toEqual({});
  });
  
  it("it should not be possible to update a user who added an invalid CPF", async () => {
    mockUserRepository.findById.mockResolvedValue(userTestExample);
    mockUserRepository.update.mockImplementation((id, data) => {
      id = "dlsksdljksaldkjasdkljasd";
      const updatedData = { ...userTestExample, ...data };
      return Promise.resolve(new User(updatedData, id));
    });

    const response = await updateUser.update("dlsksdljksaldkjasdkljasd", {
     cpf: "12312312323"
    });

    expect(response.StatusCode).toBe(400);
    expect(response.message).toBe("Informe um cpf válido e somente com números");
    expect(response.body).toEqual({});
  });
  
  it("it should not be possible to update a user who added an invalid email", async () => {
    mockUserRepository.findById.mockResolvedValue(userTestExample);
    mockUserRepository.update.mockImplementation((id, data) => {
      id = "dlsksdljksaldkjasdkljasd";
      const updatedData = { ...userTestExample, ...data };
      return Promise.resolve(new User(updatedData, id));
    });

    const response = await updateUser.update("dlsksdljksaldkjasdkljasd", {
     email: "lian@.com"
    });

    expect(response.StatusCode).toBe(400);
    expect(response.message).toBe("Informe um endereço de email válido");
    expect(response.body).toEqual({});
  });
  
  it("it should not be possible to update a user who added an invalid birthday format", async () => {
    mockUserRepository.findById.mockResolvedValue(userTestExample);
    mockUserRepository.update.mockImplementation((id, data) => {
      id = "dlsksdljksaldkjasdkljasd";
      const updatedData = { ...userTestExample, ...data };
      return Promise.resolve(new User(updatedData, id));
    });

    const response = await updateUser.update("dlsksdljksaldkjasdkljasd", {
     birthday: "2000/01/01"
    });

    expect(response.StatusCode).toBe(400);
    expect(response.message).toBe("Verifique se a data esta no formato YYYY-MM-DD");
    expect(response.body).toEqual({});
  });

  it("it should not be possible to update the user with data from another user that already exists", async () => {
    mockUserRepository.findById.mockResolvedValue(userTestExample);
    mockUserRepository.update.mockRejectedValueOnce({ code: "P2002" });

    const response = await updateUser.update("dlsksdljksaldkjasdkljasd", {
     email: "lian@gmail.com",
     cpf: "05143709040"
    });

    expect(response.StatusCode).toBe(400);
    expect(response.message).toBe("Email ou CPF já cadastrados");
    expect(response.body).toEqual({});
  });
});
