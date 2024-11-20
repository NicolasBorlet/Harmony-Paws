import RoundedIconLink from "@/components/rounded-icon-link";
import { Body, SmallBold } from "@/components/ui/text";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Todo {
    value: string;
    intValue: number;
}

export default function AccountScreen() {
    const insets = useSafeAreaInsets();

    const db = useSQLiteContext();
    const [version, setVersion] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        async function setup() {
            const result = await db.getFirstAsync<{ 'sqlite_version()': string }>(
                'SELECT sqlite_version()'
            );
            if (result && result['sqlite_version()']) {
                setVersion(result['sqlite_version()']);
            }
        }

        setup();
    }, []);

    useEffect(() => {
        async function setup() {
          const result = await db.getAllAsync<Todo>('SELECT * FROM todos');
          setTodos(result);
        }
        setup();
      }, []);    

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
                <SmallBold color="#000">SQLite version: {version}</SmallBold>
                {todos.map((todo, index) => (
                    <View key={index}>
                        <SmallBold color="#000">{`${todo.intValue} - ${todo.value}`}</SmallBold>
                    </View>
                ))}
            </View>
        </View>
    );
}