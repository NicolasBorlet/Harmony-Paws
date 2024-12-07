import { i18n } from "@/app/_layout";
import { useSession } from "@/app/ctx";
import BodyTitle from "@/components/bodyTitle/body-title";
import Dropdown from "@/components/dropdown";
import { StandardButton } from "@/components/ui/button";
import { BodyMedium } from "@/components/ui/text";
import { CustomTextInput } from "@/components/ui/text-input";
import { dogRaces } from "@/lib/utils/dog-race";
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
  const [dogAge, setDogAge] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');

  function handleNextStep() {
    storage.set('dog', JSON.stringify({ id: userId, name: dogName, sex: selectedSex, age: dogAge, breed: selectedBreed }))
    router.push('/dog/creation/second-step')
  };

  const isFormValid = dogName && dogAge && selectedSex && selectedBreed;

  return (
    <SafeAreaView style={styles.container}>
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
        <View style={styles.titleContainer}>
          <BodyTitle title={i18n.t('dogAgeQuestion')} />
          <CustomTextInput
            placeholder={i18n.t('addDogAge')}
            value={dogAge}
            onChangeText={setDogAge}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.titleContainer}>
          <BodyTitle title={i18n.t('dogBreedQuestion')} />
          <Dropdown
            data={dogRaces}
            onChange={(item) => setSelectedBreed(item.value)}
            placeholder={i18n.t('addDogBreed')}
          />
        </View>
      </View>
      <View style={[styles.buttonContainer, { bottom: insets.bottom }]}>
        <StandardButton onPress={handleNextStep} disabled={!isFormValid}>
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
