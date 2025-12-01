export interface TarifaRow {
  id: number;
  estado: string;
  uf: string;
  tarifa_kwh: number;
  created_at?: string;
}

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