import React from "react";
import { StripeProvider as CustomStripeProvider } from "./stripe";

type StripeProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const StripeProvider: React.FC<StripeProviderProps> = ({
  children,
}: StripeProviderProps): JSX.Element => {
  const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error(
      "publishableKey is not set. Ensure that EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY is set in your environment variables."
    );
  }

  return (
    <CustomStripeProvider
      publishableKey={publishableKey}
    >
      {children}
    </CustomStripeProvider>
  );
};

export default StripeProvider;