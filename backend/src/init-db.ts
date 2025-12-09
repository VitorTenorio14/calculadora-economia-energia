// init-db.ts
import { initializeDatabase, runQuery, closeDatabase } from './db';
import { 
  Estado, 
  RegraGD, 
  FioBAno, 
  Tarifa,
  Distribuidora,
  CustoDisponibilidade 
} from './models/Tarifa.model';


// Dados dos estados
const estados: Estado[] = [
  { uf: 'AC', icms: 0.19, isento_icms_tusd: 'NÃO ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: true, isencao_gc_booleano: false },
  { uf: 'AL', icms: 0.19, isento_icms_tusd: 'NÃO ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: true, isencao_gc_booleano: false },
  { uf: 'AM', icms: 0.20, isento_icms_tusd: 'ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: true, isencao_gc_booleano: false },
  { uf: 'AP', icms: 0.18, isento_icms_tusd: 'NÃO ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: true, isencao_gc_booleano: false },
  { uf: 'BA', icms: 0.205, isento_icms_tusd: 'ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: true, isencao_gc_booleano: false },
  { uf: 'CE', icms: 0.20, isento_icms_tusd: 'NÃO ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: false, isencao_gc_booleano: false },
  { uf: 'DF', icms: 0.20, isento_icms_tusd: 'ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: true, isencao_gc_booleano: false },
  { uf: 'ES', icms: 0.17, isento_icms_tusd: 'NÃO ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: false, isencao_gc_booleano: false },
  { uf: 'GO', icms: 0.19, isento_icms_tusd: 'ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'ISENTO', icms_te_booleano: true, icms_tusd_booleano: false, isencao_gc_booleano: false },
  { uf: 'MA', icms: 0.22, isento_icms_tusd: 'NÃO ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: true, isencao_gc_booleano: false },
  { uf: 'MG', icms: 0.18, isento_icms_tusd: 'ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'INTEGRAL', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: true, isencao_gc_booleano: true },
  { uf: 'MS', icms: 0.17, isento_icms_tusd: 'ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: true, isencao_gc_booleano: false },
  { uf: 'MT', icms: 0.17, isento_icms_tusd: 'ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: true, isencao_gc_booleano: true },
  { uf: 'PA', icms: 0.19, isento_icms_tusd: 'NÃO ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: true, isencao_gc_booleano: false },
  { uf: 'PB', icms: 0.20, isento_icms_tusd: 'NÃO ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: false, isencao_gc_booleano: false },
  { uf: 'PE', icms: 0.205, isento_icms_tusd: 'ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: true, isencao_gc_booleano: false },
  { uf: 'PI', icms: 0.21, isento_icms_tusd: 'NÃO ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: true, isencao_gc_booleano: false },
  { uf: 'PR', icms: 0.19, isento_icms_tusd: 'NÃO ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: false, isencao_gc_booleano: false },
  { uf: 'RJ', icms: 0.22, isento_icms_tusd: 'NÃO ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: false, isencao_gc_booleano: false },
  { uf: 'RN', icms: 0.18, isento_icms_tusd: 'ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: true, isencao_gc_booleano: false },
  { uf: 'RO', icms: 0.20, isento_icms_tusd: 'NÃO ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: true, isencao_gc_booleano: false },
  { uf: 'RR', icms: 0.20, isento_icms_tusd: 'NÃO ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: true, isencao_gc_booleano: false },
  { uf: 'RS', icms: 0.17, isento_icms_tusd: 'NÃO ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: false, isencao_gc_booleano: false },
  { uf: 'SC', icms: 0.17, isento_icms_tusd: 'NÃO ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: false, isencao_gc_booleano: false },
  { uf: 'SE', icms: 0.19, isento_icms_tusd: 'NÃO ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: false, isencao_gc_booleano: false },
  { uf: 'SP', icms: 0.18, isento_icms_tusd: 'NÃO ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: false, isencao_gc_booleano: false },
  { uf: 'TO', icms: 0.20, isento_icms_tusd: 'NÃO ISENTO', isento_icms_te: 'ISENTO', isencao_gc: 'NÃO APLICA', impostos_fio_b: 'NÃO ISENTO', icms_te_booleano: true, icms_tusd_booleano: false, isencao_gc_booleano: false },
];

// Percentual Fio B por ano (2023-2029)
const fioBAno: FioBAno[] = [
  { ano: 2023, percentual: 0.15 },
  { ano: 2024, percentual: 0.30 },
  { ano: 2025, percentual: 0.45 },
  { ano: 2026, percentual: 0.60 },
  { ano: 2027, percentual: 0.75 },
  { ano: 2028, percentual: 0.90 },
  { ano: 2029, percentual: 1.00 },
];

// Regras GD I (2023-2045)
const regrasGDI: RegraGD[] = [];
for (let ano = 2023; ano <= 2044; ano++) {
  regrasGDI.push({ regra: 'GD I', ano, fio_b: 0, fio_a: 0, tfsee: 0, ped: 0 });
}
// GD I 2045 especial
regrasGDI.push({ regra: 'GD I', ano: 2045, fio_b: 1.00, fio_a: 0.40, tfsee: 1.00, ped: 1.00 });

// Regras GD II (2023-2045)
const regrasGDII: RegraGD[] = [];
for (let ano = 2023; ano <= 2028; ano++) {
  const fio_b = [0.15, 0.30, 0.45, 0.60, 0.75, 0.90][ano - 2023];
  regrasGDII.push({ regra: 'GD II', ano, fio_b, fio_a: 0, tfsee: 0, ped: 0 });
}
for (let ano = 2029; ano <= 2045; ano++) {
  regrasGDII.push({ regra: 'GD II', ano, fio_b: 1.00, fio_a: 0.40, tfsee: 1.00, ped: 1.00 });
}

// Regras GD III (2023-2045)
const regrasGDIII: RegraGD[] = [];
for (let ano = 2023; ano <= 2045; ano++) {
  regrasGDIII.push({ regra: 'GD III', ano, fio_b: 1.00, fio_a: 0.40, tfsee: 1.00, ped: 1.00 });
}

// TARIFAS PARA TODOS OS 27 ESTADOS
const tarifas: Tarifa[] = [
  { estado: 'Acre', uf: 'AC', tarifa_kwh: 1.05 },
  { estado: 'Alagoas', uf: 'AL', tarifa_kwh: 0.98 },
  { estado: 'Amazonas', uf: 'AM', tarifa_kwh: 1.20 },
  { estado: 'Amapá', uf: 'AP', tarifa_kwh: 1.10 },
  { estado: 'Bahia', uf: 'BA', tarifa_kwh: 0.95 },
  { estado: 'Ceará', uf: 'CE', tarifa_kwh: 0.92 },
  { estado: 'Distrito Federal', uf: 'DF', tarifa_kwh: 0.89 },
  { estado: 'Espírito Santo', uf: 'ES', tarifa_kwh: 0.88 },
  { estado: 'Goiás', uf: 'GO', tarifa_kwh: 1.16 },
  { estado: 'Maranhão', uf: 'MA', tarifa_kwh: 0.97 },
  { estado: 'Minas Gerais', uf: 'MG', tarifa_kwh: 0.91 },
  { estado: 'Mato Grosso do Sul', uf: 'MS', tarifa_kwh: 0.94 },
  { estado: 'Mato Grosso', uf: 'MT', tarifa_kwh: 1.08 },
  { estado: 'Pará', uf: 'PA', tarifa_kwh: 1.12 },
  { estado: 'Paraíba', uf: 'PB', tarifa_kwh: 0.93 },
  { estado: 'Pernambuco', uf: 'PE', tarifa_kwh: 0.96 },
  { estado: 'Piauí', uf: 'PI', tarifa_kwh: 0.99 },
  { estado: 'Paraná', uf: 'PR', tarifa_kwh: 0.87 },
  { estado: 'Rio de Janeiro', uf: 'RJ', tarifa_kwh: 0.95 },
  { estado: 'Rio Grande do Norte', uf: 'RN', tarifa_kwh: 0.90 },
  { estado: 'Rondônia', uf: 'RO', tarifa_kwh: 1.04 },
  { estado: 'Roraima', uf: 'RR', tarifa_kwh: 1.25 },
  { estado: 'Rio Grande do Sul', uf: 'RS', tarifa_kwh: 0.86 },
  { estado: 'Santa Catarina', uf: 'SC', tarifa_kwh: 0.84 },
  { estado: 'Sergipe', uf: 'SE', tarifa_kwh: 0.94 },
  { estado: 'São Paulo', uf: 'SP', tarifa_kwh: 0.89 },
  { estado: 'Tocantins', uf: 'TO', tarifa_kwh: 1.02 }
];

// Distribuidoras com tarifas TE e TUSD (em R$/MWh)
const distribuidoras: Distribuidora[] = [
  // GO - Equatorial GO
  { uf: 'GO', nome: 'EQUATORIAL GO', tarifa_te: 324.14, tarifa_tusd: 567.67 },
  // DF - Neoenergia DF  
  { uf: 'DF', nome: 'NEOENERGIA DF', tarifa_te: 402.80, tarifa_tusd: 423.92 },
];

// Tabela de custo de disponibilidade
const custosDisponibilidade: CustoDisponibilidade[] = [
  { consumo_min: 200, consumo_max: 400, custo: 30 },
  { consumo_min: 401, consumo_max: 600, custo: 50 },
  { consumo_min: 601, consumo_max: 9999999, custo: 100 }
];

async function populateDatabase() {
  try {
    console.log('🔄 Populando banco de dados...');

    // Verificar integridade dos dados
    const estadosComTarifa = new Set(tarifas.map(t => t.uf));
    const todosEstados = new Set(estados.map(e => e.uf));
    
    const estadosSemTarifa = [...todosEstados].filter(uf => !estadosComTarifa.has(uf));
    if (estadosSemTarifa.length > 0) {
      console.warn(`⚠️  Estados sem tarifa definida: ${estadosSemTarifa.join(', ')}`);
    }

    // Estados
    for (const estado of estados) {
      await runQuery(
        `INSERT OR REPLACE INTO estados 
        (uf, icms, isento_icms_tusd, isento_icms_te, isencao_gc, impostos_fio_b, icms_te_booleano, icms_tusd_booleano, isencao_gc_booleano) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [estado.uf, estado.icms, estado.isento_icms_tusd, estado.isento_icms_te, 
         estado.isencao_gc, estado.impostos_fio_b, estado.icms_te_booleano ? 1 : 0, 
         estado.icms_tusd_booleano ? 1 : 0, estado.isencao_gc_booleano ? 1 : 0]
      );
    }

    // Fio B por ano
    for (const fb of fioBAno) {
      await runQuery(
        'INSERT OR REPLACE INTO fio_b_por_ano (ano, percentual) VALUES (?, ?)',
        [fb.ano, fb.percentual]
      );
    }

    // Regras GD
    const allRegras = [...regrasGDI, ...regrasGDII, ...regrasGDIII];
    for (const regra of allRegras) {
      await runQuery(
        `INSERT OR REPLACE INTO regras_gd_por_ano (regra, ano, fio_b, fio_a, tfsee, ped) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [regra.regra, regra.ano, regra.fio_b, regra.fio_a, regra.tfsee, regra.ped]
      );
    }

    // Tarifas
    for (const tarifa of tarifas) {
      await runQuery(
        'INSERT OR REPLACE INTO tarifas (estado, uf, tarifa_kwh) VALUES (?, ?, ?)',
        [tarifa.estado, tarifa.uf, tarifa.tarifa_kwh]
      );
    }

    // Distribuidoras
    for (const dist of distribuidoras) {
      await runQuery(
        'INSERT OR REPLACE INTO distribuidoras (uf, nome, tarifa_te, tarifa_tusd) VALUES (?, ?, ?, ?)',
        [dist.uf, dist.nome, dist.tarifa_te, dist.tarifa_tusd]
      );
    }

    // Custos de disponibilidade
    for (const custo of custosDisponibilidade) {
      await runQuery(
        'INSERT OR REPLACE INTO custo_disponibilidade (consumo_min, consumo_max, custo) VALUES (?, ?, ?)',
        [custo.consumo_min, custo.consumo_max, custo.custo]
      );
    }

    console.log('✅ Banco de dados populado com sucesso!');
    console.log(`📊 ${estados.length} estados inseridos`);
    console.log(`📊 ${tarifas.length} tarifas inseridas`);
    console.log(`📊 ${distribuidoras.length} distribuidoras inseridas`);
    console.log(`📊 ${custosDisponibilidade.length} custos de disponibilidade inseridos`);
    console.log(`📊 ${allRegras.length} regras GD inseridas`);

  } catch (error) {
    console.error('❌ Erro ao popular banco de dados:', error);
  }
}

async function main() {
  await initializeDatabase();
  await populateDatabase();
  await closeDatabase();
}

main();