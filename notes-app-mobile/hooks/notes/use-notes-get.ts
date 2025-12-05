import { Note, getNotes } from "@/services/api/notesApi";
import { useEffect, useState } from "react";

// Custom hook to get notes. TODO: implement real data fetching logic.
export function useNotesGet() {
    // In a real app, this would fetch data from an API or database.
    // Here, we simply import and return the notes from the notesApi.

    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const fetchedNotes = getNotes();
        setNotes(fetchedNotes);
    }, []);
    
    return notes; 
}