import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("User not authenticated");
  }

  const [, token] = authHeader.split(" ");

  const secret = process.env.JWT_SECRET;

  try {
    const { sub: userId } = verify(token, secret) as IPayload;

    request.user = {
      id: userId,
    };

    return next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
