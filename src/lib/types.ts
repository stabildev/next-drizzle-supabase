export type FormState<T> =
  | {
      data: T
    }
  | {
      error: string
    }
  | null
