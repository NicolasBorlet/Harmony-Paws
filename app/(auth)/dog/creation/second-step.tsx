import { i18n } from "@/app/_layout";
import { useSession } from "@/app/ctx";
import Back from "@/components/back-button";
import BodyTitle from "@/components/bodyTitle/body-title";
import Block from "@/components/grid/Block";
import { StandardButton } from "@/components/ui/button";
import { BodyBold, BodyMedium } from "@/components/ui/text";
import { GridItemBackground } from "@/components/ui/view";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { MMKV } from "react-native-mmkv";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const storage = new MMKV();

export default function FirstStep() {
  const insets = useSafeAreaInsets();
  const { session } = useSession();

  const userId = session?.user?.id;

  function handleNextStep() {
    router.push('/dog/creation/third-step')
  };

  return (
    <SafeAreaView style={styles.container}>
      <Back left="16" />
      <View style={[styles.content, { marginTop: insets.top }]}>
        <View style={styles.titleContainer}>
          <BodyTitle title={i18n.t('dogBehaviorQuestion')} />
          {/* <ScrollView style={{ flex: 1 }}> */}
          <Block
            row
            wrap='nowrap'
            style={{
              gap: 8,
            }}
          >
            <GridItemBackground selected>
              <BodyBold color='#663399'>{i18n.t('calm')}</BodyBold>
            </GridItemBackground>
            <GridItemBackground>
              <BodyBold color='#663399'>{i18n.t('aggressive')}</BodyBold>
            </GridItemBackground>
            <GridItemBackground>
              <BodyBold color='#663399'>{i18n.t('active')}</BodyBold>
            </GridItemBackground>
          </Block>
          {/* </ScrollView> */}
        </View>
      </View>
      <View style={[styles.buttonContainer, { bottom: insets.bottom }]}>
        <StandardButton onPress={handleNextStep}>
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
