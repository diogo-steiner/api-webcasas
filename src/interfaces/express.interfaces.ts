export interface IUser {
  id: string;
}

export interface IPaginate {
  skip: number | undefined;
  take: number | undefined;
  baseUrl: string;
  page: number;
  limit: number;
}
