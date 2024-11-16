import { SpecialTitle } from '@/components/ui/text';
import { Link, router } from 'expo-router';
import { Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { useSession } from "./ctx";

export default function Login() {
  const { signIn } = useSession();
  const handleLogin = () => {
    signIn();
    router.replace("/(auth)/(tabs)/(home)");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.topSection} />
        <View style={styles.bottomSection}>
          <View style={styles.formContainer}>
            <SpecialTitle>Connexion</SpecialTitle>
            <View style={styles.inputContainer}>
              <TextInput placeholder="Email" />
              <TextInput placeholder="Password" />
              <Text>Mot de passe oublié ?</Text>
            </View>
            <Button title="Se connecter" onPress={handleLogin} />
          </View>
          <Link href="/signup" style={styles.signupLink}>Sign up</Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 1,
    backgroundColor: '#F49819',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  formContainer: {
    display: 'flex',
    gap: 40,
    paddingHorizontal: 48,
    paddingTop: 48,
    alignItems: 'center',
  },
  inputContainer: {
    display: 'flex',
    gap: 20,
    alignItems: 'center',
  },
  signupLink: {
    position: 'absolute',
    bottom: 40,
    margin: 'auto',
    width: '100%',
    textAlign: 'center',
  },
});
