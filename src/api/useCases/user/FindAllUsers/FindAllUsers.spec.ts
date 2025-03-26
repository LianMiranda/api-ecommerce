import { beforeEach, describe, expect, it, vi } from "vitest";
import { FindAllUsersUseCase } from "./FindAllUsersUseCase";
import { User } from "../../../entities/User/User";

const mockUserRepository = {
  create: vi.fn(),
  findAll: vi.fn(),
  findById: vi.fn(),
  findByEmail: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const expectUsersExemple: object = [
  new User({
    fullName: "John Doe",
    email: "john-doe@gmail.com",
    password: "12345",
    cpf: "45842640074",
    birthday: "2000-01-01",
    profileId: "1",
  }),
  new User({
    fullName: "Jane Doe",
    email: "jane-doe@gmail.com",
    password: "67890",
    cpf: "43991350009",
    birthday: "1999-05-15",
    profileId: "2",
  }),
];

describe("Get all users", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  const getUsers = new FindAllUsersUseCase(mockUserRepository);

  it("should be possible to search for all users ", async () => {
    mockUserRepository.findAll.mockResolvedValue(expectUsersExemple);

    const response = await getUsers.findAll();
    response.body.forEach((user: unknown) => {
        expect(user).toBeInstanceOf(User)
    });
    expect(response.StatusCode).toBe(200);
  });

 it("shouldn't be possible to search for users if there aren't any", async () => {
    mockUserRepository.findAll.mockResolvedValue([]);

    const response = await getUsers.findAll();
    
    expect(response.body).toEqual([]);
    expect(response.message).toBe("Nenhum usuário encontrado");
    expect(response.StatusCode).toBe(404)
 });
});
