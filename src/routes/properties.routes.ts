import { Router } from "express";
import { PropertiesControllers } from "../controllers/properties.controllers";
import { PropertiesSchemas } from "../schemas/properties.schemas";
import {
  ensureAuthMiddleware,
  ensureBodyMiddleware,
  paginateMiddleware,
} from "../middlewares";
import { uploadMulter } from "../multer";

export const propertiesRoutes = Router();

propertiesRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureBodyMiddleware(PropertiesSchemas.createPropertyRequest),
  PropertiesControllers.create
);

propertiesRoutes.post(
  "/photos/:propertyId",
  ensureAuthMiddleware,
  uploadMulter.array("photo", 4),
  PropertiesControllers.createPhotos
);

propertiesRoutes.get("", paginateMiddleware, PropertiesControllers.getAll);

propertiesRoutes.get(
  "/filter",
  paginateMiddleware,
  PropertiesControllers.getAllByFilters
);

propertiesRoutes.get(
  "/inHigh",
  paginateMiddleware,
  PropertiesControllers.getAllInHigh
);

propertiesRoutes.get(
  "/user",
  ensureAuthMiddleware,
  paginateMiddleware,
  PropertiesControllers.getAllPropertiesUser
);

propertiesRoutes.get("/:propertyId", PropertiesControllers.getById);

propertiesRoutes.patch(
  "/deactivate/:propertyId",
  ensureAuthMiddleware,
  PropertiesControllers.deactivate
);

propertiesRoutes.patch(
  "/activate/:propertyId",
  ensureAuthMiddleware,
  PropertiesControllers.activate
);

propertiesRoutes.patch(
  "/activate/:propertyId",
  ensureAuthMiddleware,
  PropertiesControllers.activate
);

propertiesRoutes.delete(
  "/:propertyId",
  ensureAuthMiddleware,
  PropertiesControllers.delete
);
