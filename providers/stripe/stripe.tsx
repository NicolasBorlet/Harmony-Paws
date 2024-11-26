import * as Stripe from "@stripe/stripe-react-native";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

export const StripeProvider: React.FC<{
  publishableKey: string;
  children: JSX.Element | JSX.Element[];
}> = ({ publishableKey, children }) => {
  return (
    <Stripe.StripeProvider
      publishableKey={publishableKey}
    >
      {children}
    </Stripe.StripeProvider>
  );
};

export { initPaymentSheet, presentPaymentSheet };