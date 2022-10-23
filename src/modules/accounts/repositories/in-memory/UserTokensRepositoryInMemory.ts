import { ICreateUserTokenDTO } from "modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "modules/accounts/entities/UserToken";
import { IUserTokensRepository } from "modules/accounts/repositories/IUserTokensRepository";

const userTokens: UserToken[] = [];

class UserTokensRepositoryInMemory implements IUserTokensRepository {
  userToken = new UserToken();

  async create({
    refreshToken,
    expires,
    userId,
  }: ICreateUserTokenDTO): Promise<void> {
    Object.assign(this.userToken, { refreshToken, expires, userId });

    userTokens.push(this.userToken);
  }

  async findByRefreshToken(refreshToken: string): Promise<UserToken> {
    const userToken = userTokens.find(
      (token) => token.refreshToken === refreshToken
    );

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken> {
    const userToken = userTokens.find(
      (token) => token.userId === userId && token.refreshToken === refreshToken
    );

    return userToken;
  }

  async delete(id: string): Promise<void> {
    const index = userTokens.findIndex((token) => token.id === id);
    userTokens.splice(index, 1);
  }
}

export { UserTokensRepositoryInMemory };
