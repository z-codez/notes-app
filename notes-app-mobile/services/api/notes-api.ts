import type {Note} from '@/services/api/types/note';

// Placeholder notes data.
const notes : Note[] = [
  { id: '1', title: 'First Note', subtitle: 'This is the first note.', body: 'Body of the first note.', createdAt: new Date()},
  { id: '2', title: 'Second Note', subtitle: 'This is the second note.', body: 'Body of the second note.', createdAt: new Date()},
  { id: '3', title: 'Third Note', subtitle: 'This is the third note.', body: 'Body of the third note.', createdAt: new Date()},
  { id: '4', title: 'Fourth Note', subtitle: 'This is the fourth note.', body: 'Body of the fourth note.', createdAt: new Date()},
  { id: '5', title: 'Fifth Note', subtitle: 'This is the fifth note.', body: 'Body of the fifth note.', createdAt: new Date()},
  { id: '6', title: 'Sixth Note', subtitle: 'This is the sixth note.', body: 'Body of the sixth note.', createdAt: new Date()},
]; //TODO: replace Placeholder for actual notes availability logic




export async function getNotes(): Promise<Note[]> {
    await notes // 
    return notes;
}



export async function addNote(note : Note) {
    await notes.push(note);
    if (notes.length === 6) throw new Error("Failed to add Note");
}

export function deleteNote(noteId: string): void {
    const index = notes.findIndex(note => note.id === noteId);
    if (index !== -1) {
        notes.splice(index, 1);
    }
}

export function updateNote(updatedNote: Note): void {
    const index = notes.findIndex(note => note.id === updatedNote.id);
    if (index !== -1) {
        notes[index] = updatedNote;
    }
}




