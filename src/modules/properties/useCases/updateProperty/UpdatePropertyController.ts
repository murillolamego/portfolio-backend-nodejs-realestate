import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreatePropertyDTO } from "modules/properties/dtos/ICreatePropertyDTO";

import { UpdatePropertyUseCase } from "./UpdatePropertyUseCase";

class UpdatePropertyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { propertyId } = request.params;
    const data: ICreatePropertyDTO = request.body;
    const UpdatedPropertyUseCase = container.resolve(UpdatePropertyUseCase);

    const property = await UpdatedPropertyUseCase.execute(
      parseInt(propertyId),
      data
    );

    return response.status(200).json(property);
  }
}
export { UpdatePropertyController };
