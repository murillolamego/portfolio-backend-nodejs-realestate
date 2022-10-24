import { inject, injectable } from "tsyringe";

import { ICreatePropertyDTO } from "@modules/properties/dtos/ICreatePropertyDTO";
import { Property } from "@modules/properties/entities/Property";
import { IPropertiesRepository } from "@modules/properties/repositories/IPropertiesRepository";

@injectable()
class CreatePropertyUseCase {
  constructor(
    @inject("PropertiesRepository")
    private readonly propertiesRepository: IPropertiesRepository
  ) {}

  async execute({
    name,
    description,
    rent,
    sale,
    categories,
    features,
  }: ICreatePropertyDTO): Promise<Property> {
    const property = await this.propertiesRepository.create({
      name,
      description,
      rent,
      sale,
      categories,
      features,
    });

    return property;
  }
}
export { CreatePropertyUseCase };
