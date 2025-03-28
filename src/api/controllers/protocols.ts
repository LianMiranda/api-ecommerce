export interface IHttpReturn<T> {
  status?: boolean;
  StatusCode: number;
  message: string;
  body?: T;
  access_token?: string
}
