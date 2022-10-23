import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refreshToken: string;
}

@injectable()
class ReauthenticateUserUseCase {
  constructor(
    @inject("UserTokensRepository")
    private readonly userTokensRepository: IUserTokensRepository,
    @inject("DayJsDateProvider")
    private readonly dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    const refreshExpires = process.env.JWT_REFRESH_EXPIRES;
    const refreshExpiresNumber = process.env.JWT_REFRESH_EXPIRES_NUMBER;

    const { email, sub } = verify(token, refreshSecret) as IPayload;

    const userId = sub;

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        userId,
        token
      );

    if (!userToken) {
      throw new AppError("Invalid refresh token provided");
    }

    await this.userTokensRepository.delete(userToken.id);

    const refreshToken = sign({ email }, refreshSecret, {
      subject: userId,
      expiresIn: refreshExpires,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      parseInt(refreshExpiresNumber)
    );

    await this.userTokensRepository.create({
      refreshToken,
      expires: refreshTokenExpiresDate,
      userId,
    });

    const secret = process.env.JWT_SECRET;
    const expires = process.env.JWT_EXPIRES;

    const newToken = sign({}, secret, {
      subject: userId,
      expiresIn: expires,
    });

    return { token: newToken, refreshToken };
  }
}

export { ReauthenticateUserUseCase };
