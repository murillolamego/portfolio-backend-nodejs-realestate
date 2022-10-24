import { Request, Response } from "express";
import { container } from "tsyringe";

import { IListPropertiesDTO } from "@modules/properties/dtos/IListPropertiesDTO";

import { ListPropertiesUseCase } from "./ListPropertiesUseCase";

class ListPropertiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { categories, features }: IListPropertiesDTO = request.body;

    const listPropertiesUseCase = container.resolve(ListPropertiesUseCase);

    const properties = await listPropertiesUseCase.execute({
      categories,
      features,
    });

    return response.json(properties);
  }
}
export { ListPropertiesController };
