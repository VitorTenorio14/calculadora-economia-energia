import { Router } from 'express';
import { CalculadoraComplexaController } from '../controllers/calculadora-complexa.controller';

const router = Router();
const calculadoraComplexaController = new CalculadoraComplexaController();

// ROTAS para cálculo complexo
router.post('/calcular-complexo', (req, res) => 
  calculadoraComplexaController.calcularComplexo(req, res)
);
router.get('/distribuidoras/:uf', (req, res) => 
  calculadoraComplexaController.getDistribuidorasPorUF(req, res)
);
router.get('/custos-disponibilidade', (req, res) => 
  calculadoraComplexaController.getCustosDisponibilidade(req, res)
);

export default router;