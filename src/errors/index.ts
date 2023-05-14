import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";
import { ZodError } from "zod";

export class AppError extends Error {
  statusCode: number = 400;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export const handleAppError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(400).json(error.formErrors.fieldErrors);
  }

  if (error instanceof MulterError) {
    return res.status(400).json({ message: error.message });
  }

  console.error(error);
  return res.status(500).json({ message: "Internal server error" });
};
