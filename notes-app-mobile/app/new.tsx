// TODO: Finish New Note Screen
import { Dimensions, StyleSheet, Text, View, ScrollView} from "react-native";
import { ThemedText } from "@/components/themed-text";
import { Link } from "expo-router";


const { height, width } = Dimensions.get('window');

export default function NewNoteScreen() {
    return (
        <ScrollView style={styles.container}></ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 'auto',
        marginTop: height * 0.1, // Dimensions API to get screen height
    },
});