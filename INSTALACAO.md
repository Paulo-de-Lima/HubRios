# Guia de Instalação - HubRios

## Passo a Passo para Configurar o Projeto

### 1. Pré-requisitos

Certifique-se de ter instalado:
- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **MySQL** (versão 8 ou superior) - [Download](https://dev.mysql.com/downloads/)
- **npm** (vem com Node.js) ou **yarn**

### 2. Configurar o Banco de Dados MySQL

1. Abra o MySQL (via terminal ou MySQL Workbench)
2. Execute o arquivo `server/database/schema.sql`:
   ```sql
   -- Você pode copiar e colar o conteúdo do arquivo schema.sql
   -- ou executar diretamente:
   mysql -u root -p < server/database/schema.sql
   ```

   Ou manualmente:
   - Abra o MySQL
   - Execute os comandos do arquivo `server/database/schema.sql`

### 3. Configurar Variáveis de Ambiente

1. Na pasta `server/`, crie um arquivo `.env`:
   ```bash
   cd server
   cp env.example.txt .env
   ```

2. Edite o arquivo `.env` com suas configurações:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha_mysql_aqui
   DB_NAME=hubrios
   JWT_SECRET=seu-secret-super-seguro-altere-isso-em-producao
   ```

### 4. Instalar Dependências

Na raiz do projeto, execute:

```bash
npm run install:all
```

Isso instalará as dependências de:
- Projeto raiz
- Frontend (client/)
- Backend (server/)

### 5. Executar o Projeto

#### Opção 1: Executar tudo junto (recomendado)
```bash
npm run dev
```

Isso iniciará:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

#### Opção 2: Executar separadamente

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### 6. Acessar a Aplicação

1. Abra seu navegador em: http://localhost:3000
2. Você verá a tela de login
3. Crie uma conta ou faça login

### 7. Testar a Aplicação

1. **Criar conta**: Preencha nome, email, senha, matrícula e curso
2. **Fazer login**: Use email e senha
3. **Criar post**: Na página inicial, escreva algo e publique
4. **Curtir posts**: Clique no coração para curtir/descurtir
5. **Ver perfil**: Clique no seu nome no header ou no menu lateral

## Solução de Problemas

### Erro de conexão com MySQL

- Verifique se o MySQL está rodando
- Confirme as credenciais no arquivo `.env`
- Verifique se o banco de dados `hubrios` foi criado

### Erro de porta já em uso

- Altere a porta no arquivo `.env` (backend) ou `vite.config.js` (frontend)
- Ou pare o processo que está usando a porta

### Erro ao instalar dependências

- Certifique-se de ter Node.js 18+
- Tente deletar `node_modules` e `package-lock.json` e reinstalar
- Use `npm cache clean --force` se necessário

### Erro CORS

- Verifique se o backend está rodando na porta 5000
- Confirme que o proxy está configurado no `vite.config.js`

## Estrutura de Cores

A aplicação usa as seguintes cores:
- **Laranja**: #FF6B35 (botões principais, destaques)
- **Azul**: #004E89 (textos informativos, links)
- **Roxo**: #6C5CE7 (gradientes, elementos interativos)
- **Branco**: #FFFFFF (fundo, cards)

## Próximos Passos

Após a instalação, você pode:
- Personalizar as cores no arquivo `client/tailwind.config.js`
- Adicionar mais funcionalidades
- Customizar o design conforme necessário


