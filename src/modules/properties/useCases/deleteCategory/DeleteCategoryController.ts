import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

class DeleteCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { categoryId } = request.params;
    const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);

    await deleteCategoryUseCase.execute(parseInt(categoryId));

    return response.send(200);
  }
}

export { DeleteCategoryController };
