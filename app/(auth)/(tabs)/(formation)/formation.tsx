import { i18n } from '@/app/_layout'
import BodyTitle from '@/components/bodyTitle/body-title'
import FormationHeader from '@/components/formation/formation-header'
import FormationListing from '@/components/formationListing/formation-listing'
import Divider from '@/components/ui/divider'
import { useStripe } from '@stripe/stripe-react-native'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface FunctionResponse {
  paymentIntent: string
  ephemeralKey: string
  customer: string
  stripe_pk: string
}

interface Product {
  id: string
  name: string
  description: string
  priceId: string
  price: number
  currency: string
  metadata?: {
    videoUrl?: string
  }
}

export default function Formation() {
  const insets = useSafeAreaInsets()

  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [clientSecret, setClientSecret] = useState<string>()
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const scrollY = useSharedValue(0);

  // useEffect(() => {
  //   async function initialize() {
  //     const { data: { user } } = await supabase.auth.getUser();
  //     if (user) {
  //       setUserId(user.id);
  //     }
  //     await fetchProducts();
  //   }
  //   initialize();
  // }, []);

  // useEffect(() => {
  //   if (selectedProduct) {
  //     initialisePaymentSheet();
  //   }
  // }, [selectedProduct]);

  // const fetchProducts = async () => {
  //   try {
  //     const { data, error } = await supabase.functions.invoke<Product[]>(
  //       "get-products"
  //     );

  //     if (error) {
  //       console.error("Error fetching products:", error);
  //       Alert.alert("Error", "Failed to load products");
  //       return;
  //     }

  //     if (data) {
  //       setProducts(data);
  //       setLoading(false);
  //     }
  //   } catch (e) {
  //     console.error("Error fetching products:", e);
  //     Alert.alert("Error", "Failed to load products");
  //     setLoading(false);
  //   }
  // };

  // const fetchPaymentSheetParams = async () => {
  //   if (!selectedProduct) {
  //     Alert.alert("Error", "Please select a product first");
  //     return {};
  //   }

  //   try {
  //     // Create payment session for our customer
  //     const { data, error } = await supabase.functions.invoke<FunctionResponse>(
  //       "payment-sheet",
  //       {
  //         body: JSON.stringify({
  //           priceId: selectedProduct.priceId
  //         })
  //       }
  //     );
  //     console.log("Function response:", data, error);

  //     if (error) {
  //         const errorMessage = await error.context.json()
  //         console.log('Function returned an error', errorMessage)

  //       console.error("Function error:", error);
  //       Alert.alert(`Error: ${error.message}`);
  //       return {};
  //     }

  //     if (!data) {
  //       console.error("No data received");
  //       Alert.alert("Error: No data received from the server");
  //       return {};
  //     }

  //     const { paymentIntent, ephemeralKey, customer, stripe_pk } = data;
  //     setClientSecret(paymentIntent);
  //     return {
  //       paymentIntent,
  //       ephemeralKey,
  //       customer,
  //       stripe_pk,
  //     };
  //   } catch (e) {
  //     console.error("Error in fetchPaymentSheetParams:", e);
  //     Alert.alert(`Error: ${e.message}`);
  //     return {};
  //   }
  // };

  // const openPaymentSheet = async () => {
  //   if (!clientSecret) {
  //     return;
  //   }
  //   setLoading(true);
  //   const { error } = await presentPaymentSheet();

  //   if (!error) {
  //     Alert.alert("Success", "The payment was confirmed successfully");
  //   } else if (error.code === PaymentSheetError.Failed) {
  //     Alert.alert(
  //       `PaymentSheet present failed with error code: ${error.code}`,
  //       error.message
  //     );
  //   } else if (error.code === PaymentSheetError.Canceled) {
  //     Alert.alert(
  //       `PaymentSheet present was canceled with code: ${error.code}`,
  //       error.message
  //     );
  //   }
  //   setPaymentSheetEnabled(false);
  //   setLoading(false);
  // };

  // const initialisePaymentSheet = async () => {
  //   setLoading(true);
  //   const { paymentIntent, ephemeralKey, customer, stripe_pk } =
  //     await fetchPaymentSheetParams();

  //   if (!stripe_pk || !paymentIntent) return setLoading(false);

  //   await initStripe({
  //     publishableKey: stripe_pk,
  //     merchantIdentifier: "merchant.com.stripe.react.native",
  //     urlScheme: "supabase-stripe-example",
  //     setReturnUrlSchemeOnAndroid: true,
  //   });

  //   const billingDetails = {
  //     name: "Jane Doe",
  //     email: "foo@bar.com",
  //     phone: "555-555-555",
  //     address: {
  //       city: "San Francisco",
  //       country: "US",
  //       line1: "123 Market St",
  //       line2: "",
  //       state: "CA",
  //       postal_code: "94015",
  //     }
  //   };

  //   const { error } = await initPaymentSheet({
  //     customerId: customer,
  //     customerEphemeralKeySecret: ephemeralKey,
  //     paymentIntentClientSecret: paymentIntent,
  //     customFlow: false,
  //     merchantDisplayName: "Example Inc.",
  //     style: "automatic",
  //     returnURL: "stripe-example://stripe-redirect",
  //     defaultBillingDetails: billingDetails,
  //     allowsDelayedPaymentMethods: true,
  //   });
  //   if (!error) {
  //     setPaymentSheetEnabled(true);
  //   } else if (error.code === PaymentSheetError.Failed) {
  //     Alert.alert(
  //       `PaymentSheet init failed with error code: ${error.code}`,
  //       error.message
  //     );
  //   } else if (error.code === PaymentSheetError.Canceled) {
  //     Alert.alert(
  //       `PaymentSheet init was canceled with code: ${error.code}`,
  //       error.message
  //     );
  //   }
  //   setLoading(false);
  // };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y; // Met à jour la valeur partagée
    },
  });

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <FormationHeader scrollY={scrollY} />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 16 }}>
          <Divider />
          <View style={{ gap: 16 }}>
            <BodyTitle title={i18n.t('yourFormations')} />
            <FormationListing />
          </View>
          <Divider />
          <View style={{ gap: 16 }}>
            <BodyTitle title={i18n.t('ourFormations')} />
            <FormationListing />
          </View>
          <Divider />
          <View style={{ gap: 16 }}>
            <BodyTitle title={i18n.t('allFormations')} />
            <FormationListing />
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  productList: {
    flex: 1,
    marginBottom: 20,
  },
  productItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedProduct: {
    backgroundColor: '#e0e0e0',
    borderColor: '#007AFF',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
  },
})
