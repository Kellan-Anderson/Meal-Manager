export type APIError = {
  message: string,
  debugMessage?: string
}

export type APISuccess<T> = {
  data: T,
  error: null,
}

export type APIFailure = {
  data: null,
  error: APIError
}

export type APIResult<T> = APISuccess<T> | APIFailure