# 💰 App Finanças

API REST para controle financeiro pessoal, permitindo cadastro de usuários, autenticação via JWT e gerenciamento de **receitas** e **despesas** por usuário.

---

## 🚀 Tecnologias

* Node.js
* Express
* MongoDB + Mongoose
* JWT (JSON Web Token)
* bcryptjs
* dotenv
* Nodemon

---

## 📁 Estrutura do Projeto

```
src/
├── controllers/
├── database/
├── middlewares/
├── models/
├── routes/
├── services/
├── server.js
```

---

## ⚙️ Configuração

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/Carloss0101/app-financas.git
cd app-financas
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Criar arquivo `.env`

```env
PORT=3000
MONGO_URI=sua_string_do_mongodb
JWT_SECRET=sua_chave_secreta
```

---

## ▶️ Executar o projeto

```bash
npm run dev
```

Servidor rodando em:

```
http://localhost:3000
```

---

## 🔐 Autenticação

### Login

`POST /auth/login`

```json
{
  "username": "admin",
  "password": "123456"
}
```

Resposta:

```json
{
  "accessToken": "jwt_token_aqui"
}
```

Use o token no header:

```
Authorization: Bearer SEU_TOKEN
```

---

## 👤 Cadastro de Usuário

`POST /auth/cadastrar`

```json
{
  "username": "admin",
  "email": "admin@gmail.com",
  "password": "123456"
}
```

---

## 💸 Lançamentos

### Criar lançamento

`POST /lancamentos`

#### Receita

```json
{
  "tipo": "receita",
  "descricao": "Salário",
  "valor": 3500,
  "categoria": "Trabalho",
  "data": "2026-02-01",
  "recorrente": true
}
```

#### Despesa

```json
{
  "tipo": "despesa",
  "descricao": "Conta de luz",
  "valor": 280.75,
  "categoria": "Moradia",
  "data": "2026-02-05",
  "recorrente": true
}
```

---

## 🛡️ Segurança

* Senhas criptografadas com bcrypt
* JWT para autenticação
* Middleware protegendo rotas
* Dados isolados por usuário

