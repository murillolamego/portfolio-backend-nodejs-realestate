import { ICreateFeatureDTO } from "../dtos/ICreateFeatureDTO";
import { Feature } from "../entities/Feature";

interface IFeaturesRepository {
  list: () => Promise<Feature[]>;
  findByName: (name: string) => Promise<Feature>;
  findById: (id: number) => Promise<Feature>;
  create: ({ name, description }: ICreateFeatureDTO) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export { IFeaturesRepository };
