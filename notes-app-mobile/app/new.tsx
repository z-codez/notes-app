// TODO: IMPLEMENT storage
import { StyleSheet, View, AppState, AppStateStatus } from "react-native";
import { useEffect, useState, useRef, useCallback } from "react";
import { ThemedText } from "@/components/themed-text";
import { getFormattedDate } from "@/utils/date";
import { ThemedInput } from "@/components/themed-input";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useNotesGetOne } from "@/hooks/notes/use-notes-api";


//const { height, width } = Dimensions.get('window');

export default function NewOrEditNoteScreen() {



        //const appStateRef = useRef(AppState.currentState);
    
        // This saves the note when app state changes to background
    useEffect(() => {
        const subscription = AppState.addEventListener(
            "change",
             (nextState: AppStateStatus)=> {
                // if (
                //     nextState === "background" &&
                //     (titleRef || bodyRef)   
                // ) {
                // }
                console.log("Next state: " + nextState);
             });
        return () => subscription.remove();     
    }, []);

        // Detects when the screen is focused
    useFocusEffect(
        useCallback(() => {
            return () => {// runs when the screen is unfocused
                console.log("Screen unfocused");

                // TODO: save note
                
                // setTimeout(() => {
                //    
                // }, 0);
            }
        }, [])
    );

    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");


    const titleRef = useRef(title);
    const bodyRef = useRef(body);

    // Updates the values to titleRef and bodyRef to avoid stale state;
    useEffect(() => {
        titleRef.current = title;
        bodyRef.current = body;
    }, [title, body]);

    const {id} : {id: string} = useLocalSearchParams();

    const {note, error, loading} = useNotesGetOne(id);
    
    // Hook: Set title and body when note changes. React does not allow setting state in the body of react component.
    useEffect(() => {
        if(note) {
            setTitle(note.title);
            setBody(note.body);
        }
    }, [note]);

    if(loading) return <ThemedText>Loading...</ThemedText>;
    if(error) return <ThemedText>{error}</ThemedText>;
   
    const formattedDate = getFormattedDate(new Date());

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