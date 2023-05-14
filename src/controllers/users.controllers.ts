import { Request, Response } from "express";
import { UsersServices } from "../services/users.services";

export class UsersControllers {
  static async create(req: Request, res: Response) {
    const newUser = await UsersServices.create(req.body);
    return res.status(201).json(newUser);
  }

  static async deactivate(req: Request, res: Response) {
    await UsersServices.deactivate(req.user.id);
    return res.status(200).json({ message: "User account deativate sucess" });
  }

  static async activate(req: Request, res: Response) {
    await UsersServices.activate(req.params.userId);
    return res.status(200).json({ message: "user account activate sucess" });
  }

  static async delete(req: Request, res: Response) {
    await UsersServices.delete(req.user.id, req.body);
    return res.status(204).json({});
  }

  static async update(req: Request, res: Response) {
    const userUpdated = await UsersServices.update(req.user.id, req.body);
    return res.status(200).json(userUpdated);
  }

  static async updateAvatar(req: Request, res: Response) {
    const userUpdated = await UsersServices.updateAvatar(req.user.id, req.file);
    return res.status(200).json(userUpdated);
  }

  static async updatePassword(req: Request, res: Response) {
    await UsersServices.updatePassword(req.user.id, req.body);
    return res.status(204).json({});
  }
}
