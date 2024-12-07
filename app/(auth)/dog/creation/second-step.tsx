import { i18n } from "@/app/_layout";
import { useSession } from "@/app/ctx";
import Back from "@/components/back-button";
import BodyTitle from "@/components/bodyTitle/body-title";
import { StandardButton } from "@/components/ui/button";
import { BodyMedium } from "@/components/ui/text";
import { CustomTextInput } from "@/components/ui/text-input";
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { MMKV } from "react-native-mmkv";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const storage = new MMKV();

export default function FirstStep() {
  const insets = useSafeAreaInsets();
  const { session } = useSession();

  const userId = session?.user?.id;

  const [dogName, setDogName] = useState('');
  const [selectedSex, setSelectedSex] = useState<'Male' | 'Female'>('Male');

  function handleNextStep() {
    storage.set('dog', JSON.stringify({ id: userId, name: dogName, sex: selectedSex }))
    router.push('/dog/creation/second-step')
  };

  return (
    <SafeAreaView style={styles.container}>
      <Back left="16" />
      <View style={[styles.content, { marginTop: insets.top }]}>
        <View style={styles.titleContainer}>
          <BodyTitle title={i18n.t('whatIsYourDogName')} />
          <CustomTextInput
            placeholder={i18n.t('addDogName')}
            value={dogName}
            onChangeText={setDogName}
          />
        </View>
        <View style={styles.titleContainer}>
          <BodyTitle title={i18n.t('dogSexQuestion')} />
          <SegmentedControl
            values={[i18n.t('male'), i18n.t('female')]}
            selectedIndex={selectedSex === 'Male' ? 0 : 1}
            onChange={index => setSelectedSex(index === 0 ? 'Male' : 'Female')}
          />
        </View>
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
  titleContainer: {
    gap: 16
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
