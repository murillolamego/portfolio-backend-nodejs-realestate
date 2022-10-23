import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/properties/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private readonly categoriesRepository: ICategoriesRepository
  ) {}

  async execute(id: number): Promise<void> {
    const categoryExists = await this.categoriesRepository.findById(id);

    if (!categoryExists) {
      throw new AppError("Category doesn't exist");
    }

    await this.categoriesRepository.delete(id);
  }
}

export { DeleteCategoryUseCase };
