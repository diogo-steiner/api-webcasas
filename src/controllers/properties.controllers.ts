import { Request, Response } from "express";
import { PropertiesServices } from "../services/properties.services";

export class PropertiesControllers {
  static async create(req: Request, res: Response) {
    const newProperty = await PropertiesServices.create(req.user.id, req.body);
    return res.status(201).json(newProperty);
  }

  static async createPhotos(req: Request, res: Response) {
    const count = await PropertiesServices.createPhotos(
      req.params.propertyId,
      req.files
    );
    return res.status(201).json(count);
  }

  static async getById(req: Request, res: Response) {
    const property = await PropertiesServices.getById(req.params.propertyId);
    return res.status(200).json(property);
  }

  static async getAllInHigh(req: Request, res: Response) {
    const properties = await PropertiesServices.getAllInHigh(req.paginate);
    return res.status(200).json(properties);
  }

  static async getAllPropertiesUser(req: Request, res: Response) {
    const properties = await PropertiesServices.getAllPropertiesUser(
      req.user.id,
      req.paginate
    );
    return res.status(200).json(properties);
  }

  static async deactivate(req: Request, res: Response) {
    await PropertiesServices.deactivate(req.params.propertyId, req.user.id);
    return res.status(204).send({});
  }

  static async activate(req: Request, res: Response) {
    await PropertiesServices.activate(req.params.propertyId, req.user.id);
    return res.status(204).send({});
  }

  static async delete(req: Request, res: Response) {
    await PropertiesServices.delete(req.params.propertyId, req.user.id);
    return res.status(204).send({});
  }

  static async getAllByFilters(req: Request, res: Response) {
    const properties = await PropertiesServices.getAllByFilters(
      req.query,
      req.paginate
    );
    return res.status(200).json(properties);
  }

  static async getAll(req: Request, res: Response) {
    const properties = await PropertiesServices.getAll(req.paginate);
    return res.status(200).json(properties);
  }
}
