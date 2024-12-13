import { i18n } from "@/app/_layout";
import Back from "@/components/back-button";
import BodyTitle from "@/components/bodyTitle/body-title";
import { StandardButton } from "@/components/ui/button";
import { BodyMedium } from "@/components/ui/text";
import { createDog } from '@/lib/api/dog';
import { AntDesign } from "@expo/vector-icons";
import { useQueryClient } from '@tanstack/react-query';
import * as Burnt from "burnt";
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MMKV } from "react-native-mmkv";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export const storage = new MMKV()

export default function ThirdStep() {
  const insets = useSafeAreaInsets();

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const queryClient = useQueryClient();

  async function handleNextStep() {
    try {
      const dogData = JSON.parse(storage.getString('dog') || '{}');

      console.log(dogData.ownerId);

      // Créer le chien
      const [newDog] = await createDog({
        name: dogData.name,
        description: 'description du chien',
        age: parseInt(dogData.age),
        sex: dogData.sex.toLowerCase(),
        breed_id: 10,
        owner_id: 1,
        dominance: 'dominant'
      });

      // Invalider le cache des chiens
      await queryClient.invalidateQueries({ queryKey: ['dogs'] });

      storage.set('onBoarding', 'true');
      router.replace('/(home)')
      Burnt.toast({
        title: "Chien créé avec succès",
        preset: "done",
        message: "Vous pouvez maintenant ajouter des comportements à votre chien.",
        haptic: "success",
      });
    } catch (error) {
      console.error('Error creating dog:', error);
      // Gérer l'erreur ici
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Back left="16" />
      <View style={[styles.content, { marginTop: insets.top }]}>
        <View style={styles.titleContainer}>
          <BodyTitle title={i18n.t('dogAddPhoto')} />
          <Pressable onPress={pickImage}>
            <View style={{
              width: 150,
              height: 150,
              backgroundColor: '#C5C3C3',
              borderRadius: 20,
              justifyContent: 'flex-end',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
              <Image source={{ uri: image }} style={styles.image} />
              <View style={{
                width: 50,
                height: 50,
                backgroundColor: '#F7A400',
                borderRadius: 999,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                bottom: -20,
              }}>
                <AntDesign name="plus" size={24} color="white" />
              </View>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={[styles.buttonContainer, { bottom: insets.bottom }]}>
        <StandardButton onPress={handleNextStep}>
          <BodyMedium color='#fff'>{i18n.t('ending')}</BodyMedium>
        </StandardButton>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16
  },
  titleContainer: {
    gap: 56
  },
  content: {
    gap: 20
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    gap: 20
  },
});
