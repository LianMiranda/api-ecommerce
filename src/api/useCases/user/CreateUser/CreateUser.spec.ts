import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { User } from "../../../entities/User/User";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

const mockUserRepository = {
  create: vi.fn(),
  findAll: vi.fn(),
  findById: vi.fn(),
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
    mockUserRepository.create.mockResolvedValue({
      status: false,
      StatusCode: 400,
      message: "Nenhum campo pode estar vazio!",
      body: {},
    });

    const response = await createUser.create({
      fullName: " ",
      email: " ",
      password: "12345",
      cpf: "00011122233",
      birthday: "2000-01-01",
      profileId: "1",
    });

    expect(response.body).toEqual({});
    expect(response.message).toBe("Nenhum campo pode estar vazio!");
  });

  it("should not be possible to create a user that already exists", async () => {
    mockUserRepository.create.mockRejectedValueOnce({ code: "P2002" });

    const response = await createUser.create({
      fullName: "John Doe",
      email: "john@gmail.com",
      password: "12345",
      cpf: "53250359084",
      birthday: "2000-01-01",
      profileId: "1",
    });

    expect(response.body).toEqual({});
    expect(response.message).toBe("Email ou CPF já cadastrados");
  });

  it("should not be possible to create a user with an invalid format birthday", async () => {
    mockUserRepository.create.mockResolvedValue({
      message: "Verifique se a data esta no formato YYYY-MM-DD",
      body: {},
    });

    const response = await createUser.create({
      fullName: "John Doe",
      email: "john1@gmail.com",
      password: "12345",
      cpf: "49087727038",
      birthday: "2000/01-01",
      profileId: "1",
    });

    expect(response.message).toBe(
      "Verifique se a data esta no formato YYYY-MM-DD"
    );
  });

  it("should not be possible to create a user with an invalid cpf", async () => {
    mockUserRepository.create.mockResolvedValue({
      message: "Informe um cpf válido e somente com números",
      body: {},
    });

    const response = await createUser.create({
      fullName: "John Doe",
      email: "john1@gmail.com",
      password: "12345",
      cpf: "65979711107",
      birthday: "2000-01-01",
      profileId: "1",
    });

    expect(response.message).toBe(
      "Informe um cpf válido e somente com números"
    );
  });
  it("should not be possible to create a user with an invalid email", async () => {
    mockUserRepository.create.mockResolvedValue({
      message: "Informe um endereço de email válido",
    });

    const response = await createUser.create({
      fullName: "John Doe",
      email: "john21.com",
      password: "12345",
      cpf: "75463463042",
      birthday: "2000-01-01",
      profileId: "1",
    });

    expect(response.message).toBe("Informe um endereço de email válido");
  });
});
