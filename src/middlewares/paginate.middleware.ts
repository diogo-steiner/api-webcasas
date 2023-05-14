import { NextFunction, Request, Response } from "express";

export const paginateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = +req.query.page!;
  const limit = +req.query.limit!;

  let skip = undefined;
  let take = undefined;

  if (page && limit) {
    skip = (page - 1) * limit;
    take = limit ? limit + 1 : 11;
  }

  const protocol = req.protocol;
  const host = req.get("host");
  const baseUrl = `${protocol}://${host}/properties?`;

  req.paginate = {
    skip,
    take,
    baseUrl,
    page,
    limit,
  };

  return next();
};
