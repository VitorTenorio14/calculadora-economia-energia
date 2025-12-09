// db.ts
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { 
  TarifaRow, 
  EstadoRow, 
  RegraGDRow, 
  FioBAnoRow, 
  DistribuidoraRow,
  CustoDisponibilidadeRow 
} from './models/Tarifa.model';

// Banco de dados
let db: Database | null = null;

export async function initializeDatabase() {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  // Criar tabelas
  await db.exec(`
    CREATE TABLE IF NOT EXISTS estados (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uf TEXT UNIQUE NOT NULL,
      icms REAL NOT NULL,
      isento_icms_tusd TEXT CHECK(isento_icms_tusd IN ('ISENTO', 'NÃO ISENTO')) NOT NULL,
      isento_icms_te TEXT CHECK(isento_icms_te IN ('ISENTO', 'NÃO ISENTO')) NOT NULL,
      isencao_gc TEXT NOT NULL,
      impostos_fio_b TEXT CHECK(impostos_fio_b IN ('ISENTO', 'NÃO ISENTO')) NOT NULL,
      icms_te_booleano BOOLEAN DEFAULT 0,
      icms_tusd_booleano BOOLEAN DEFAULT 0,
      isencao_gc_booleano BOOLEAN DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS regras_gd_por_ano (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      regra TEXT NOT NULL CHECK(regra IN ('GD I', 'GD II', 'GD III')),
      ano INTEGER NOT NULL,
      fio_b REAL NOT NULL,
      fio_a REAL NOT NULL,
      tfsee REAL NOT NULL,
      ped REAL NOT NULL,
      UNIQUE(regra, ano)
    );

    CREATE TABLE IF NOT EXISTS fio_b_por_ano (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ano INTEGER UNIQUE NOT NULL,
      percentual REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS distribuidoras (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uf TEXT NOT NULL,
      nome TEXT NOT NULL,
      tarifa_te REAL NOT NULL,
      tarifa_tusd REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (uf) REFERENCES estados(uf)
    );

    CREATE TABLE IF NOT EXISTS tarifas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      estado TEXT NOT NULL,
      uf TEXT NOT NULL UNIQUE,
      tarifa_kwh REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS custo_disponibilidade (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      consumo_min INTEGER NOT NULL,
      consumo_max INTEGER NOT NULL,
      custo REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      CHECK (consumo_min <= consumo_max)
    );
  `);

  console.log('✅ Banco de dados SQLite inicializado com todas as tabelas');
  return db;
}

// Funções de query genéricas
export async function queryAll<T>(sql: string, params: any[] = []): Promise<T[]> {
  if (!db) throw new Error('Database not initialized');
  return db.all(sql, params);
}

export async function queryGet<T>(sql: string, params: any[] = []): Promise<T | undefined> {
  if (!db) throw new Error('Database not initialized');
  return db.get(sql, params);
}

export async function runQuery(sql: string, params: any[] = []): Promise<void> {
  if (!db) throw new Error('Database not initialized');
  await db.run(sql, params);
}

// Funções específicas
export async function getEstadoByUF(uf: string): Promise<EstadoRow | undefined> {
  return queryGet<EstadoRow>('SELECT * FROM estados WHERE uf = ?', [uf]);
}

export async function getRegraGD(regra: string, ano: number): Promise<RegraGDRow | undefined> {
  return queryGet<RegraGDRow>('SELECT * FROM regras_gd_por_ano WHERE regra = ? AND ano = ?', [regra, ano]);
}

export async function getFioBByAno(ano: number): Promise<FioBAnoRow | undefined> {
  return queryGet<FioBAnoRow>('SELECT * FROM fio_b_por_ano WHERE ano = ?', [ano]);
}

export async function getDistribuidoraByUF(uf: string): Promise<DistribuidoraRow[]> {
  return queryAll<DistribuidoraRow>('SELECT * FROM distribuidoras WHERE uf = ?', [uf]);
}

export async function getDistribuidoraById(id: number): Promise<DistribuidoraRow | undefined> {
  return queryGet<DistribuidoraRow>('SELECT * FROM distribuidoras WHERE id = ?', [id]);
}

export async function getTarifaByUF(uf: string): Promise<TarifaRow | undefined> {
  return queryGet<TarifaRow>('SELECT * FROM tarifas WHERE uf = ?', [uf]);
}

// Função para buscar custo de disponibilidade baseado no consumo
export async function getCustoDisponibilidade(consumo: number): Promise<number> {
  const custo = await queryGet<CustoDisponibilidadeRow>(
    'SELECT * FROM custo_disponibilidade WHERE ? BETWEEN consumo_min AND consumo_max',
    [consumo]
  );
  return custo ? custo.custo : 0;
}

// Função para buscar todos os custos de disponibilidade
export async function getAllCustosDisponibilidade(): Promise<CustoDisponibilidadeRow[]> {
  return queryAll<CustoDisponibilidadeRow>('SELECT * FROM custo_disponibilidade ORDER BY consumo_min');
}

export async function closeDatabase() {
  if (db) {
    await db.close();
    db = null;
  }
}

export { db };