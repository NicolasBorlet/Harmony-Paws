import StyledButton from '@/components/ui/button';
import StyledPressable from '@/components/ui/pressable';
import StyledText from '@/components/ui/text';
import { ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <StyledButton title="Hello" />
        <StyledPressable>
          <StyledText>Hello</StyledText>
        </StyledPressable>
      </ScrollView>
    </SafeAreaView>
  );
}
