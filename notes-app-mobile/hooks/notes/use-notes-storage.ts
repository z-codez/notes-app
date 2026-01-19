import { useEffect, useState } from "react";
import { Note, getNotes, getNote , addNote, updateNote} from "@/services/local-storage/sql-lite/notesDb";
import { useLocalSearchParams } from "expo-router";
import { getFormattedDate } from "@/utils/date";

// TODO: Finish this hook
export function useNotesStorageGetAll() {
    // Tip: useState to trigger re-renders when state changes
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState("");

    
    async function fetchNotes() {
        try {
        // Tip: await can only be used inside async functions
        const fetchedNotes = await getNotes();
        notes.push(...fetchedNotes);
        
        } catch (err) {
            if(err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error just occurred");
            }
        } finally {
            setLoading(false);
        }
    }

    fetchNotes();

    return {notes, loading, error};

}

export function useNotesStorageGetOne() {
    
}

export function useNotesStoragePost() {
    
}

export function useNotesStorageDelete() {

}   

export function useNotesStorageUpdate() {

}
