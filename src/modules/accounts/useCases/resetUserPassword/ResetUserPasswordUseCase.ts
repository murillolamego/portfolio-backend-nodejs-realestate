import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUpdateUserDTO } from "@modules/accounts/dtos/IUpdateUserDTO copy";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetUserPasswordUseCase {
  constructor(
    @inject("UserTokensRepository")
    private readonly userTokensRepository: IUserTokensRepository,
    @inject("DayJsDateProvider")
    private readonly dayJsDateProvider: IDateProvider,
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Invalid recovery link");
    }

    if (
      this.dayJsDateProvider.compareBefore(
        userToken.expires,
        this.dayJsDateProvider.dateNow()
      )
    ) {
      throw new AppError("Expired recovery link");
    }

    const user = await this.usersRepository.findById(userToken.userId);

    const saltRounds = 10;
    const securePassword = await hash(password, saltRounds);

    const data: IUpdateUserDTO = {
      password: securePassword,
    };

    await this.usersRepository.update(user.id, data);

    await this.userTokensRepository.delete(userToken.id);
  }
}
export { ResetUserPasswordUseCase };
