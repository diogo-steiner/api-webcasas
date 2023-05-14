import "express-async-errors";
import "dotenv/config";
import Express from "express";
import cors from "cors";
import { handleAppError } from "./errors";
import { propertiesRoutes, sessionsRoutes, usersRoutes } from "./routes";

export const app = Express();

app.use(Express.json());
app.use(cors());
app.use("/users", usersRoutes);
app.use("/sessions", sessionsRoutes);
app.use("/properties", propertiesRoutes);
app.use(handleAppError);
