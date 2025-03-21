# Mr Football Lab ⚽️

Este documento descreve como iniciar corretamente o projeto Mr Football Lab com frontend em React/Vite e backend em Python.

---

## 📌 Estrutura do Projeto

```
mrfootball_lab/
├── backend/    # Projeto backend (Python/Django)
└── frontend/    # Projeto React com Vite
```

---

## 🚀 Iniciando o Projeto

### 1. Backend (Python)

**Entre na pasta do backend:**

```bash
cd backend
```

**Instalar e utilizar versão do Python:**
```bash
pyenv install 3.13.2
pyenv local 3.13.2
```

**Criar o ambiente local com o Pipfile (instalando dependências):**
```bash
pipenv install
```

**Ativar ambiente virtual:**

```bash
pipenv shell
```

**Rodar o servidor backend:**

```bash
python manage.py runserver
```

> **OBS:** Sempre deixe o backend rodando antes de iniciar o frontend para evitar erros de comunicação entre API e cliente.

---

### 2. Executar Frontend (React/Vite)

Abra outro terminal e vá até a pasta frontend:

```bash
cd frontend
```

**Instale dependências (se necessário):**

```bash
yarn install
```

**Inicie o frontend:**

```bash
yarn dev
```