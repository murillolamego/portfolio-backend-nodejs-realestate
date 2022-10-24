import { ICreatePropertyDTO } from "@modules/properties/dtos/ICreatePropertyDTO";
import { Property } from "@modules/properties/entities/Property";
import { PropertiesRepositoryInMemory } from "@modules/properties/repositories/in-memory/PropertiesRepositoryInMemory";

import { CreatePropertyUseCase } from "./CreatePropertyUseCase";

let propertiesRepositoryInMemory: PropertiesRepositoryInMemory;
let createPropertyUseCase: CreatePropertyUseCase;

describe("Create property", () => {
  beforeEach(() => {
    propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();
    createPropertyUseCase = new CreatePropertyUseCase(
      propertiesRepositoryInMemory
    );
  });
  it("should be able to create a new property", async () => {
    const property: ICreatePropertyDTO = {
      name: "Property NAME",
      description: "Property DESCRIPTION",
      rent: 100,
      sale: 100000,
    };

    const createdProperty: Property = await createPropertyUseCase.execute(
      property
    );

    expect(createdProperty).toHaveProperty("id");
  });

  it("should be able to create a new property AVAILABLE by default", async () => {
    const property: ICreatePropertyDTO = {
      name: "Property NAME 2",
      description: "Property DESCRIPTION 2",
      rent: 200,
      sale: 200000,
    };

    const createdProperty: Property = await createPropertyUseCase.execute(
      property
    );

    expect(createdProperty.available).toBe(true);
  });
});
