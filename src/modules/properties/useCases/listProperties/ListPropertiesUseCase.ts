import { inject, injectable } from "tsyringe";

import { IListPropertiesDTO } from "@modules/properties/dtos/IListPropertiesDTO";
import { Property } from "@modules/properties/entities/Property";
import { IPropertiesRepository } from "@modules/properties/repositories/IPropertiesRepository";

@injectable()
class ListPropertiesUseCase {
  constructor(
    @inject("PropertiesRepository")
    private readonly propertiesRepository: IPropertiesRepository
  ) {}

  async execute({
    categories,
    features,
  }: IListPropertiesDTO): Promise<Property[]> {
    const properties = await this.propertiesRepository.list({
      categories,
      features,
    });

    return properties;
  }
}
export { ListPropertiesUseCase };
