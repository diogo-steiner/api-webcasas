export interface ICreateSessionRequest {
  email: string;
  password: string;
}

export interface ICreateSessionResponse {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string | null;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
  };
}

export interface ICreateSessionUserDesabled {
  user: {
    id: string;
    isActive: boolean;
  };
  message: string;
}
