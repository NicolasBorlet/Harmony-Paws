import Back from "@/components/back-button";
import RoundedIconLink from "@/components/rounded-icon-link";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Settings() {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: 'white' }}>
            <Back />
        </View>
    );
}