import { boolean, date, string, z } from "zod";

export class UsersSchemas {
  static createUserRequest = z
    .object({
      firstName: string().min(2).max(16).trim(),
      lastName: string().min(2).max(16).trim(),
      email: string().email().min(6).max(48).trim().toLowerCase(),
      password: string().min(6).max(48).trim(),
      confirmPassword: string().min(6).max(48).trim(),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (password != confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Passwords must be the same",
          path: ["confirmPassword"],
        });
      }
    });

  static createUserResponse = z.object({
    id: string(),
    firstName: string(),
    lastName: string(),
    email: string(),
    avatarUrl: string().nullable(),
    isActive: boolean(),
    updatedAt: date(),
    createdAt: date(),
  });

  static deleteUserRequest = z.object({
    password: string().trim(),
  });

  static updateUserRequest = z.object({
    firstName: string().min(2).max(16).trim().optional(),
    lastName: string().min(2).max(16).trim().optional(),
    email: string().min(6).max(48).trim().optional(),
  });

  static updateUserResponse = this.createUserResponse;

  static updatePasswordUserRequest = z
    .object({
      currentPassword: string(),
      newPassword: string().min(6).max(48).trim(),
      confirmNewPassword: string().min(6).max(48).trim(),
    })
    .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
      if (newPassword != confirmNewPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Passwords must be the same",
          path: ["confirmNewPassword"],
        });
      }
    });
}
