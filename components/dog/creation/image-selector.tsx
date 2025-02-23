import { Purple } from '@/constants/Colors'
import { storage } from '@/lib/utils/storage'
import { AntDesign } from '@expo/vector-icons'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Pressable, View } from 'react-native'

export default function ImageSelector() {
  const [image, setImage] = useState<string | null>(null)

  const handleImageSelection = async () => {
    // Demander la permission d'accéder à la galerie
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permission.status !== 'granted') {
      return
    }

    // Ouvrir le sélecteur d'image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    })

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri
      setImage(selectedImage)

      // Sauvegarder l'URI de l'image dans le storage MMKV
      const existingData = storage.getString('dog')
      const dogData = existingData ? JSON.parse(existingData) : {}

      storage.set(
        'dog',
        JSON.stringify({
          ...dogData,
          image: selectedImage,
        }),
      )
    }
  }

  return (
    <View
      style={{
        marginTop: -80,
        alignItems: 'center',
      }}
    >
      <Pressable
        style={{ alignItems: 'center' }}
        onPress={handleImageSelection}
      >
        <View
          style={{
            backgroundColor: '#FFFFFF',
            width: 120,
            height: 120,
            borderRadius: 20,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.15,
            shadowRadius: 6.3,
            elevation: 10,
          }}
        >
          <Image
            source={{ uri: image }}
            contentFit='cover'
            style={{ flex: 1, borderRadius: 20 }}
          />
        </View>
        <View
          style={{
            backgroundColor: Purple,
            width: 37,
            height: 37,
            borderRadius: 25,
            marginTop: -18,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AntDesign name='plus' size={16} color='#FFFFFF' />
        </View>
      </Pressable>
    </View>
  )
}
