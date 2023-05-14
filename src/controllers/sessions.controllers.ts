import { Request, Response } from "express";
import { SessionsServices } from "../services/sessions.services";

export class SessionsControllers {
  static async create(req: Request, res: Response) {
    const [status, session] = await SessionsServices.create(req.body);

    return res.status(status).json(session);
  }

  static async getUserSession(req: Request, res: Response) {
    const userSession = await SessionsServices.getUserSession(req.user.id);

    return res.status(200).json(userSession);
  }
}
