class Note {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    body: string;

    constructor(id: string, title: string, subtitle: string, date: string, body: string) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.date = date;
        this.body = body;
    }

}
export {Note};

const notes: Note[] = []; 

// // Placeholder notes data.
// const notes = [
//   new Note('1', 'First Note', 'This is the first note.', 'Body of the first note.'),
//   new Note('2', 'Second Note', 'This is the second note.', 'Body of the second note.'),
//   new Note('3', 'Third Note', 'This is the third note.', 'Body of the third note.'),
//   new Note('4', 'Fourth Note', 'This is the fourth note.', 'Body of the fourth note.'),
//   new Note('5', 'Fifth Note', 'This is the fifth note.', 'Body of the fifth note.'),
//   new Note('6', 'Sixth Note', 'This is the sixth note.', 'Body of the sixth note.'),
// ];


export function getNotes(): Note[] {
    console.log("Getting Notes: " + notes)
    return notes;
}

export function addNote(note : Note): void {
    notes.push(note);
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




