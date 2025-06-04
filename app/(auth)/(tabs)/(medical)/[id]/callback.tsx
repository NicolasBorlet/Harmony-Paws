import Back from '@/components/back-button'
import Block from '@/components/grid/Block'
import { FullRoundedButton } from '@/components/ui/button'
import Divider from '@/components/ui/divider'
import { BodyBold, SpecialTitle } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { Entypo } from '@expo/vector-icons'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Callback() {
  const insets = useSafeAreaInsets()

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
    >
      <Back position='relative' top={insets.top} left='0' />
      <View style={styles.header}>
        <BodyBold style={{ textAlign: 'center' }}>Mes rappels</BodyBold>
        <Divider spacing={32} />
      </View>
      <Block row justify='space-between' alignItems='center'>
        <Block row wrap='nowrap' style={{ gap: 8 }} alignItems='center'>
          <SpecialTitle>Mars 2025</SpecialTitle>
          <Entypo name='chevron-down' size={24} color={Colors.purple[500]} />
        </Block>
        <FullRoundedButton style={{ width: 40, height: 40 }}>
          <Entypo name='plus' size={24} color={Colors.white} />
        </FullRoundedButton>
      </Block>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingTop: 16,
  },
})
