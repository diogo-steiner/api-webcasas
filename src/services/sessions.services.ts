import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import * as jwt from "jsonwebtoken";
import {
  ICreateSessionRequest,
  ICreateSessionResponse,
  ICreateSessionUserDesabled,
} from "../interfaces/sessions.interface";
import { AppError } from "../errors";
import { SessionsSchemas } from "../schemas/sessions.schemas";

const prisma = new PrismaClient();

export class SessionsServices {
  static async create(
    dataSession: ICreateSessionRequest
  ): Promise<[number, ICreateSessionResponse | ICreateSessionUserDesabled]> {
    const user = await prisma.users.findFirst({
      where: { email: dataSession.email },
    });

    if (!user) {
      throw new AppError("Email or password invalid", 401);
    }

    const isMatchPassword = await compare(dataSession.password, user.password);

    if (!isMatchPassword) {
      throw new AppError("Email or password invalid", 401);
    }

    if (!user.isActive) {
      const session = {
        message: "User account desabled",
        user: {
          id: user.id,
          isActive: false,
        },
      };

      return [403, session];
    }

    const token = jwt.sign({}, process.env.SECRET_KEY!, {
      expiresIn: "24h",
      subject: user.id,
    });

    const session = {
      token,
      user,
    };

    return [200, SessionsSchemas.createSessionResponse.parse(session)];
  }

  static async getUserSession(userId: string) {
    const user = await prisma.users.findUnique({ where: { id: userId } });
    return SessionsSchemas.getUserSessionResponse.parse(user);
  }
}
