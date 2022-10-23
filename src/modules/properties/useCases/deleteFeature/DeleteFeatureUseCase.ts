import { inject, injectable } from "tsyringe";

import { IFeaturesRepository } from "@modules/properties/repositories/IFeaturesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteFeatureUseCase {
  constructor(
    @inject("FeaturesRepository")
    private readonly featuresRepository: IFeaturesRepository
  ) {}

  async execute(id: number): Promise<void> {
    const featureExists = await this.featuresRepository.findById(id);

    if (!featureExists) {
      throw new AppError("Feature doesn't exist");
    }

    await this.featuresRepository.delete(id);
  }
}

export { DeleteFeatureUseCase };
