import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListFeaturesUseCase } from "./ListFeaturesUseCase";

class ListFeaturesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listFeaturesUseCase = container.resolve(ListFeaturesUseCase);

    const features = await listFeaturesUseCase.execute();

    return response.json(features);
  }
}

export { ListFeaturesController };
