import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ email, password, name }: ICreateUserDTO): Promise<void> {
    const saltRounds = 10;
    const securePassword = await hash(password, saltRounds);

    await this.usersRepository.create({
      email,
      password: securePassword,
      name,
    });
  }
}
export { CreateUserUseCase };
