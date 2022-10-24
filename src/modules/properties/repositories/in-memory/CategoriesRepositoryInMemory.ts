import { ICreateCategoryDTO } from "@modules/properties/dtos/ICreateCategoryDTO";
import { Category } from "@modules/properties/entities/Category";

import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async list(): Promise<Category[]> {
    const categories = this.categories;
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }

  async findById(id: number): Promise<Category> {
    const category = this.categories.find((category) => category.id === id);
    return category;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      id: this.categories.length,
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.categories.push(category);
  }

  async delete(id: number): Promise<void> {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id
    );

    if (categoryIndex !== -1) {
      this.categories.splice(categoryIndex, 1);
    }
  }
}
export { CategoriesRepositoryInMemory };
