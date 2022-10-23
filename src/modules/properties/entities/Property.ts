import { Category } from "./Category";
import { Feature } from "./Feature";

class Property {
  id?: number;
  name: string;
  description: string;
  rent: number;
  sale: number;
  available? = true;
  createdAt: Date;
  updatedAt: Date;
  categories?: Category[];
  categoriesIds?: number;
  features?: Feature[];
  featuresIds?: number;
}

export { Property };
