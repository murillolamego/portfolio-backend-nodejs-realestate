import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO copy";
import { User } from "../entities/User";

interface IUsersRepository {
  create: (data: ICreateUserDTO) => Promise<void>;
  update: (id: string, data: IUpdateUserDTO) => Promise<void>;
  updateAvatar: (id: string, data: string) => Promise<void>;
  delete: (id: string) => Promise<void>;
  findByEmail: (email: string) => Promise<User>;
  findById: (id: string) => Promise<User>;
}
export { IUsersRepository };
