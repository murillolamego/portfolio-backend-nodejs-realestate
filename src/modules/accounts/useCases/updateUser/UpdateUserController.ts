import { hash } from "bcrypt";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { userId } = request.params;
    const data: ICreateUserDTO = request.body;
    const updatedUserUseCase = container.resolve(UpdateUserUseCase);

    if (id !== userId) {
      return response.status(401).send();
    }

    if (data.password) {
      const saltRounds = 10;
      data.password = await hash(data.password, saltRounds);
    }

    await updatedUserUseCase.execute(userId, data);

    return response.status(204).send();
  }
}
export { UpdateUserController };
