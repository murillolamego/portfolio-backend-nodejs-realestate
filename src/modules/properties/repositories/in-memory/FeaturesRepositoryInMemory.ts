import { ICreateFeatureDTO } from "@modules/properties/dtos/ICreateFeatureDTO";
import { Feature } from "@modules/properties/entities/Feature";

import { IFeaturesRepository } from "../IFeaturesRepository";

class FeaturesRepositoryInMemory implements IFeaturesRepository {
  features: Feature[] = [];

  async list(): Promise<Feature[]> {
    const features = this.features;
    return features;
  }

  async findByName(name: string): Promise<Feature> {
    const Feature = this.features.find((feature) => Feature.name === name);
    return Feature;
  }

  async findById(id: number): Promise<Feature> {
    const feature = this.features.find((feature) => feature.id === id);
    return feature;
  }

  async create({ name, description }: ICreateFeatureDTO): Promise<void> {
    const feature = new Feature();

    Object.assign(feature, {
      id: this.features.length,
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.features.push(feature);
  }

  async delete(id: number): Promise<void> {
    const featureIndex = this.features.findIndex(
      (feature) => feature.id === id
    );

    if (featureIndex !== -1) {
      this.features.splice(featureIndex, 1);
    }
  }
}
export { FeaturesRepositoryInMemory };
