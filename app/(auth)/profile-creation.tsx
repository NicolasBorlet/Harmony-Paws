import { Body } from '@/components/ui/text'
import { KeyboardAvoidingView, View } from 'react-native'

export default function ProfileCreation() {
  return (
    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
      <View>
        <Body>ProfileCreation</Body>
      </View>
    </KeyboardAvoidingView>
  )
}
