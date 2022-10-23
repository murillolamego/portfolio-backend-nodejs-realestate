import { Request, Response } from "express";
import { container } from "tsyringe";

import { ReauthenticateUserUseCase } from "./ReauthenticateUserUseCase";

class ReauthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers["x-access-token"] ||
      request.query.token;

    if (!token) {
      return response.json("Token is required");
    }

    const reauthenticateUserUseCase = container.resolve(
      ReauthenticateUserUseCase
    );

    const refreshToken = await reauthenticateUserUseCase.execute(token);

    return response.json(refreshToken);
  }
}

export { ReauthenticateUserController };
