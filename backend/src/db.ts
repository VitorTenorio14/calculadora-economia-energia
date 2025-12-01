import sqlite3 from 'sqlite3';

// Tipagem para resultados do SQLite
interface TarifaRow {
  id: number;
  estado: string;
  uf: string;
  tarifa_kwh: number;
  created_at: string;
}

const db = new sqlite3.Database('./database.sqlite');

// Inicializar banco de dados
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tarifas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      estado TEXT NOT NULL,
      uf TEXT NOT NULL UNIQUE,
      tarifa_kwh REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  console.log('Banco de dados SQLite inicializado');
});

// Funções auxiliares tipadas
export const queryAll = <T>(sql: string, params: any[] = []): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err: Error | null, rows: T[]) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const queryGet = <T>(sql: string, params: any[] = []): Promise<T | undefined> => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err: Error | null, row: T) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const runQuery = (sql: string, params: any[] = []): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err: Error | null) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export default db;