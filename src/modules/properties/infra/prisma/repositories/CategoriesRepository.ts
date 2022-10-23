import { ICreateCategoryDTO } from "@modules/properties/dtos/ICreateCategoryDTO";
import { Category } from "@modules/properties/entities/Category";
import { ICategoriesRepository } from "@modules/properties/repositories/ICategoriesRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CategoriesRepository implements ICategoriesRepository {
  async list(): Promise<Category[]> {
    const categories = await prisma.category.findMany();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await prisma.category.findFirst({
      where: { name },
    });
    return category;
  }

  async findById(id: number): Promise<Category> {
    const category = await prisma.category.findFirst({
      where: { id },
    });
    return category;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    await prisma.category.create({
      data: { name, description },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.category.delete({
      where: {
        id,
      },
    });
  }
}

export { CategoriesRepository };
