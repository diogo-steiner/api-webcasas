import { Router } from "express";
import { ensureAuthMiddleware, ensureBodyMiddleware } from "../middlewares";
import { SessionsControllers } from "../controllers/sessions.controllers";
import { SessionsSchemas } from "../schemas/sessions.schemas";

export const sessionsRoutes = Router();
sessionsRoutes.post(
  "",
  ensureBodyMiddleware(SessionsSchemas.createSessionRequest),
  SessionsControllers.create
);

sessionsRoutes.get(
  "",
  ensureAuthMiddleware,
  SessionsControllers.getUserSession
);
