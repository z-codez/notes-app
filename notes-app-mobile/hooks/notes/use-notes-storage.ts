import { useCallback, useEffect, useState, useRef } from "react";
import { Note, getNotes, getNote, addNote, updateNote, SaveAndUpdateNote } from "@/services/local-storage/sql-lite/notesDb";
import {useFocusEffect } from "expo-router";
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

    const numTimesNoteChangedRef = useRef(0);

    const titleRef = useRef(note.title);
    const bodyRef = useRef(note.content ?? "");

    // Updates the values to titleRef and bodyRef to avoid stale state;
    useEffect(() => {
        numTimesNoteChangedRef.current++;
        titleRef.current = note.title;
        bodyRef.current = note.content ?? "";
        console.log("Note changed",  numTimesNoteChangedRef.current);
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
                    addOrUpdateNoteAsync();
                }

            });
        return () => subscription.remove();
    }, []); // No dependencies because I already have a  useEffect which tracks the user input

    // Detects when the screen is focused
    useFocusEffect(
        useCallback(() => {
            return () => {// runs when the screen is unfocused

                // TODO: save note
                addOrUpdateNoteAsync();
                console.log("Screen unfocused");
            }
        }, [])
    );


    async function addOrUpdateNoteAsync() {

        if( titleRef.current.length === 0) {
            return;
        }
        try {
            // Check if the note should be saved or updated
            if (note.id) {
                await updateNote({id: note.id, title:titleRef.current, content:bodyRef.current});
                console.log("Note updated", note.id);
            } else {
                const addedNote = await addNote({title:titleRef.current, content:bodyRef.current, created_at: note.created_at});
                console.log("Note saved", addedNote.id);
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

export function useNotesStorageDelete() {

}

export function useNotesStorageUpdate() {

}

export function useNotesStorageTest(title: string) {
    const titleRef = useRef(title);

    useEffect(() => {
        titleRef.current = title;
    }, [title]);
    useEffect(() => {
        const subscription = AppState.addEventListener(
            "change",
            (nextState: AppStateStatus) => {
                if (nextState === "background" || nextState === "inactive") {

                    console.log("Note title is ", titleRef.current);
                }

            });
        return () => subscription.remove();
    }, []);
}