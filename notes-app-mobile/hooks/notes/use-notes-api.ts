import {getNotes, getNote } from "@/services/api/notes-api";
import { useEffect, useState } from "react";
import type { Note } from "@/services/api/types/note";

// Custom hook to get notes. TODO: implement real data fetching logic.
export function useNotesGetAll() {
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

export function useNotesGetOne(id:string) {

    const [note, setNote] = useState<Note>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(!id) return; 
        setLoading(true);  
        async function fetchNote() {
                try {
                    const fetchedNote = await getNote(id);
                    setNote(fetchedNote);
                } catch(error) {
                    if(error instanceof Error) {
                        setError(error.message);
                    }
                } finally {
                    setLoading(false);
                }
        }
        fetchNote();

    }, [id]);

    return {note, error, loading};
}

export function useNotesUpdate() {
    
}

export function useNotesPost() {
    
}   

export function useNotesDelete() {
    
}