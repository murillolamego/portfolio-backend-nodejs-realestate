import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserToken } from "../entities/UserToken";

interface IUserTokensRepository {
  create: (data: ICreateUserTokenDTO) => Promise<void>;
  findByRefreshToken: (refreshToken: string) => Promise<UserToken>;
  findByUserIdAndRefreshToken: (
    userId: string,
    refreshToken: string
  ) => Promise<UserToken>;
  delete: (id: string) => Promise<void>;
}
export { IUserTokensRepository };
