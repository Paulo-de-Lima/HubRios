# HubRios - Rede Social Universitária

Uma rede social desenvolvida especificamente para universidades, utilizando React, Node.js, MySQL e TailwindCSS.

## 🎨 Cores

- **Laranja**: #FF6B35
- **Azul**: #004E89
- **Roxo**: #6C5CE7
- **Branco**: #FFFFFF

## 🚀 Tecnologias

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express
- **Banco de Dados**: MySQL
- **Autenticação**: JWT

## 📋 Pré-requisitos

- Node.js (v18 ou superior)
- MySQL (v8 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd HubRios
```

2. Instale as dependências:
```bash
npm run install:all
```

3. Configure o banco de dados:
   - Crie um banco de dados MySQL
   - Execute o arquivo `server/database/schema.sql` no seu MySQL
   - Configure as variáveis de ambiente no arquivo `server/.env` (use `.env.example` como base)

4. Configure as variáveis de ambiente:
```bash
cd server
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

## 🏃 Executando o Projeto

Para executar o projeto completo (frontend + backend):

```bash
npm run dev
```

Isso iniciará:
- Frontend na porta 3000 (http://localhost:3000)
- Backend na porta 5000 (http://localhost:5000)

Ou execute separadamente:

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

## 📁 Estrutura do Projeto

```
HubRios/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   └── App.jsx         # Componente principal
│   └── package.json
├── server/                 # Backend Node.js
│   ├── routes/            # Rotas da API
│   ├── middleware/        # Middlewares
│   ├── config/            # Configurações
│   ├── database/          # Schema do banco
│   └── server.js          # Servidor principal
└── package.json           # Scripts principais
```

## 🎯 Funcionalidades

- ✅ Autenticação (Login/Registro)
- ✅ Criação de posts
- ✅ Curtir posts
- ✅ Comentar posts
- ✅ Perfil de usuário
- ✅ Feed de posts
- ✅ Interface responsiva e moderna

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na pasta `server/` com:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=hubrios
JWT_SECRET=seu-secret-super-seguro
```

## 📝 Scripts Disponíveis

- `npm run dev` - Executa frontend e backend simultaneamente
- `npm run install:all` - Instala dependências de todos os projetos
- `cd client && npm run dev` - Executa apenas o frontend
- `cd server && npm run dev` - Executa apenas o backend

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

MIT
