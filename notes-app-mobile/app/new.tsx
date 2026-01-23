// TODO: IMPLEMENT storage
import { StyleSheet, View, AppState, AppStateStatus } from "react-native";
import { useEffect, useState, useRef, use} from "react";
import { ThemedText } from "@/components/themed-text";
import { getFormattedDate } from "@/utils/date";
import { ThemedInput } from "@/components/themed-input";
import { useLocalSearchParams } from "expo-router";
import { useNotesStorageGetOne, useNotesStoragePostOneOrPutOne} from "@/hooks/notes/use-notes-storage";

//const { height, width } = Dimensions.get('window');

export default function NewOrEditNoteScreen() {

    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    
    // TODO: Figure out how rerendering affects const, let. how doe Date.now() work
    // Default date and time for new notes
    const currentUtcTime = Date.now();
    let formattedDate = getFormattedDate(new Date(currentUtcTime));


    const id : number = Number(useLocalSearchParams().id);

    //const {note, error, loading} = useNotesGetOne(id);
    const {note, error, loading} = useNotesStorageGetOne(id);
    
    // Hook: Set title and body when note to be edited is loaded. React does not allow setting state in the body of react component.
    // Should only run twice - once for new note and once for note to be edited
    useEffect(() => {
        if(note) {
            setTitle(note.title);
            setBody(note.content ?? "");
        }
    }, [note]);

    useNotesStoragePostOneOrPutOne({
        id: id,
        title: title,
        content: body,
        created_at: currentUtcTime
    });

    if(loading) return <ThemedText>Loading...</ThemedText>;
    if(error) return <ThemedText>{error}</ThemedText>;
   
    // Setting the date for old notes
    if(id) {
        formattedDate = getFormattedDate(new Date(note?.created_at ?? 0));
    } 

    // New and Edit Note Screen.
    return (
        <View style={styles.container}>
            <ThemedInput
                autoFocus={true} // focuses the input
                autoCapitalize="sentences"
                //autoCorrect={false}
                type="title"
                placeholder={id ? undefined : "Titel"} // TODO: localize
                placeholderTextColor="#888"
                cursorColor={"#888"}
                style={styles.title}
                onChangeText={setTitle}
                value={title}
            />
            <ThemedText style={styles.date} type="date">{formattedDate}</ThemedText>
            <ThemedInput
                multiline
                type="default"
                placeholderTextColor="#888"
                cursorColor={"#888"}
                placeholder={id ? undefined : "Start writing your note here..."} // TODO: localize
                style={styles.body}
                onChangeText={setBody}
                value={body}
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