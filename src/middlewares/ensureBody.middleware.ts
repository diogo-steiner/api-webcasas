import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const ensureBodyMiddleware =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const bodyValidated = schema.parse(req.body);
    req.body = bodyValidated;

    return next();
  };
