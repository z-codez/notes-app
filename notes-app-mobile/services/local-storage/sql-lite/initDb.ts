import db  from './database'

export function initDb() {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            content TEXT,
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL,
            deleted_at INTEGER,
            sync_status TEXT NOT NULL
        );
    `);
}

export function resetDb() {
    db.runSync(`
        DROP TABLE IF EXISTS notes;
    `);
}