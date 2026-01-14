// One database connection for the whole app (Singleton pattern)

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('notes.db');

export default db;