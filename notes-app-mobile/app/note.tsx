import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";

import { useLocalSearchParams } from "expo-router";

export default function NoteScreen() {

    const { id } = useLocalSearchParams();
    return (
        <View>
            <ThemedText>This is Note Number {id}</ThemedText>
        </View>
    );
}