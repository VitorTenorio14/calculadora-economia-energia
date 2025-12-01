import { Request, Response } from 'express';
import db from '../db';
import { TarifaRow } from '../models/Tarifa.model';

export class TarifasController {
  // Buscar todas as tarifas
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      db.all<TarifaRow>('SELECT * FROM tarifas ORDER BY estado', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(rows || []);
      });
    } catch (error) {
      console.error('Erro em getAll:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Buscar tarifa por UF
  static async getByUF(req: Request, res: Response): Promise<void> {
    try {
      const { uf } = req.params;
      
      if (!uf || uf.length !== 2) {
        res.status(400).json({ error: 'UF deve ter 2 caracteres (ex: GO, SP)' });
        return;
      }
      
      db.get<TarifaRow>('SELECT * FROM tarifas WHERE uf = ?', [uf.toUpperCase()], (err, row) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        
        if (!row) {
          res.status(404).json({ error: `Tarifa não encontrada para UF: ${uf}` });
          return;
        }
        
        res.json(row);
      });
    } catch (error) {
      console.error('Erro em getByUF:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Calcular economia
  static async calcularEconomia(req: Request, res: Response): Promise<void> {
    try {
      const { uf, consumoMensalKwh, valorContaAtual } = req.body;
      
      // Validação
      if (!uf || uf.length !== 2) {
        res.status(400).json({ error: 'UF deve ter 2 caracteres (ex: GO, SP)' });
        return;
      }
      
      if (!consumoMensalKwh || consumoMensalKwh <= 0) {
        res.status(400).json({ error: 'Consumo mensal deve ser maior que zero' });
        return;
      }
      
      if (valorContaAtual && valorContaAtual < 0) {
        res.status(400).json({ error: 'Valor da conta atual não pode ser negativo' });
        return;
      }
      
      // Buscar tarifa
      db.get<TarifaRow>('SELECT * FROM tarifas WHERE uf = ?', [uf.toUpperCase()], (err, row) => {
        if (err) {
          console.error('Erro ao buscar tarifa:', err);
          res.status(500).json({ error: 'Erro ao buscar tarifa' });
          return;
        }
        
        if (!row) {
          res.status(404).json({ error: `Tarifa não encontrada para UF: ${uf}` });
          return;
        }
        
        const tarifa = row.tarifa_kwh;
        const custoMensalEnergiaLimpa = consumoMensalKwh * tarifa;
        const economiaMensal = valorContaAtual ? valorContaAtual - custoMensalEnergiaLimpa : 0;
        const economiaAnual = economiaMensal * 12;
        
        res.json({
          tarifa_kwh: tarifa,
          custoMensalEnergiaLimpa: Number(custoMensalEnergiaLimpa.toFixed(2)),
          economiaMensal: Number(Math.max(economiaMensal, 0).toFixed(2)),
          economiaAnual: Number(Math.max(economiaAnual, 0).toFixed(2)),
          consumoMensalKwh: Number(consumoMensalKwh)
        });
      });
    } catch (error) {
      console.error('Erro em calcularEconomia:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}