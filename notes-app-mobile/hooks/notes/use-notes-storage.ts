import { use, useEffect, useState } from "react";
import { Note, getNotes, getNote , addNote, updateNote, SaveNote} from "@/services/local-storage/sql-lite/notesDb";
import { useLocalSearchParams } from "expo-router";
import { getFormattedDate } from "@/utils/date";

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

    return {notes, loading, error};
}

export function useNotesStorageGetOne() {
    
}

export function useNotesStoragePostOne(note: SaveNote) {
    

    useEffect(() => {
        async function addNoteAsync() {
            try {
                addNote(note);
            } catch (err) {
                // TODO: Implement better error handling or logging
                 if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log("Unknown error just occurred");
                }
                
            }
        }
        addNoteAsync();

    })
   
}

export function useNotesStorageDelete() {

}   

export function useNotesStorageUpdate() {

}
