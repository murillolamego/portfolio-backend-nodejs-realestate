import { Property } from "modules/properties/entities/Property";
import { PropertiesRepositoryInMemory } from "modules/properties/repositories/in-memory/PropertiesRepositoryInMemory";

import { ListPropertiesUseCase } from "./ListPropertiesUseCase";

let listPropertiesUseCase: ListPropertiesUseCase;
let propertiesRepositoryInMemory: PropertiesRepositoryInMemory;

describe("List properties with OPTIONAL parameters", () => {
  propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();
  listPropertiesUseCase = new ListPropertiesUseCase(
    propertiesRepositoryInMemory
  );

  it("Should be able to list all AVAILABLE properties", async () => {
    const availableProperty = {
      name: "property AVAILABLE",
      description: "property AVAILABLE description",
      rent: 1,
      sale: 11,
    };

    await propertiesRepositoryInMemory.create(availableProperty);

    const properties: Property[] = await listPropertiesUseCase.execute({});

    expect(
      properties.length === 1 && properties[0].name === availableProperty.name
    ).toBeTruthy();
  });

  it("Should NOT be able to list NONAVAILABLE properties", async () => {
    const unavailableProperty = await propertiesRepositoryInMemory.create({
      name: "property UNAVAILABLE",
      description: "property UNAVAILABLE description",
      rent: 2,
      sale: 22,
      available: false,
    });

    const properties = await listPropertiesUseCase.execute({});

    expect(
      properties.length === 1 && properties[0].name !== unavailableProperty.name
    ).toBeTruthy();
  });
});
