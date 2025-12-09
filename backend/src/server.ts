import express, { Request, Response } from 'express';
import cors from 'cors';
import tarifasRoutes from './routes/tarifas.routes';
import calculadoraRoutes from './routes/calculadora-complexa.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Rotas da API
app.use('/api/tarifas', tarifasRoutes);

// Rotas da API calculadora complexa
app.use('/api/calculadora', calculadoraRoutes);

// Rota 404
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 API disponível em http://localhost:${PORT}/api/tarifas`);
});