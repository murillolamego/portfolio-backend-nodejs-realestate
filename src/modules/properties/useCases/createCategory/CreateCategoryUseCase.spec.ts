import { CategoriesRepositoryInMemory } from "modules/properties/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

describe("Create a new category", () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category NAME",
      description: "Category DESCRIPTION",
    };

    await createCategoryUseCase.execute(category);

    const createdCategory = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(createdCategory).toHaveProperty("createdAt");
  });

  it("should NOT be able to create a category with same NAME", async () => {
    await expect(async () => {
      const category = {
        name: "Category NAME",
        description: "Category DESCRIPTION",
      };

      await createCategoryUseCase.execute(category);

      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
