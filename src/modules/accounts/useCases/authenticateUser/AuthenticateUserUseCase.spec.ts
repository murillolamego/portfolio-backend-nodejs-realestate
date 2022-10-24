import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dayJsDateProvider = new DayJsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dayJsDateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate a user", async () => {
    const user: ICreateUserDTO = {
      email: "test@example.com",
      password: "123",
      name: "test",
    };

    await createUserUseCase.execute(user);

    const authenticatedUser = await authenticateUserUseCase.execute({
      email: "test@example.com",
      password: "123",
    });

    expect(authenticatedUser).toHaveProperty("token");
  });

  it("should NOT be able to authenticate with an invalid EMAIL", async () => {
    await expect(async () => {
      await authenticateUserUseCase.execute({
        email: "wrong@example.com",
        password: "123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should NOT be able to authenticate an invalid PASSWORD", async () => {
    await expect(async () => {
      const user: ICreateUserDTO = {
        email: "invalidEmail",
        password: "123",
        name: "test",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "invalidPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
