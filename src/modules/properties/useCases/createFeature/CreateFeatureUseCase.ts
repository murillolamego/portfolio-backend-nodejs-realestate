import { inject, injectable } from "tsyringe";

import { IFeaturesRepository } from "@modules/properties/repositories/IFeaturesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateFeatureUseCase {
  constructor(
    @inject("FeaturesRepository")
    private readonly featuresRepository: IFeaturesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const featureAlreadyExists = await this.featuresRepository.findByName(name);

    if (featureAlreadyExists) {
      throw new AppError("Feature already exists");
    }

    await this.featuresRepository.create({ name, description });
  }
}

export { CreateFeatureUseCase };
