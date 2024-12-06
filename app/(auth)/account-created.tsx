import { SpecialTitle } from "@/components/ui/text";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountCreated() {
  return (
    <SafeAreaView style={styles.container}>
      <SpecialTitle>Ton compte est créé !</SpecialTitle>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
