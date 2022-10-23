import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateFeatureUseCase } from "./CreateFeatureUseCase";

class CreateFeatureController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createFeatureUseCase = container.resolve(CreateFeatureUseCase);

    await createFeatureUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateFeatureController };
