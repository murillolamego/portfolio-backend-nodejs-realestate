import { ICreatePropertyDTO } from "@modules/properties/dtos/ICreatePropertyDTO";
import { Property } from "@modules/properties/entities/Property";
import { IPropertiesRepository } from "@modules/properties/repositories/IPropertiesRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PropertiesRepository implements IPropertiesRepository {
  async create(data: ICreatePropertyDTO): Promise<Property> {
    const property = await prisma.property.create({
      data: {
        ...data,
        categories: {
          create: data.categories?.map((id) => ({
            assignedAt: new Date(),
            category: {
              connect: {
                id,
              },
            },
          })),
        },
        features: {
          create: data.features?.map((id) => ({
            assignedAt: new Date(),
            feature: {
              connect: {
                id,
              },
            },
          })),
        },
      },
    });

    return property;
  }

  async delete(id: number): Promise<void> {
    await prisma.property.delete({
      where: { id },
    });
  }

  async list(): Promise<Property[]> {
    const properties = await prisma.property.findMany({
      where: {
        available: true,
      },
    });

    return properties;
  }

  async update(id: number, data: ICreatePropertyDTO): Promise<Property> {
    const property = await prisma.property.update({
      where: {
        id,
      },
      data: {
        ...data,
        categories: {
          deleteMany: {},
          create: data.categories?.map((id) => ({
            assignedAt: new Date(),
            category: {
              connect: {
                id,
              },
            },
          })),
        },
        features: {
          deleteMany: {},
          create: data.features?.map((id) => ({
            assignedAt: new Date(),
            feature: {
              connect: {
                id,
              },
            },
          })),
        },
      },
    });

    return property;
  }

  async findById(id: number): Promise<Property> {
    const property = await prisma.property.findFirst({
      where: { id },
    });

    return property;
  }
}
export { PropertiesRepository };
