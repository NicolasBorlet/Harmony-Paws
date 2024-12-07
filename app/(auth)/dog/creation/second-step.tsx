import { i18n } from "@/app/_layout";
import { StandardButton } from "@/components/ui/button";
import { Body, BodyMedium } from "@/components/ui/text";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { MMKV } from "react-native-mmkv";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const storage = new MMKV();

export default function FirstStep() {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 }}>
      <Body>First Step</Body>
      <View style={[styles.buttonContainer, { bottom: insets.bottom }]}>
        <StandardButton onPress={() => { }}>
          <BodyMedium color='#fff'>{i18n.t('continue')}</BodyMedium>
        </StandardButton>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    gap: 20
  },
});
