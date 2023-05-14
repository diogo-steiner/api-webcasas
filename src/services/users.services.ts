import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import {
  ICreateUserRequest,
  ICreateUserResponse,
  IDeleteUserRequest,
  IUpdatePasswordUserRequest,
  IUpdateUserRequest,
} from "../interfaces/users.interfaces";
import { AppError } from "../errors";
import { UsersSchemas } from "../schemas/users.schemas";

const prisma = new PrismaClient();

export class UsersServices {
  static async create(
    dataUser: ICreateUserRequest
  ): Promise<ICreateUserResponse> {
    const existEmail = await prisma.users.count({
      where: { email: dataUser.email },
    });

    if (existEmail) {
      throw new AppError("Email already registered", 409);
    }

    delete dataUser.confirmPassword;

    const hashedPassword = await hash(dataUser.password, 10);
    dataUser.password = hashedPassword;

    const newUser = await prisma.users.create({
      data: dataUser,
    });

    return UsersSchemas.createUserResponse.parse(newUser);
  }

  static async deactivate(userId: string) {
    await prisma.users.update({
      where: { id: userId },
      data: { isActive: false },
    });

    await prisma.properties.updateMany({
      where: { owner: { id: userId } },
      data: { isActive: false },
    });

    return {};
  }

  static async activate(userId: string) {
    const user = await prisma.users.findFirst({ where: { id: userId } });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    await prisma.users.update({
      where: { id: userId },
      data: { isActive: true },
    });

    return {};
  }

  static async delete(userId: string, dataDelete: IDeleteUserRequest) {
    const user = await prisma.users.findFirst({ where: { id: userId } });

    const isMatchPassword = await compare(dataDelete.password, user?.password!);

    if (!isMatchPassword) {
      throw new AppError("Password invalid", 403);
    }

    await prisma.users.delete({ where: { id: userId } });

    return {};
  }

  static async update(userId: string, dataUpdated: IUpdateUserRequest) {
    if (dataUpdated.email) {
      const findUserByEmail = await prisma.users.findFirst({
        where: { email: dataUpdated.email },
      });

      if (findUserByEmail && findUserByEmail.id != userId) {
        throw new AppError("Email already registered", 409);
      }
    }

    const user = await prisma.users.update({
      where: { id: userId },
      data: {
        ...dataUpdated,
      },
    });

    return UsersSchemas.updateUserResponse.parse(user);
  }

  static async updateAvatar(
    userId: string,
    file: Express.Multer.File | undefined
  ) {
    if (!file) throw new AppError("File avatar is required", 400);

    const user = await prisma.users.update({
      where: { id: userId },
      data: { avatarUrl: file.path },
    });

    return UsersSchemas.updateUserResponse.parse(user);
  }

  static async updatePassword(
    userId: string,
    dataUpdated: IUpdatePasswordUserRequest
  ) {
    const user = await prisma.users.findFirst({ where: { id: userId } });

    const isMatchPassword = await compare(
      dataUpdated.currentPassword,
      user?.password!
    );

    if (!isMatchPassword) {
      throw new AppError("Password invalid", 403);
    }

    const hashedPassword = await hash(dataUpdated.newPassword, 10);

    await prisma.users.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return {};
  }
}
