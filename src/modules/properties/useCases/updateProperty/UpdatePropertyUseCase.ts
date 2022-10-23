import { inject, injectable } from "tsyringe";

import { ICreatePropertyDTO } from "@modules/properties/dtos/ICreatePropertyDTO";
import { Property } from "@modules/properties/entities/Property";
import { IPropertiesRepository } from "@modules/properties/repositories/IPropertiesRepository";

@injectable()
class UpdatePropertyUseCase {
  constructor(
    @inject("PropertiesRepository")
    private readonly propertiesRepository: IPropertiesRepository
  ) {}

  async execute(id: number, data: ICreatePropertyDTO): Promise<Property> {
    const property = await this.propertiesRepository.update(id, data);

    return property;
  }
}
export { UpdatePropertyUseCase };
