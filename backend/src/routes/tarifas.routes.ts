import { Router } from 'express';
import { TarifasController } from '../controllers/tarifas.controller';

const router = Router();

// GET /api/tarifas - Listar todas as tarifas
router.get('/', TarifasController.getAll);

// GET /api/tarifas/:uf - Buscar tarifa por UF
router.get('/:uf', TarifasController.getByUF);

// POST /api/tarifas/calcular - Calcular economia
router.post('/calcular', TarifasController.calcularEconomia);

export default router;