import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


type Failure<E = Error> = {
  error: E,
  data: null
}
type Success<T = unknown> = { data: T, error: null }
type Result<T, E = Error> = Success<T> | Failure<E>

export async function tryCatch<T>(func: () => Promise<T>): Promise<Result<T>> {
  try {
    const data = await func();
    return {
      data,
      error: null
    }
  } catch (error) {
    return {
      error: error as Error,
      data: null
    }
  }
}
