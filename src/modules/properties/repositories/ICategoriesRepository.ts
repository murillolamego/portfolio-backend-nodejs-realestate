import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Category } from "../entities/Category";

interface ICategoriesRepository {
  list: () => Promise<Category[]>;
  findByName: (name: string) => Promise<Category>;
  findById: (id: number) => Promise<Category>;
  create: ({ name, description }: ICreateCategoryDTO) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export { ICategoriesRepository };
