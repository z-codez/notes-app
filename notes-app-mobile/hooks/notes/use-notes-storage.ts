import { useCallback, useEffect, useState, useRef } from "react";
import { Note, getNotes, getNote, addNote, updateNote, SaveAndUpdateNote, deleteNote } from "@/services/local-storage/sql-lite/notesDb";
import {useFocusEffect} from "expo-router";
import { AppState, AppStateStatus } from "react-native";

// TODO: Finish this hook
export function useNotesStorageGetAll() {
    // Tip: useState to trigger re-renders when state changes
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState("");



    // Tip: Always use useEffect hook for async operations because react renders sychronously
    useEffect(() => {
        async function fetchNotes() {
            try {
                const fetchedNotes = await getNotes();
                setNotes(fetchedNotes);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Unknown error just occurred");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchNotes();
    })

    return { notes, loading, error };
}

export function useNotesStorageGetOne(id: number) {

    // Tip: useState to trigger re-renders when state changes
    const [note, setNote] = useState<Note | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState("");



    // Tip: Always use useEffect hook for async operations because react renders sychronously
    useEffect(() => {
        async function fetchNotes() {
            try {
                const fetchedNote = await getNote(id);
                setNote(fetchedNote);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Unknown error just occurred");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchNotes();
    }, [id]);

    return { note, loading, error };

}

export function useNotesStoragePostOneOrPutOne(note: SaveAndUpdateNote) {

    const noteIdRefOnSave = useRef(0); // Ref that holds note id on save. Used to check if the note has already been saved

    const titleRef = useRef(note.title);
    const bodyRef = useRef(note.content ?? "");

    // Updates the values to titleRef and bodyRef to avoid stale state;
    useEffect(() => {
        titleRef.current = note.title;
        bodyRef.current = note.content ?? "";
    }, [note]);

    // Lifecycle auto save
    // TODO: Implement saving note, in these cases:
    // 1. When the app is in the background
    // 2. When the screen is unfocused
    // 3. Lastly, implement incremental persistence with debounce


    //const appStateRef = useRef(AppState.currentState);

    // This saves the note when app state changes to background
    useEffect(() => {
        const subscription = AppState.addEventListener(
            "change",
            (nextState: AppStateStatus) => {
                if (nextState === "background" || nextState === "inactive") {
                    if(noteIdRefOnSave.current !== 0) { // Check if the note has already been saved
                        note.id = noteIdRefOnSave.current;
                        addOrUpdateNoteAsync();
                    } else {
                        addOrUpdateNoteAsync().then(() => { // Saves new note
                        //console.log("Note saved when app is in the background", noteIdRefOnSave.current);
                        });
                    }
                }
            });
        return () => subscription.remove();
    }, []); // No dependencies because I already have a  useEffect which tracks the user input

    // Detects when the screen is focused
    useFocusEffect(
        useCallback(() => {
            return () => {// runs when the screen is unfocused
                if(noteIdRefOnSave.current !== 0) { // Check if the note has already been saved on AppState background / inactive
                    note.id = noteIdRefOnSave.current;
                    addOrUpdateNoteAsync();
                    return
                }
                addOrUpdateNoteAsync();
            }
        }, [])
    );


    async function addOrUpdateNoteAsync() {

        
        if( titleRef.current.length === 0) {// Check if the title is empty and return
            return;
        }
        try {
            // Check if the note should be saved or updated
            if (note.id) {
                await updateNote({id: note.id, title:titleRef.current, content:bodyRef.current});
            } else {
                const addedNoteId = await addNote({title:titleRef.current, content:bodyRef.current, created_at: note.created_at});
                noteIdRefOnSave.current = addedNoteId;
            }
        } catch (err) {
            // TODO: Implement better error handling or logging
            if (err instanceof Error) {
                console.log(err.message);
            } else {
                console.log("Unknown error just occurred");
            }
        }
    }
}

export function useNotesStorageDelete(id: number, deletePressed: boolean) {
    let result = null;

    async function removeNote(id: number) {
        try {
            await deleteNote(id);
        } catch (err) {
            // TODO: Implement better error handling or logging
            if (err instanceof Error) {
                console.log(err.message);
            } else {
                console.log("Unknown error just occurred");
            }
        }
    }
    
    if (deletePressed) {
        result = removeNote(id);
    }

    return result;
}


