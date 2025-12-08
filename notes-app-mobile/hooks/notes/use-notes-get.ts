import {getNotes } from "@/services/api/notesApi";
import { useEffect, useState } from "react";
import type { Note } from "@/services/api/types/note";

// Custom hook to get notes. TODO: implement real data fetching logic.
export function useNotesGet() {
    // In a real app, this would fetch data from an API or database.
    // Here, we simply import and return the notes from the notesApi.

    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // No dependency so that it runs only once on mount
    useEffect(() => {
        async function fetchNotes() {
            try {
                const fetchedNotes = await getNotes();
                setNotes(fetchedNotes);
            } catch(err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Unknown error occurred");
                }
            } finally {
                setLoading(false);
            }    
        } // Side effect
        fetchNotes();
    }, []);
    
    return {notes, loading, error}; 
}