# 🌱 Calculadora de Economia de Energia Limpa

Projeto full-stack para calcular economia ao migrar para energia renovável.

## 🚀 Tecnologias
- **Frontend**: Angular 16 + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript + SQLite
- **Banco de Dados**: SQLite com tarifas por estado

## 📁 Estrutura do Projeto

calculadora-economia-energia/
├── backend/ # API REST com Node.js
├── frontend/ # Aplicação Angular
├── README.md # Esta documentação
└── .gitignore # Arquivos ignorados


## 🛠️ Instalação e Execução

### Backend
```bash
cd backend
npm install
npm run init-db      # Inicializa banco de dados
npm run dev          # Inicia servidor na porta 3000

### Frontend
cd frontend
npm install
ng serve --open      # Inicia aplicação na porta 4200


🌐 API Endpoints

GET /api/tarifas - Lista todas as tarifas

GET /api/tarifas/:uf - Busca tarifa por UF

POST /api/tarifas/calcular - Calcula economia

📊 Funcionalidades

Seleção de estado/cidade

Cálculo de economia mensal/anual

Banco de dados com tarifas por estado

Interface responsiva com Tailwind CSS

Modal de resultados