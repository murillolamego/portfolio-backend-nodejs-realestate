import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreatePropertyDTO } from "@modules/properties/dtos/ICreatePropertyDTO";

import { CreatePropertyUseCase } from "./CreatePropertyUseCase";

class CreatePropertyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      rent,
      sale,
      categories,
      features,
    }: ICreatePropertyDTO = request.body;
    const createdPropertyUseCase = container.resolve(CreatePropertyUseCase);

    const property = await createdPropertyUseCase.execute({
      name,
      description,
      rent,
      sale,
      categories,
      features,
    });

    return response.status(201).json(property);
  }
}
export { CreatePropertyController };
