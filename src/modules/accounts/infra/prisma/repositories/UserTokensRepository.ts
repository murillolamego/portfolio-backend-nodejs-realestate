import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/entities/UserToken";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserTokensRepository implements IUserTokensRepository {
  async create({
    refreshToken,
    expires,
    userId,
  }: ICreateUserTokenDTO): Promise<void> {
    await prisma.userToken.create({
      data: { refreshToken, expires, userId },
    });
  }

  async findByRefreshToken(refreshToken: string): Promise<UserToken> {
    const userToken = await prisma.userToken.findFirst({
      where: { refreshToken },
    });

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken> {
    const userToken = await prisma.userToken.findFirst({
      where: { userId, refreshToken },
    });

    return userToken;
  }

  async delete(id: string): Promise<void> {
    await prisma.userToken.delete({
      where: { id },
    });
  }
}

export { UserTokensRepository };
