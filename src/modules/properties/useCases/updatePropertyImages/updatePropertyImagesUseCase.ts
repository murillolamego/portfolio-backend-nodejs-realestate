import { inject, injectable } from "tsyringe";

import { IPropertyImagesRepository } from "@modules/properties/repositories/IPropertyImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  propertyId: number;
  imageNames: string[];
}

@injectable()
class UpdatePropertyImageUseCase {
  constructor(
    @inject("PropertyImagesRepository")
    private readonly propertyImagesRepository: IPropertyImagesRepository,
    @inject("StorageProvider")
    private readonly storageProvider: IStorageProvider
  ) {}

  async execute({ propertyId, imageNames }: IRequest): Promise<void> {
    imageNames.map(async (image) => {
      await this.propertyImagesRepository.create(propertyId, image);
    });
  }
}

export { UpdatePropertyImageUseCase };
