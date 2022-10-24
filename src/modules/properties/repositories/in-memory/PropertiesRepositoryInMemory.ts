import { ICreatePropertyDTO } from "@modules/properties/dtos/ICreatePropertyDTO";
import { IListPropertiesDTO } from "@modules/properties/dtos/IListPropertiesDTO";
import { Property } from "@modules/properties/entities/Property";

import { IPropertiesRepository } from "../IPropertiesRepository";

class PropertiesRepositoryInMemory implements IPropertiesRepository {
  properties: Property[] = [];

  async create({
    name,
    description,
    rent,
    sale,
    available,
  }: ICreatePropertyDTO): Promise<Property> {
    const property: Property = {
      id: this.properties.length,
      name,
      description,
      rent,
      sale,
      available: available ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.properties.push(property);

    return property;
  }

  async update(id: number, property: ICreatePropertyDTO): Promise<Property> {
    const propertyIndex = this.properties.findIndex(
      (property) => property.id === id
    );

    if (propertyIndex !== -1) {
      Object.entries(property).forEach(([key, value]) => {
        if (key in this.properties[propertyIndex]) {
          this.properties[propertyIndex][key] = value;
        }
      });
    }

    return this.properties[propertyIndex];
  }

  async list({
    categories,
    features,
  }: IListPropertiesDTO): Promise<Property[]> {
    let properties = this.properties.filter((property) => property.available);

    if (Array.isArray(categories) && categories.length) {
      properties = properties.filter(function (property) {
        const propertyCategories = property.categories?.map(
          (category) => category.id
        );
        if (!propertyCategories) {
          return false;
        }
        return categories?.every((category) =>
          propertyCategories.includes(category)
        );
      });
    }

    if (Array.isArray(features) && features.length) {
      properties = properties.filter(function (property) {
        const propertyfeatures = property.features?.map(
          (feature) => feature.id
        );
        if (!propertyfeatures) {
          return false;
        }
        return features?.every((feature) => propertyfeatures.includes(feature));
      });
    }

    return properties;
  }

  async findById(id: number): Promise<Property> {
    const property = this.properties.find((property) => property.id === id);
    return property;
  }

  async delete(id: number): Promise<void> {
    const propertyIndex = this.properties.findIndex(
      (property) => property.id === id
    );

    if (propertyIndex !== -1) {
      this.properties.splice(propertyIndex, 1);
    }
  }
}
export { PropertiesRepositoryInMemory };
