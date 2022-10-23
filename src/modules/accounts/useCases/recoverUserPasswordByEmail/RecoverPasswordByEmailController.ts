import { Request, Response } from "express";
import { container } from "tsyringe";

import { RecoverPasswordByEmailUseCase } from "./RecoverPasswordByEmailUseCase";

class RecoverPasswordByEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const recoverPasswordByEmailUseCase = container.resolve(
      RecoverPasswordByEmailUseCase
    );

    await recoverPasswordByEmailUseCase.execute(email);

    return response.send();
  }
}

export { RecoverPasswordByEmailController };
