import db, { runQuery } from './db';

const tarifas = [
  { estado: 'Goiás', uf: 'GO', tarifa_kwh: 1.16 },
  { estado: 'São Paulo', uf: 'SP', tarifa_kwh: 0.89 },
  { estado: 'Rio de Janeiro', uf: 'RJ', tarifa_kwh: 0.95 },
  { estado: 'Minas Gerais', uf: 'MG', tarifa_kwh: 0.91 },
  { estado: 'Paraná', uf: 'PR', tarifa_kwh: 0.87 },
  { estado: 'Santa Catarina', uf: 'SC', tarifa_kwh: 0.84 },
  { estado: 'Rio Grande do Sul', uf: 'RS', tarifa_kwh: 0.86 }
];

async function initializeDatabase() {
  try {
    console.log('🔄 Inicializando banco de dados...');
    
    // Inserir tarifas
    for (const tarifa of tarifas) {
      await runQuery(
        'INSERT OR REPLACE INTO tarifas (estado, uf, tarifa_kwh) VALUES (?, ?, ?)',
        [tarifa.estado, tarifa.uf, tarifa.tarifa_kwh]
      );
    }
    
    console.log('✅ Banco de dados inicializado com sucesso!');
    console.log(`📊 ${tarifas.length} tarifas inseridas/atualizadas`);
    
  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error);
  } finally {
    db.close();
  }
}

initializeDatabase();