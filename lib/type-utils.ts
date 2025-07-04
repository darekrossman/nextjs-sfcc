type NoIndex<T> = {
  [K in keyof T as NonNullable<unknown> extends Record<K, 1> ? never : K]: T[K]
}
type OnlyIndex<T> = {
  [K in keyof T as NonNullable<unknown> extends Record<K, 1> ? K : never]: T[K]
}

export type OmitFromKnownKeys<T, K extends keyof NoIndex<T>> = Omit<NoIndex<T>, K> &
  OnlyIndex<T>
