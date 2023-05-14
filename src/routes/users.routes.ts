import { Router } from "express";
import { ensureAuthMiddleware, ensureBodyMiddleware } from "../middlewares";
import { UsersSchemas } from "../schemas/users.schemas";
import { UsersControllers } from "../controllers/users.controllers";
import { uploadMulter } from "../multer";

export const usersRoutes = Router();

usersRoutes.post(
  "",
  ensureBodyMiddleware(UsersSchemas.createUserRequest),
  UsersControllers.create
);

usersRoutes.delete(
  "",
  ensureAuthMiddleware,
  ensureBodyMiddleware(UsersSchemas.deleteUserRequest),
  UsersControllers.delete
);

usersRoutes.patch(
  "",
  ensureAuthMiddleware,
  ensureBodyMiddleware(UsersSchemas.updateUserRequest),
  UsersControllers.update
);

usersRoutes.patch(
  "/avatar",
  ensureAuthMiddleware,
  uploadMulter.single("avatar"),
  UsersControllers.updateAvatar
);

usersRoutes.patch(
  "/password",
  ensureAuthMiddleware,
  ensureBodyMiddleware(UsersSchemas.updatePasswordUserRequest),
  UsersControllers.updatePassword
);

usersRoutes.patch(
  "/deactivate",
  ensureAuthMiddleware,
  UsersControllers.deactivate
);

usersRoutes.patch("/activate/:userId", UsersControllers.activate);
