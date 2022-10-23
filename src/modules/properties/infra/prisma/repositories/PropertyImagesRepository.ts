import { IPropertyImagesRepository } from "@modules/properties/repositories/IPropertyImagesRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PropertyImagesRepository implements IPropertyImagesRepository {
  async create(propertyId: number, imageNames: string): Promise<void> {
    await prisma.propertyImage.create({
      data: {
        propertyId,
        name: imageNames,
      },
    });
  }
}
export { PropertyImagesRepository };
