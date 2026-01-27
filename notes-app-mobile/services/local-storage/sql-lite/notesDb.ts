import db from "./database";
export type Note = {
    id: number;
    title: string;
    content?: string | "";
    created_at: number;
    updated_at: number;
    deleted_at?: number | null;
    sync_status: "clean" | "dirty" | "deleted";
}

export type SaveNote = {
    title: string;
    content?: string | "";
    created_at: number;
}

export type UpdateNote = {
    id: number;
    title: string;
    content?: string | "";
}

export type SaveAndUpdateNote = {
    id: number;
    title: string;
    content?: string | "";
    created_at: number;
}

export async function getNotes(): Promise<Note[]> {
    // Get all rows except rows that were soft deleted.
    return db.getAllAsync(
        "SELECT * FROM notes WHERE deleted_at IS NULL ORDER BY updated_at DESC", []
    );
}

export async function getNote(id: number): Promise<Note | null> {
    return db.getFirstAsync("SELECT * FROM notes WHERE id = ?", [id]);
}

export async function addNote(note: SaveNote): Promise<any> {
    // Using a prepared statement to prevent SQL injection
    
    const result = await db.runAsync(
        `INSERT INTO notes (title, content, created_at, updated_at, sync_status) VALUES (?, ?, ?, ?, 'dirty')`,
        [note.title, note.content ?? "", note.created_at, note.created_at]
    );

    return result.lastInsertRowId;

}

export async function updateNote(note: UpdateNote): Promise<any> {
    // Using a prepared statement to prevent SQL injection
    return db.runAsync(
        `UPDATE notes
         SET title = ?, content = ?, updated_at = ?, sync_status = 'dirty' 
         WHERE id = ?`,
        [note.title, note.content ?? "", Date.now(), note.id]
    );
}

export async function deleteNote(id: number) {
    // hard delete 
    // return db.runAsync(
    //     `DELETE FROM notes WHERE id = ?`,
    //      [id]
    // );

    // soft delete
    return db.runAsync(
        `UPDATE notes
         SET deleted_at = ?
         WHERE id = ?`,
         [Date.now(), id]
    );
}