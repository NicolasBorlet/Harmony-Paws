import { ImageSourcePropType } from 'react-native'

export type StripePaymentIntentRequestBody = {
  amount: number
  currency: string
}

export type StripePaymentIntentResponse = {
  clientSecret: string | null
  customer: string | null
}

export type PaymentSheetConfig = {
  merchantDisplayName: string
  customerId: string
  paymentIntentClientSecret: string
  allowsDelayedPaymentMethods: boolean
  defaultBillingDetails: {
    name: string
  }
}

export type OnboardingItem = {
  id: number
  title: string
  image: ImageSourcePropType
}
