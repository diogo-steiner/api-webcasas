import express from "express";
import { IPaginate, IUser } from "../../interfaces/express.interfaces";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
      paginate: IPaginate;
    }
  }
}
