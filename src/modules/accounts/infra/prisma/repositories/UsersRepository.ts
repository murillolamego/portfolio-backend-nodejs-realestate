import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "@modules/accounts/dtos/IUpdateUserDTO copy";
import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UsersRepository implements IUsersRepository {
  async create({ email, password, name }: ICreateUserDTO): Promise<void> {
    await prisma.user.create({
      data: { email, password, name },
    });
  }

  async update(id: string, data: IUpdateUserDTO): Promise<void> {
    await prisma.user.update({
      where: { id },
      data,
    });
  }

  async updateAvatar(id: string, avatar: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: {
        avatar,
      },
    });
  }

  async findById(id: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    return user;
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }
}

export { UsersRepository };
