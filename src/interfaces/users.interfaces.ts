export interface ICreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface ICreateUserResponse {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export interface IDeleteUserRequest {
  password: string;
}

export interface IUpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface IUpdatePasswordUserRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
