import { logDev } from '../api/utils'
import { session$ } from '../observables/session-observable'

export const getImageUrl = async (dogId: string) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/get-dog-image`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session$.get().access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dogId }),
      },
    )

    const { url, error } = await response.json()
    if (error) throw new Error(error)

    return url
  } catch (error) {
    logDev('Error in getImageUrl:', error)
    return ''
  }
}

export const getRideImageUrl = async (rideId: string) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/get-ride-image`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session$.get().access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rideId }),
      },
    )

    const { url, error } = await response.json()
    if (error) throw new Error(error)

    return url
  } catch (error) {
    logDev('Error in getRideImageUrl:', error)
    return ''
  }
}

export const getFormationImageUrl = async (formationId: string) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/get-formation-image`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session$.get().access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formationId }),
    },
  )

  const { url, error } = await response.json()
  if (error) throw new Error(error)

  return url
}

export const getModuleImageUrl = async (
  formationId: string,
  moduleId: string,
) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/get-module-image`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session$.get().access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formationId, moduleId }),
    },
  )

  const { url, error } = await response.json()
  if (error) throw new Error(error)

  return url
}

export const getUserPictureUrl = async (userId: string) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/get-user-picture`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session$.get().access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    },
  )

  const { url, error } = await response.json()
  if (error) throw new Error(error)

  return url
}
