import { ICreateFeatureDTO } from "@modules/properties/dtos/ICreateFeatureDTO";
import { Feature } from "@modules/properties/entities/Feature";
import { IFeaturesRepository } from "@modules/properties/repositories/IFeaturesRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class FeaturesRepository implements IFeaturesRepository {
  async list(): Promise<Feature[]> {
    const features = await prisma.feature.findMany();

    return features;
  }

  async findByName(name: string): Promise<Feature> {
    const Feature = await prisma.feature.findFirst({
      where: { name },
    });

    return Feature;
  }

  async findById(id: number): Promise<Feature> {
    const feature = await prisma.feature.findFirst({
      where: { id },
    });

    return feature;
  }

  async create({ name, description }: ICreateFeatureDTO): Promise<void> {
    await prisma.feature.create({
      data: { name, description },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.feature.delete({
      where: { id },
    });
  }
}

export { FeaturesRepository };
