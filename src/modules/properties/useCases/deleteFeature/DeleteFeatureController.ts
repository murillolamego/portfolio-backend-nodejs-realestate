import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteFeatureUseCase } from "./DeleteFeatureUseCase";

class DeleteFeatureController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { featureId } = request.params;
    const deleteFeatureUseCase = container.resolve(DeleteFeatureUseCase);

    await deleteFeatureUseCase.execute(parseInt(featureId));

    return response.send(200);
  }
}

export { DeleteFeatureController };
