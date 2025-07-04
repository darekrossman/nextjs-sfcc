import { z } from 'zod'

export type SortFilterItem = {
  title: string
  slug: string | null
  sortKey:
    | 'best-matches'
    | 'price-low-to-high'
    | 'price-high-to-low'
    | 'product-name-ascending'
    | 'product-name-descending'
  reverse: boolean
}

export const defaultSort: SortFilterItem = {
  title: 'Best Matches',
  slug: 'best-matches',
  sortKey: 'best-matches',
  reverse: false,
}

// Type for the state returned from our form actions. Provides
// additional type safety for error fields.
export type FormActionState<T extends z.ZodTypeAny = z.ZodTypeAny> =
  | {
      errors: {
        formErrors?: string[]
        fieldErrors?: z.inferFlattenedErrors<T>['fieldErrors']
      }
    }
  | undefined

export enum CheckoutStep {
  Information = 1,
  Shipping,
  Payment,
  Confirmation,
}

export const checkoutStepRoutes: Record<CheckoutStep, string> = {
  [CheckoutStep.Information]: '/checkout/information',
  [CheckoutStep.Shipping]: '/checkout/shipping',
  [CheckoutStep.Payment]: '/checkout/payment',
  [CheckoutStep.Confirmation]: '/checkout/confirmation',
}

export type CountryCode = 'US' | 'CA' | 'UK'

export type PostalCodeConfig = {
  label: string
  placeholder: string
  format: (value: string) => string
}
