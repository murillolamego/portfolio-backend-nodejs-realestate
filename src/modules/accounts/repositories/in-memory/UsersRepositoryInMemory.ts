import { ICreateUserDTO } from "modules/accounts/dtos/ICreateUserDTO";
import { User } from "modules/accounts/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ email, password, name }): Promise<void> {
    const user = new User();

    Object.assign(user, {
      email,
      password,
      name,
    });

    this.users.push(user);
  }

  async update(id: string, user: ICreateUserDTO): Promise<void> {
    const userIndex = this.users.findIndex((userIndex) => userIndex.id === id);

    if (userIndex !== -1) {
      Object.entries(user).forEach(([key, value]) => {
        if (key in this.users[userIndex]) {
          this.users[userIndex][key] = value;
        }
      });
    }
  }

  async updateAvatar(id: string, avatar: string): Promise<void> {
    const userIndex = this.users.findIndex((userIndex) => userIndex.id === id);

    if (userIndex !== -1) {
      this.users[userIndex].avatar = avatar;
    }
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex((userIndex) => userIndex.id === id);

    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }
}

export { UsersRepositoryInMemory };
