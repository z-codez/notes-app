import db  from './database'

export function initDb() {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            content TEXT,
            updated_at INTEGER NOT NULL,
            deleted_at INTEGER,
            sync_status TEXT NOT NULL
        );
    `);
}

export function resetDb() {
    db.execSync(`
        DROP TABLE IF EXISTS notes;
    `);
}