import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { User } from "../../../entities/User/User";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

const mockUserRepository = {
  create: vi.fn(),
  findAll: vi.fn(),
  findById: vi.fn(),
  findByEmail: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

beforeEach(() => {
  vi.resetAllMocks();
});

const expectUser: ICreateUserRequestDTO = new User({
  fullName: "John Doe",
  email: "john@gmail.com",
  password: "12345",
  cpf: "00011122233",
  birthday: "2000-01-01",
  profileId: "1",
});

describe("Create User", () => {
  const createUser = new CreateUserUseCase(mockUserRepository);

  it("should be able to create an user", async () => {
    mockUserRepository.create.mockResolvedValue(expectUser);

    const response = await createUser.create({
      fullName: "John Doe",
      email: "john@gmail.com",
      password: "12345",
      cpf: "53250359084",
      birthday: "2000-01-01",
      profileId: "1",
    });

    expect(response.body).toBeInstanceOf(User);
    expect(response.message).toBe("Usuário criado com sucesso");
  });

  it("should be unable to create a user with empty fields", async () => {
    mockUserRepository.create.mockResolvedValue(null);

    await expect(
      createUser.create({
        fullName: " ",
        email: " ",
        password: "12345",
        cpf: "00011122233",
        birthday: "2000-01-01",
        profileId: "1",
      })
    ).rejects.toThrow("Nenhum campo pode estar vazio!");
  });

  it("should not be possible to create a user that already exists", async () => {
    mockUserRepository.create.mockRejectedValueOnce({ code: "P2002" });

    await expect(
      createUser.create({
        fullName: "John Doe",
        email: "john@gmail.com",
        password: "12345",
        cpf: "78762184075",
        birthday: "2000-01-01",
        profileId: "1",
      })
    ).rejects.toThrow("Email ou CPF já cadastrados");
  });

  it("should not be possible to create a user with an invalid format birthday", async () => {
    mockUserRepository.create.mockResolvedValue({
      message: "Verifique se a data esta no formato YYYY-MM-DD",
      body: {},
    });

    await expect(
      createUser.create({
        fullName: "John Doe",
        email: "john1@gmail.com",
        password: "12345",
        cpf: "49087727038",
        birthday: "2000/01-01",
        profileId: "1",
      })
    ).rejects.toThrow("Verifique se a data esta no formato YYYY-MM-DD");
  });

  it("should not be possible to create a user with an invalid cpf", async () => {
    mockUserRepository.create.mockResolvedValue({
      message: "Informe um cpf válido e somente com números",
      body: {},
    });

    await expect(
      createUser.create({
        fullName: "John Doe",
        email: "john1@gmail.com",
        password: "12345",
        cpf: "323232323223",
        birthday: "2000-01-01",
        profileId: "1",
      })
    ).rejects.toThrow("Informe um cpf válido e somente com números");
  });

  it("should not be possible to create a user with an invalid email", async () => {
    mockUserRepository.create.mockResolvedValue({
      message: "Informe um endereço de email válido",
    });

     await expect(
      createUser.create({
        fullName: "John Doe",
        email: "john12",
        password: "12345",
        cpf: "67708692091",
        birthday: "2000-01-01",
        profileId: "1",
      })
    ).rejects.toThrow("Informe um endereço de email válido");
  });
});
