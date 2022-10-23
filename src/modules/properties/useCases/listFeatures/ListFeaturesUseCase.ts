import { inject, injectable } from "tsyringe";

import { Feature } from "@modules/properties/entities/Feature";
import { IFeaturesRepository } from "@modules/properties/repositories/IFeaturesRepository";

@injectable()
class ListFeaturesUseCase {
  constructor(
    @inject("FeaturesRepository")
    private readonly FeaturesRepository: IFeaturesRepository
  ) {}

  async execute(): Promise<Feature[]> {
    const features = await this.FeaturesRepository.list();

    return features;
  }
}

export { ListFeaturesUseCase };
