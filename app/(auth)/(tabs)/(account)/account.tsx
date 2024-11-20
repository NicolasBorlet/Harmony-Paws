import RoundedIconLink from "@/components/rounded-icon-link";
import { Body } from "@/components/ui/text";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AccountScreen() {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: 'white' }}>
            <View>
                <View style={{ paddingHorizontal: 20, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
                    <RoundedIconLink
                        icon={<FontAwesome name="gear" size={20} color="white" />}
                        onPress={() => router.push('/settings')}
                    />
                </View>
            </View>
            <View>
                <Body>Account</Body>
            </View>
        </View>
    );
}