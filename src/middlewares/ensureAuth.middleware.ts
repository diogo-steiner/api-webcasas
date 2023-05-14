import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { AppError } from "../errors";

export const ensureAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    throw new AppError("Missing headers authorization", 401);
  }

  const token = authToken.split(" ")[1];

  return jwt.verify(token, process.env.SECRET_KEY!, (error, decoded) => {
    if (error) {
      throw new AppError(error.message, 401);
    }
    req.user = {
      id: String(decoded!.sub),
    };

    return next();
  });
};
