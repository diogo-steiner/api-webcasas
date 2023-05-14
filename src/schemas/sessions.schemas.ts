import { string, z } from "zod";
import { UsersSchemas } from "./users.schemas";

export class SessionsSchemas {
  static createSessionRequest = z.object({
    email: string().email(),
    password: string(),
  });

  static createSessionResponse = z.object({
    token: string(),
    user: UsersSchemas.createUserResponse,
  });

  static getUserSessionResponse = UsersSchemas.createUserResponse;
}
