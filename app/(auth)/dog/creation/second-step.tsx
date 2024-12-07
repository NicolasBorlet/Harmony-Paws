import { i18n } from "@/app/_layout";
import { useSession } from "@/app/ctx";
import Back from "@/components/back-button";
import BodyTitle from "@/components/bodyTitle/body-title";
import Block from "@/components/grid/Block";
import { StandardButton } from "@/components/ui/button";
import { BodyBold, BodyMedium } from "@/components/ui/text";
import { GridItemBackground } from "@/components/ui/view";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { MMKV } from "react-native-mmkv";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const storage = new MMKV();

const behaviors = [{
  id: 1,
  label: i18n.t('calm')
}, {
  id: 2,
  label: i18n.t('aggressive')
}, {
  id: 3,
  label: i18n.t('active')
}];

export default function FirstStep() {
  const insets = useSafeAreaInsets();
  const { session } = useSession();

  const userId = session?.user?.id;

  const [selectedBehavior, setSelectedBehavior] = useState<number[]>([]);

  function handleNextStep() {
    storage.set('dog', JSON.stringify({ ...JSON.parse(storage.getString('dog') || '{}'), behaviors: selectedBehavior }))
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
            {behaviors.map((behavior) => (
              <Pressable onPress={() => {
                if (selectedBehavior.includes(behavior.id)) {
                  setSelectedBehavior(selectedBehavior.filter(id => id !== behavior.id));
                } else {
                  setSelectedBehavior([...selectedBehavior, behavior.id]);
                }
              }} style={{ flex: 1, height: 100 }} key={behavior.id}>
                <GridItemBackground selected={selectedBehavior.includes(behavior.id)}>
                  <BodyBold color='#663399'>{behavior.label}</BodyBold>
                </GridItemBackground>
              </Pressable>
            ))}
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
