import { i18n } from "@/app/_layout";
import { useSession } from "@/app/ctx";
import BodyTitle from "@/components/bodyTitle/body-title";
import { StandardButton } from "@/components/ui/button";
import { BodyMedium } from "@/components/ui/text";
import { CustomTextInput } from "@/components/ui/text-input";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { MMKV } from "react-native-mmkv";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const storage = new MMKV();

export default function FirstStep() {
  const insets = useSafeAreaInsets();
  const { session } = useSession();

  const userId = session?.user?.id;

  const [dogName, setDogName] = useState('');

  function handleNextStep() {
    storage.set('dog', JSON.stringify({ id: userId, name: dogName }))
    router.push('/dog/creation/second-step')
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, { marginTop: insets.top }]}>
        <BodyTitle title={i18n.t('whatIsYourDogName')} />
        <CustomTextInput
          placeholder={i18n.t('addDogName')}
          value={dogName}
          onChangeText={setDogName}
        />
      </View>
      <View style={[styles.buttonContainer, { bottom: insets.bottom }]}>
        <StandardButton onPress={handleNextStep} disabled={!dogName}>
          <BodyMedium color='#fff'>{i18n.t('continue')}</BodyMedium>
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
  content: {
    paddingHorizontal: 20,
    gap: 20
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    gap: 20
  },
});

