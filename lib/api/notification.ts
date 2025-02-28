import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import { logDev } from './utils'

class NotificationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotificationError'
  }
}

function handleRegistrationError(errorMessage: string) {
  logDev('Notification registration error:', errorMessage)
  throw new NotificationError(errorMessage)
}

export async function registerForPushNotificationsAsync() {
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }

    if (!Device.isDevice) {
      handleRegistrationError('Must use physical device for push notifications')
      return
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError(
        'Permission not granted to get push token for push notification!',
      )
      return
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId
    if (!projectId) {
      handleRegistrationError('Project ID not found')
      return
    }
    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId,
      })

      logDev('Push token:', token.data)
      return token.data
    } catch (e: unknown) {
      handleRegistrationError(`${e}`)
    }
  } catch (error) {
    logDev('Error in registerForPushNotificationsAsync:', error)
    throw error
  }
}
