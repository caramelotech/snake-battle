# 🚀 Setup - Snake Battle

Guia rápido para começar a desenvolver Snake Battle.

## ✅ Checklist de Setup

### 1️⃣ Pré-requisitos

- [ ] Node.js 18+ instalado (`node --version`)
- [ ] npm 8+ instalado (`npm --version`)
- [ ] Git configurado (`git --version`)
- [ ] Editor de texto (VS Code recomendado)

### 2️⃣ Instalação Inicial

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env
```

### 3️⃣ Rodar Localmente

```bash
# Modo desenvolvimento (hot reload)
npm run dev

# Isso abre:
# - Servidor: http://localhost:3000
# - Cliente:  http://localhost:5173
```

### 📁 Estrutura do Projeto

```
snake-battle/
├── src/
│   ├── server/              # Backend Express + Socket.io
│   │   ├── routes/          # Rotas REST
│   │   ├── websocket/       # Game Server logic
│   │   ├── controllers/      # Lógica de controle
│   │   ├── models/          # Data models
│   │   ├── middleware/      # Middlewares
│   │   ├── types/           # Types TypeScript
│   │   └── server.ts        # Entrypoint
│   │
│   ├── client/              # Frontend Phaser 3
│   │   ├── scenes/          # Cenas do jogo
│   │   ├── objects/         # Classes de game objects
│   │   ├── network/         # Socket.io client
│   │   ├── types/           # Types do cliente
│   │   ├── index.ts         # Entrypoint
│   │   └── config.ts        # Configurações
│   │
│   ├── shared/              # Código compartilhado
│   │   ├── types.ts         # Tipos compartilhados
│   │   ├── constants.ts     # Constantes
│   │   └── config.ts        # Config geral
│   │
│   └── assets/              # Assets do jogo
│       ├── sprites/         # Imagens pixel art
│       ├── sounds/          # Áudio (futura)
│       └── fonts/           # Fontes (futura)
│
├── public/                  # Arquivos estáticos
│   └── index.html          # HTML entry point
│
├── dist/                    # Build output
├── docs/                    # Documentação
│   └── snake-battle.md      # Game design doc completo
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env.example
├── .gitignore
└── README.md
```

## 📦 Arquivos Criados

### Configuração do Projeto

- ✅ `package.json` - Dependências e scripts
- ✅ `tsconfig.json` - Configuração TypeScript
- ✅ `vite.config.ts` - Configuração build tool
- ✅ `.env.example` - Variáveis de ambiente
- ✅ `.gitignore` - Arquivos ignorados no git

### Frontend (Phaser 3)

- ✅ `public/index.html` - HTML entry point
- ✅ `src/client/index.ts` - Game initialization
- ✅ `src/client/config.ts` - Game configs por dificuldade
- ✅ `src/client/network/SocketClient.ts` - Socket.io client
- ✅ `src/client/types/index.ts` - TypeScript types
- 📂 `src/client/scenes/` - Será preenchido na Fase 1
- 📂 `src/client/objects/` - Será preenchido na Fase 1

### Backend (Express + Socket.io)

- ✅ `src/server/server.ts` - Servidor principal
- ✅ `src/server/types/index.ts` - Server types
- 📂 `src/server/routes/` - auth.ts, games.ts, leaderboard.ts (placeholders)
- 📂 `src/server/models/` - User.ts, GameSession.ts, Leaderboard.ts (placeholders)
- 📂 `src/server/websocket/` - GameServer.ts (vazio - Fase 1)
- 📂 `src/server/controllers/` - (vazio - Fase 6)
- 📂 `src/server/middleware/` - (vazio - Fase 6)

### Código Compartilhado

- ✅ `src/shared/types.ts` - Tipos compartilhados (completo)
- ✅ `src/shared/constants.ts` - Constantes do jogo (completo)
- ✅ `src/shared/config.ts` - Configurações gerais

### Assets

- 📂 `src/assets/sprites/` - (vazio - será preenchido com pixel art)
- 📂 `src/assets/sounds/` - (vazio - será preenchido com áudio)
- 📂 `src/assets/fonts/` - (vazio - será preenchido com fontes)

### Documentação

- ✅ `docs/snake-battle.md` - Game design document completo
- ✅ `README.md` - Documentação do projeto
- ✅ `SETUP.md` - Este arquivo

## 🎯 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor + cliente com hot reload
npm run server:dev      # Apenas servidor
npm run client:dev      # Apenas cliente

# Build
npm run build           # Build completo
npm run build:server    # Build servidor
npm run build:client    # Build cliente

# Produção
npm run start           # Inicia servidor de produção

# Code Quality
npm run lint            # Eslint
npm run format          # Prettier
```

## 🐛 Troubleshooting

### Erro: "Port 3000 is already in use"

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Erro: "node_modules not found"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Cannot find module '@shared/types'"

Verifique se o `vite.config.ts` e `tsconfig.json` têm os paths configurados corretamente. Reinicie o dev server.

## 📖 Próximos Passos

### Fase 1: MVP (Semana 1-2)

1. [ ] Implementar MenuScene (Phaser scene)
2. [ ] Implementar GameScene (Phaser scene)
3. [ ] Criar classe Snake
4. [ ] Criar classe Fruit
5. [ ] Implementar sistema de colisões
6. [ ] Implementar controles (WASD + Setas)
7. [ ] Implementar placar e UI básica
8. [ ] Testar multiplayer local

### Fase 2: Poderes (Semana 3)

1. [ ] Criar classe PowerUp
2. [ ] Implementar 3 primeiros poderes
3. [ ] Adicionar efeitos visuais
4. [ ] Adicionar áudio/música
5. [ ] Implementar leaderboard local

## 📚 Documentação

- **Plano Completo:** `docs/snake-battle.md`
- **README Geral:** `README.md`
- **TypeScript Types:** `src/shared/types.ts`
- **Constantes:** `src/shared/constants.ts`

## ✨ Recursos do Projeto

- ✅ **TypeScript Full-Stack:** Mesma linguagem cliente/servidor
- ✅ **Hot Reload:** Vite dev server automático
- ✅ **Monorepo Unificado:** Um único package.json
- ✅ **Path Aliases:** @server, @client, @shared
- ✅ **Socket.io Ready:** Real-time communication setup
- ✅ **Phaser 3:** Game engine moderno
- ✅ **ESLint + Prettier:** Code quality

## 🎮 Status

**Pronto para começar a Fase 1!** ✏️

Todas as dependências estão configuradas e o servidor básico está pronto.

---

**Dúvidas?** Veja `docs/snake-battle.md` ou `README.md`
