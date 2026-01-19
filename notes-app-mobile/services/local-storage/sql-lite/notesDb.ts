import db from "./database";
export type Note = {
    id: number;
    title: string;
    content?: string | "";
    updated_at: string;
    deleted_at?: string | null;
    sync_status: "clean" | "dirty" | "deleted";
}

export async function getNotes(): Promise<Note[]> {
    return db.getAllAsync(
        "SELECT * FROM notes WHERE deleted_at IS NULL ORDER BY updated_at DESC", []
    );
}

export async function getNote(id: number): Promise<Note | null> {
    return db.getFirstAsync("SELECT * FROM notes WHERE id = ?", [id]);
}

export async function addNote(note: Note): Promise<any> {
    // Using a prepared statement to prevent SQL injection
    return db.runAsync(
        `INSERT INTO notes (title, content, updated_at, sync_status) VALUES (?, ?, ?, 'dirty')`,
        [note.title, note.content ?? "", note.updated_at]
    );

}

export async function updateNote(note: Note): Promise<any> {
    // Using a prepared statement to prevent SQL injection
    return db.runAsync(
        `UPDATE notes
         SET title = ?, content = ?, updated_at = ?, sync_status = 'dirty' 
         WHERE id = ?`,
        [note.title, note.content ?? "", note.updated_at, note.id]
    );
}