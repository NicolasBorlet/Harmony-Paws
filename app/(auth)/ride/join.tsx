import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import DogItem from '@/components/invitation/dogItem'
import { StandardButton, UnderlinedButton } from '@/components/ui/button'
import {
  BodyMedium,
  NavigationTitle,
  SmallMedium,
  SpecialTitle,
} from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { TextInput, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const dogs = [
  { name: 'Taico', image: 'https://picsum.photos/300' },
  { name: 'Rex', image: 'https://picsum.photos/300' },
]

export default function DogInvitation() {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        paddingTop: 32,
        flex: 1,
        paddingBottom: insets.bottom,
        gap: 48,
      }}
    >
      <View style={{ gap: 24, display: 'flex', flexDirection: 'column' }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
          }}
        >
          <Back position='relative' left='0' />
          <NavigationTitle color='#000'>
            {i18n.t('joinTheRide')}
          </NavigationTitle>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 24,
              alignItems: 'center',
            }}
          >
            {dogs.map((dog, index) => (
              <>
                <DogItem key={index} dogData={dog} />
                {index === 0 && <SpecialTitle color='#F7A400'>&</SpecialTitle>}
              </>
            ))}
          </View>
          <View
            style={{ width: 'auto', height: 1, backgroundColor: '#DFDFDF' }}
          />
          <View style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <SmallMedium color='#000'>{i18n.t('joinDescription')}</SmallMedium>
            <View
              style={{
                padding: 10,
                backgroundColor: 'rgba(102, 51, 153, 0.1)',
                borderRadius: 10,
              }}
            >
              <TextInput
                placeholder={i18n.t('joinPlaceholder')}
                placeholderTextColor={Colors.light.secondary}
                style={{
                  color: Colors.light.secondary,
                  minHeight: 100,
                  maxWidth: '100%',
                  textAlignVertical: 'top',
                }}
                multiline={true}
                numberOfLines={4}
                textAlignVertical='top'
                textBreakStrategy='simple'
              />
            </View>
          </View>
        </View>
        <View style={{ width: '100%', alignItems: 'center', gap: 16 }}>
          <StandardButton onPress={() => { }}>
            <BodyMedium color='#fff'>Envoyer le message</BodyMedium>
          </StandardButton>
          <UnderlinedButton onPress={() => { }}>
            <BodyMedium
              color='#000000'
              style={{ textDecorationLine: 'underline' }}
            >
              Envoyer sans message
            </BodyMedium>
          </UnderlinedButton>
        </View>
      </View>
    </SafeAreaView>
  )
}
