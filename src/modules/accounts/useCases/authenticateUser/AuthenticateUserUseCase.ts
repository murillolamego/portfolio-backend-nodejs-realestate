import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
    name: string;
  };
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private readonly userTokensRepository: IUserTokensRepository,
    @inject("DayJsDateProvider")
    private readonly dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect user or password");
    }

    const correctPassword = await compare(password, user.password);

    delete user.password;

    if (!correctPassword) {
      throw new AppError("Incorrect user or password");
    }

    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    const refreshExpires = process.env.JWT_REFRESH_EXPIRES;
    const refreshExpiresNumber = process.env.JWT_REFRESH_EXPIRES_NUMBER;

    const refreshToken = sign({ email }, refreshSecret, {
      subject: String(user.id),
      expiresIn: refreshExpires,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      parseInt(refreshExpiresNumber)
    );

    await this.userTokensRepository.create({
      refreshToken,
      expires: refreshTokenExpiresDate,
      userId: user.id,
    });

    const secret = process.env.JWT_SECRET;
    const expires = process.env.JWT_EXPIRES;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn: expires,
    });

    const tokenResponse: IResponse = {
      user,
      token,
      refreshToken,
    };

    return tokenResponse;
  }
}
export { AuthenticateUserUseCase };
