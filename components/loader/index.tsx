import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

export default function LoaderComponent({ size = 250 }: { size?: number }) {
  const animation = useRef<LottieView>(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        loop
        ref={animation}
        style={{
          width: size,
          height: size,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../assets/animations/loader.json')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
