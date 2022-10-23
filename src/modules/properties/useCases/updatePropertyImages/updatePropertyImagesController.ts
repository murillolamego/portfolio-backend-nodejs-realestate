import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdatePropertyImageUseCase } from "./updatePropertyImagesUseCase";

interface IFiles {
  filename: string;
}

class UpdatePropertyImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    console.log(request.files);
    const { propertyId } = request.params;
    const images = request.files as IFiles[];

    console.log(images);

    const updatePropertyImageUseCase = container.resolve(
      UpdatePropertyImageUseCase
    );

    const imageNames = images.map((image) => image.filename);

    await updatePropertyImageUseCase.execute({
      propertyId: parseInt(propertyId),
      imageNames,
    });

    return response.sendStatus(201);
  }
}
export { UpdatePropertyImagesController };
