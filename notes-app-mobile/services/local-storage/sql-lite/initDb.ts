import db  from './database'

export function initDb() {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            content TEXT,
            updated_at TEXT NOT NULL,
            deleted_at TEXT INTEGER,
            sync_status TEXT NOT NULL
        );
    `);
}