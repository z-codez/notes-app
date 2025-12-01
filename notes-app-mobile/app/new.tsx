// TODO: Finish New Note Screen
import { Dimensions, StyleSheet, Text, View, ScrollView, TextInput} from "react-native";
import { ThemedText } from "@/components/themed-text";
import { getFormattedDate } from "@/utils/date";
import { ThemedInput } from "@/components/themed-input";

const { height, width } = Dimensions.get('window');

export default function NewNoteScreen() {

    const formattedDate = getFormattedDate(new Date());
    return (
        <View style={styles.container}>
            <ThemedInput 
                type="title"
                placeholder="Titel" // TODO: localize
                placeholderTextColor="#888"
                cursorColor={"#888"}
                style={styles.title}
            />
            <ThemedText style={styles.date} type="date">{formattedDate}</ThemedText>
            <ThemedInput
                multiline
                type="default"
                placeholderTextColor="#888"
                cursorColor={"#888"}
                placeholder="Start writing your note here..." // TODO: localize
                style={styles.body}
            />    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: "red",
        margin: 20,
        gap: 20,
    
    },

    title: {
        borderWidth: 0,
    },

    date: {
        margin: 0,
        padding: 0,
    },

    body: {

    }

});