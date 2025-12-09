// Interfaces para o banco de dados
export interface TarifaRow {
  id: number;
  estado: string;
  uf: string;
  tarifa_kwh: number;
  created_at?: string;
}

export interface EstadoRow {
  id: number;
  uf: string;
  icms: number;
  isento_icms_tusd: string;
  isento_icms_te: string;
  isencao_gc: string;
  impostos_fio_b: string;
  icms_te_booleano: boolean;
  icms_tusd_booleano: boolean;
  isencao_gc_booleano: boolean;
}

export interface RegraGDRow {
  id: number;
  regra: string;
  ano: number;
  fio_b: number;
  fio_a: number;
  tfsee: number;
  ped: number;
}

export interface FioBAnoRow {
  id: number;
  ano: number;
  percentual: number;
}

export interface DistribuidoraRow {
  id: number;
  uf: string;
  nome: string;
  tarifa_te: number;    // Em R$/MWh
  tarifa_tusd: number;  // Em R$/MWh
  created_at: string;
}

// Custo de Disponibilidade
export interface CustoDisponibilidadeRow {
  id: number;
  consumo_min: number;
  consumo_max: number;
  custo: number;
  created_at: string;
}

// Interfaces para requests/responses da API
export interface CalculoRequest {
  uf: string;
  consumoMensalKwh: number;
  valorContaAtual?: number;
}

export interface CalculoResponse {
  tarifa_kwh: number;
  custoMensalEnergiaLimpa: number;
  economiaMensal: number;
  economiaAnual: number;
  consumoMensalKwh: number;
}

// Interface para cálculo complexo
export interface CalculoComplexoRequest {
  uf: string;
  distribuidora_id?: number; // Opcional - se não informado, pega a primeira do estado
  valor_fatura: number;      // Valor da fatura atual em R$
  ano_instalacao?: number;   // Para cálculos de GD
  tipo_gd?: string;          // 'GD I', 'GD II', 'GD III'
}

export interface CalculoComplexoResponse {
  // Resultados principais
  tarifa_base: number;           // Tarifa / 1000
  tarifa_consumo_final: number;  // tarifa_base / ((1-ICMS)*(1-5%))
  tarifa_compensacao: number;    // TE + TUSD (ajustadas)
  consumo_medio: number;         // valor_fatura / tarifa_base
  consumo_compensavel: number;   // consumo_medio - custo_disponibilidade
  compensacao: number;           // consumo_compensavel * tarifa_compensacao
  economia: number;              // compensação * 20%
  
  // Detalhes do cálculo
  detalhes: {
    icms: number;                 // % de ICMS
    isento_icms_te: boolean;      // Se isento de ICMS TE
    isento_icms_tusd: boolean;    // Se isento de ICMS TUSD
    tarifa_te: number;            // Tarifa TE em R$/kWh 
    tarifa_tusd: number;          // Tarifa TUSD em R$/kWh 
    custo_disponibilidade: number; // Custo baseado no consumo
    desconto: number;              // 20% fixo
    valor_fatura: number;          // Valor informado
  };
}

// Interfaces para inicialização de dados
export interface TarifaInput {
  estado: string;
  uf: string;
  tarifa_kwh: number;
}

export interface EstadoInput {
  uf: string;
  icms: number;
  isento_icms_tusd: string;
  isento_icms_te: string;
  isencao_gc: string;
  impostos_fio_b: string;
  icms_te_booleano: boolean;
  icms_tusd_booleano: boolean;
  isencao_gc_booleano: boolean;
}

export interface RegraGDInput {
  regra: string;
  ano: number;
  fio_b: number;
  fio_a: number;
  tfsee: number;
  ped: number;
}

export interface FioBAnoInput {
  ano: number;
  percentual: number;
}

export interface DistribuidoraInput {
  uf: string;
  nome: string;
  tarifa_te: number;
  tarifa_tusd: number;
}

// Input para custo de disponibilidade
export interface CustoDisponibilidadeInput {
  consumo_min: number;
  consumo_max: number;
  custo: number;
}

// Aliases para compatibilidade
export type Tarifa = TarifaInput;
export type Estado = EstadoInput;
export type RegraGD = RegraGDInput;
export type FioBAno = FioBAnoInput;
export type Distribuidora = DistribuidoraInput;
export type CustoDisponibilidade = CustoDisponibilidadeInput;