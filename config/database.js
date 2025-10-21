// Importamos la librería better-sqlite3 para manejar bases de datos SQLite
const Database = require('better-sqlite3');

// Creamos una nueva instancia de base de datos SQLite
// El archivo 'learning_plataform.db' se creará automáticamente si no existe
const db = new Database('learning_plataform.db');

// Ejecutamos las sentencias SQL para crear las tablas de la base de datos
db.exec(`
    -- tabla de temas de aprendizaje
    CREATE TABLE IF NOT EXISTS learning_topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL, 
    votes INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
    -- tabla de enlaces de temas de aprendizaje
    CREATE TABLE IF NOT EXISTS topic_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    votes INTEGER DEFAULT 0,
    topic_id INTEGER NOT NULL,
    created at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES learning_topics(id) ON DELETE CASCADE
    );`);

// Exportamos la instancia de la base de datos para que otros archivos puedan usarla
module.exports = { db };