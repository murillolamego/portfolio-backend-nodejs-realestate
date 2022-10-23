import { inject, injectable } from "tsyringe";

import { Category } from "@modules/properties/entities/Category";
import { ICategoriesRepository } from "@modules/properties/repositories/ICategoriesRepository";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private readonly categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
