import LoginHP from '@/assets/svg/login-hp'
import { Colors } from '@/constants/Colors'
import { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Svg } from 'react-native-svg'

export default function SplashScreen() {
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start()
  }, [])

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Svg width={207} height={70} viewBox='0 0 207 70'>
          <LoginHP />
        </Svg>
      </View>
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  progressContainer: {
    width: '80%',
    height: 4,
    backgroundColor: Colors.purple[400],
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.white,
  },
})
