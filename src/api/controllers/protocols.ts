export interface IHttpReturn<T> {
    StatusCode: number
    message: string,
    body: T
}
  