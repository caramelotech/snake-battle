# Snake Battle

## 📋 Visão Geral

**Snake Battle** é uma versão moderna e competitiva do clássico jogo da cobrinha. O jogo mistura mecânicas tradicionais (comer frutas para crescer) com um foco em multiplayer local (e futuramente online), onde os jogadores competem não apenas pela pontuação, mas pela sobrevivência e pela dominação do mapa através de poderes especiais.

**Conceito Principal:** Um jogo de estratégia e reflexo onde duas cobras lutam pela sobrevivência em um mapa fechado. O objetivo é comer frutas para crescer, evitar colisões (próprias e do inimigo) e usar poderes especiais para ganhar vantagem tática.

## 🎮 Especificações Principais

### Características Principais (MVP - Fase 1)

- **Multiplayer Local:** 2 jogadores no mesmo dispositivo
- **Controles Independentes:** Cada cobra com seu próprio joystick/teclado
- **Sistema de Frutas:** Collectibles que incrementam tamanho e pontuação
- **Colisão Inteligente:** Cobras não podem se chocar com próprio corpo, do inimigo ou paredes
- **Sistema de Pontuação:** Pontos por frutas comidas
- **Estética Retro:** Visual pixel art 8-bit com cores vibrantes

### Características Futuras

- **Multiplayer Online:** Conexão via rede (websockets/UDP)
- **Sistema de Skins:** Customização visual das cobras
- **Ranking Online:** Placar global de jogadores

## 🕹️ Mecânicas do Jogo

### Core Gameplay

1. **Movimento:** Cada cobra se move continuamente em uma direção (cima, baixo, esquerda, direita)
2. **Crescimento:** Ao comer uma fruta, a cobra cresce um segmento
3. **Pontuação:** +10 pontos por fruta
4. **Colisão Fatal:**
   - Tocar em si mesma = Game Over
   - Tocar no inimigo = Game Over
   - Tocar na parede = Game Over
5. **Frutas:** Spawn aleatório no mapa (não em cima das cobras)

### Mapa

- **Tamanho Base (Fase 1):** 20x20 tiles
- **Bordas:** Paredes delimitadas que causam colisão
- **Zona Segura:** Sem obstáculos na fase inicial

## 🎮 Sistema de Controles

### Multiplayer Local (Fase 1 - MVP)

**2 Jogadores Simultâneos:** Mesmo teclado, controles independentes

| Ação     | Jogador 1 | Jogador 2         |
| -------- | --------- | ----------------- |
| Cima     | W         | Seta ↑            |
| Baixo    | S         | Seta ↓            |
| Esquerda | A         | Seta ←            |
| Direita  | D         | Seta →            |
| Pausa    | P         | P (compartilhada) |

**Características:**

- Detecção contínua de input (não precisa soltar tecla para mudar direção)
- Resposta imediata (0 lag input)
- Prevenção de reverse (cobra não pode se virar 180° e colidir com si mesma no frame seguinte)
- Suporta inputs simultâneos (ambas cobras podem se mover no mesmo frame)

### Suporte Futuro (Fase 5+)

- **Gamepad:** Xbox/PlayStation controller support
- **Mobile:** Touch controls (arrows na tela)
- **Customização:** Remap de controles em configurações

## ⚡ Sistema de Poderes (Power-ups)

### Fase 1 (MVP)

- **Nenhum poder** - Foco na mecânica base

### Fase 2

- **Maçã Escura** (Speed Boost)
  - Aumenta velocidade temporariamente (+50% por 8 segundos)
  - Spawn: 15% de chance ao comer uma fruta normal
- **Estrela** (Invisibilidade Tática)
  - A cobra fica "invisível" para detecção de colisão por 5 segundos
  - Pode cruzar através do inimigo, mas não das paredes
  - Spawn: 10% de chance

### Fase 3

- **Sabre** (Cortar Cobra Inimiga)
  - Remove os últimos 3 segmentos da cobra inimiga
  - Ativação instantânea ao pegar
  - Spawn: 8% de chance

- **Caracol** (Inversão de Controles)
  - Inverte os controles do inimigo por 6 segundos (cima↔baixo, esquerda↔direita)
  - Spawn: 7% de chance

- **Pedra** (Petrificação)
  - Congela a cobra inimiga por 3 segundos
  - Não pode se mover, mas não colide com nada durante este tempo
  - Spawn: 5% de chance (raro)

### Fase 4+

- Novos poderes a serem criados iterativamente baseado em feedback

## 🎯 Níveis de Dificuldade

### Easy (Iniciante)

- **Velocidade Base:** 150ms por movimento
- **Frutas no Mapa:** 3 simultâneas
- **Inimigo IA (se solo):** Movimento aleatório
- **Spawn Rate Frutas:** A cada 2 segundos
- **Duração Poderes:** +20% (mais longos)

### Normal (Padrão)

- **Velocidade Base:** 100ms por movimento
- **Frutas no Mapa:** 2 simultâneas
- **Spawn Rate Frutas:** A cada 3 segundos
- **Duração Poderes:** Padrão

### Hard (Desafiador)

- **Velocidade Base:** 80ms por movimento
- **Frutas no Mapa:** 1 simultânea
- **Obstáculos:** 5-10 blocos estáticos no mapa
- **Spawn Rate Frutas:** A cada 4 segundos
- **Duração Poderes:** -20% (mais curtos)
- **Inimigo IA (se solo):** Movimento inteligente (perseguição)

### Insane (Extremo)

- **Velocidade Base:** 60ms por movimento
- **Frutas no Mapa:** 1 simultânea
- **Obstáculos:** 15-20 blocos estáticos aleatórios
- **Obstáculos Móveis:** 1-2 obstáculos que se movem
- **Duração Poderes:** -30% (muito curtos)
- **Inimigo IA:** Movimento estratégico com lógica de bloqueio

## 🗺️ Obstáculos

### Fase 2 (Introdução)

- **Blocos Estáticos:** Aparecem em modos Hard e acima
- **Padrão:** Grade de 3x3 blocos colocados estrategicamente

### Fase 3 (Complexidade)

- **Blocos Dinâmicos:** Obstáculos que se movem em padrões (horizontal, vertical, espiral)
- **Portais:** Teleportam a cobra para o lado oposto do mapa

### Fase 4+

- **Plataformas Móveis**
- **Gaps (Buracos):** Áreas onde as cobras caem
- **Obstáculos Interativos**

## 📊 Plano de Desenvolvimento

### **Fase 1: MVP - Jogo Base** (Semana 1-2)

**Objetivo:** Criar o jogo funcional com 2 jogadores locais

**Comentário:** Graças ao monorepo TypeScript unificado, toda a setup é mais rápida. Não precisa configurar 2 projetos separados.

#### Tasks

- [ ] Setup do projeto TypeScript monorepo
  - Criar estrutura de pastas (src/server, src/client, src/shared)
  - Configurar tsconfig.json
  - Instalar dependências (Express, Phaser, Socket.io, Vite)
  - Scripts npm (dev, build, start)
- [ ] Criar servidor Express básico com Socket.io
  - Servir arquivos estáticos (HTML do Phaser)
  - Listeners de conexão websocket
- [ ] Criar ClienteSocket para comunicação real-time (futura)
- [ ] Implementar Game Scene (Phaser)
  - Canvas do jogo 640x640
  - Sistema de grid 20x20
  - Renderização inicial
- [ ] Implementar Snake.ts (classe principal)
  - Movimento contínuo em direções
  - Detectar input (WASD para P1, Setas para P2)
  - Renderizar corpo (segmentos)
- [ ] Implementar Fruit.ts
  - Spawn aleatório no mapa
  - Colisão com cobra
  - Crescimento ao ser comido
- [ ] Sistema de colisões
  - Cobra vs corpo próprio
  - Cobra vs cobra inimiga
  - Cobra vs paredes
- [ ] UI básica
  - Placar em tempo real (pontos P1 e P2)
  - Game Over com vencedor
  - Pontos e tamanho da cobra
- [ ] Menu Scene
  - Botão "Iniciar Jogo"
  - Selecionador de Dificuldade (Easy, Normal, Hard)
- [ ] Testes locais e balanceamento
  - Testar controles (input responsivo)
  - Testar colisões (sem falsos positivos)
  - Testar spawn de frutas (distribuição aleatória justa)

#### Entregáveis

- Build funcional do jogo (npm run build && npm run start)
- 2 jogadores simultâneos no mesmo teclado
- 3 níveis de dificuldade (Easy, Normal, Hard) balanceados
- Nenhum bug crítico

### **Fase 2: Poderes e Melhorias Visuais** (Semana 3)

**Objetivo:** Adicionar profundidade tática com poderes

#### Tasks

- [ ] Sistema de poderes base
  - Classe abstrata Power
  - Sistema de spawn aleatório
  - Visual feedback (partículas/animações)
- [ ] Implementar 2 primeiros poderes (Speed Boost, Invisibility)
- [ ] Efeitos visuais (pixel art)
- [ ] Sons e música retro
- [ ] Leaderboard local (top 10 por dificuldade)
- [ ] Refatoração de código se necessário

#### Entregáveis

- Build v0.2 com poderes funcionais
- Assets de áudio básicos

### **Fase 3: Obstáculos e Novos Poderes** (Semana 4)

**Objetivo:** Aumentar replayability e dificuldade

#### Tasks

- [ ] Sistema de geração procedural de obstáculos
- [ ] Blocos estáticos inteligentes (sem bloquear tudo)
- [ ] 3 novos poderes (Sabre, Caracol, Pedra)
- [ ] Modos Hot Seat (turnos) opcional
- [ ] Replay system (salvar partidas)
- [ ] Balanceamento de winrate por dificuldade

#### Entregáveis

- Build v0.3 com obstáculos e 5 poderes totais
- Sistema de replay funcional

### **Fase 4: Sistema de Skins** (Semana 5)

**Objetivo:** Customização visual e progression

#### Tasks

- [ ] Designer de skins (cores, padrões)
- [ ] Sistema de unlocking de skins
  - Achievement-based (ex: ganhar 10 vezes no Hard)
  - Cosmético (não oferece vantagem)
- [ ] Editor de skin in-game
- [ ] Persistência (salvar preferências em localStorage/arquivo)
- [ ] 5-10 skins pré-feitas

#### Entregáveis

- Build v0.4 com sistema de skins
- 10+ skins disponíveis

### **Fase 5: Preparação para Online** (Semana 5-6)

**Objetivo:** Arquitetura de multiplayer online preparada

**Comentário:** Como já estamos usando Socket.io desde o MVP, muita coisa já está pronta. Foco em separar lógica de game state, serialização e testar sincronização.

#### Tasks

- [ ] Implementar GameState.ts (classe centralizada)
  - Posições das cobras
  - Frutas no mapa
  - Poderes ativos
  - Placar
- [ ] Implementar Game State Serialization
  - Serializar estado para envio via Socket.io
  - Deserializar no cliente
- [ ] Implementar reconciliação de estado
  - Cliente mantém cópia do estado
  - Servidor é autoridade
  - Rollback se necessário
- [ ] Criar lobby de matchmaking básico
  - Tela de espera de jogador
  - Designar P1 e P2
- [ ] Testes com latência simulada
  - Usar Chrome DevTools para simular lag
  - Testar sincronização com 100ms+
- [ ] Mock de online multiplayer local
  - Simulação de rede between clients

#### Entregáveis

- Código preparado para produção (nenhuma dependência de localStorage)
- Lógica de game state centralizada
- Sistema de sincronização testado
- Build v0.5 com estrutura pronta para online

### **Fase 6: Multiplayer Online & Deploy** (Semana 7-8)

**Objetivo:** Jogo online em produção

#### Tasks

- [ ] Implementar autenticação com JWT
  - Login/Register
  - Persistir usuário no banco de dados (MongoDB ou PostgreSQL)
- [ ] Implementar leaderboard online
  - Salvar resultados após cada game
  - Endpoints para rank global
  - UI para mostrar top 10
- [ ] Integrar persistência de dados
  - Antes: localStorage (local)
  - Agora: banco de dados no servidor
  - Sincronizar skins desbloqueadas, preferências, stats
- [ ] Setup de deployment
  - Escolher plataforma (Render, Railway, Vercel, AWS)
  - Configurar variáveis de ambiente (.env)
  - Setup de banco de dados online (MongoDB Atlas ou PostGreSQL cloud)
- [ ] Tests online
  - Testar com múltiplos clientes reais
  - Monitorar latência e performance
  - Usar Sentry para error tracking
- [ ] Documentação de deploy
  - README com instruções de setup
  - Guia de contribuição

#### Entregáveis

- Build v1.0 com multiplayer online
- Servidor em produção (Railway, Render, etc)
- Ranking global funcionando
- ~100ms latência máxima de jogo

### **Fase 7+: Expansões Contínuas**

- Novos tipos de poderes
- Modos de jogo alternativos (Battle Royale, 4 players online)
- Mapas customizados
- Tournaments/Seasons
- Mobile version

## 🛠️ Stack Tecnológico Recomendado

### ⭐ Opção Escolhida: Full-Stack TypeScript (Monorepo Único)

**Vantagens dessa abordagem:**

- 🎯 **Um único projeto** - Mesma linguagem (TypeScript) do servidor ao cliente
- ⚡ **Desenvolvimento mais rápido** - Não precisa fazer build frontend separado
- 🔄 **Hot reload** - Alterações refletem instantaneamente
- 📦 **Compartilhamento de código** - Types, interfaces e utilities compartilhadas
- 🚀 **Deploy simplificado** - Tudo é um único app Node.js

**Stack:**

- **Runtime:** Node.js 18+ LTS
- **Linguagem:** TypeScript 5.0+
- **Client Game Engine:** Phaser 3.55+ (rodando no navegador)
- **Server Framework:** Express.js
- **Real-time:** Socket.io (WebSocket)
- **Build Tools:** Vite + esbuild (super rápido)
- **Package Manager:** npm ou yarn

**Dependências Principais:**

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "socket.io": "^4.5.4",
    "socket.io-client": "^4.5.4",
    "phaser": "^3.55.2",
    "dotenv": "^16.0.3",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^4.3.0",
    "@vitejs/plugin-basic-ssl": "^1.0.0",
    "ts-node": "^10.9.0",
    "concurrently": "^8.0.0",
    "nodemon": "^2.0.20",
    "eslint": "^8.40.0",
    "@typescript-eslint/parser": "^5.59.0",
    "prettier": "^2.8.8"
  }
}
```

**Estrutura de Pasta:**

```
snake-battle/
├── src/
│   ├── server/
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── games.ts
│   │   │   └── leaderboard.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── GameSession.ts
│   │   │   └── Leaderboard.ts
│   │   ├── websocket/
│   │   │   └── GameServer.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── controllers/
│   │   │   ├── gameController.ts
│   │   │   └── userController.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── server.ts (entrypoint)
│   ├── client/
│   │   ├── scenes/
│   │   │   ├── MenuScene.ts
│   │   │   ├── GameScene.ts
│   │   │   └── GameOverScene.ts
│   │   ├── objects/
│   │   │   ├── Snake.ts
│   │   │   ├── Fruit.ts
│   │   │   ├── PowerUp.ts
│   │   │   └── Obstacle.ts
│   │   ├── network/
│   │   │   └── SocketClient.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── index.ts (entrypoint)
│   │   └── config.ts
│   ├── shared/
│   │   ├── types.ts (tipos compartilhados)
│   │   ├── config.ts (configurações gerais)
│   │   └── constants.ts
│   └── assets/
│       ├── sprites/
│       ├── sounds/
│       └── fonts/
├── dist/
│   ├── server/ (build do servidor)
│   └── client/ (build do cliente - servido como static)
├── public/
│   └── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

**Setup Inicial:**

```bash
# Criar projeto
mkdir snake-battle && cd snake-battle

# Inicializar npm
npm init -y

# Instalar dependências
npm install express socket.io socket.io-client phaser dotenv cors
npm install -D typescript vite ts-node concurrently nodemon eslint @typescript-eslint/parser prettier @vitejs/plugin-basic-ssl

# Criar estrutura
mkdir -p src/{server,client,shared} dist public

# Criar arquivos TSConfig
npx tsc --init
```

**Scripts npm (package.json):**

```json
{
  "scripts": {
    "dev": "concurrently \"npm run server:dev\" \"npm run client:dev\"",
    "server:dev": "nodemon --exec ts-node src/server/server.ts",
    "client:dev": "vite --host",
    "build": "npm run build:client && npm run build:server",
    "build:server": "tsc src/server --outDir dist/server",
    "build:client": "vite build",
    "start": "node dist/server/server.js",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/**/*.ts"
  }
}
```

**Workflow de Desenvolvimento:**

```bash
# Terminal único (graças ao concurrently)
npm run dev

# Vai rodar:
# - Servidor Express em http://localhost:3000
# - Vite dev server em http://localhost:5173
# - Ambos com hot reload automático ao salvar arquivos
```

**Performance Esperada:**

- FPS: 60 FPS estável (até 4 players locais)
- Latência Online: <100ms (mesmo servidor)
- Bundle Size: ~120KB gzipped (cliente)
- Load Time: <1 segundo em 4G
- Build Time: <2 segundos (incremental)

**Browser Support:**

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Facilidades do Monorepo:**

✅ Compartilhar tipos TypeScript entre cliente e servidor  
✅ Compartilhar constantes e configurações  
✅ Deploy em um único comando  
✅ Mesma base de código para lógica de game  
✅ Debugging simplificado (um projeto Rails/Nest-like)

---

## 📐 Arquitetura de Código (TypeScript Full-Stack)

A arquitetura segue o padrão de separação entre Cliente (Phaser) e Servidor (Express) dentro de um único projeto:

**Server (Node.js/Express):**

- Autoridade do jogo (valida movimentos)
- Gerencia estado do game (posições, frutas, poderes)
- Broadcasting de estado para clientes via Socket.io
- Endpoints REST para autenticação e leaderboard

**Client (Phaser 3):**

- Renderiza o jogo
- Lê input do teclado
- Envia comandos ao servidor (movimento)
- Recebe estado do servidor e renderiza
- Interface de menu, UI, assets

**Shared:**

- Types e interfaces TypeScript (GameState, Snake, Fruit, etc)
- Constantes (velocidades, tamanhos)
- Configurações globais

**Benefício:** Ambos cliente e servidor compartilham as mesmas definições de tipos, evitando bugs de sincronização.

## 🎨 Design de Mapa (Fase 1)

```
████████████████████
█ 🐍               █
█                  █
█        🍎        █
█                  █
█              🐍  █
█                  █
█        ⭐        █
█                  █
████████████████████

Grid: 20x20 tiles
Tile Size: 32x32 pixels
Resolution: 640x640px
```

## 📈 Roadmap Visual

```
MVP        → Poderes   → Obstáculos → Skins      → Online    → Expansões
v0.1          v0.2        v0.3        v0.4        v1.0        v1.x
Semana 1-2  Semana 3   Semana 4    Semana 5    Semana 6-8  Contínuo
```

## 🎯 Métricas de Sucesso (Por Fase)

### Fase 1

- ✅ 2 jogadores jogando localmente sem bugs críticos
- ✅ 3 diferentes níveis de dificuldade
- ✅ Taxa de colisão acurada (0% de falsos negativos)

### Fase 2

- ✅ 5 poderes diferentes funcionais e balanceados
- ✅ Winrate por poder entre 45-55%

### Fase 3

- ✅ Modos Hard/Insane balanceados (não 100% impossível)
- ✅ Sem travamentos ou lag na renderização

### Fase 4

- ✅ Sistema de skins com 10+ opções
- ✅ Unlock progression funcionando

### Fase 6

- ✅ Latência máxima de jogo <200ms
- ✅ 100+ usuários concurrent online
- ✅ Uptime de 99%

## 🐛 Risks & Mitigação

| Risk                                 | Impacto | Mitigação                             |
| ------------------------------------ | ------- | ------------------------------------- |
| Latência online quebra o jogo        | Alto    | Input prediction + server authority   |
| Poder desequilibrado quebra diversão | Médio   | Testes extensivos, community feedback |
| Geração procedural de mapa ruim      | Médio   | Hand-crafted mapas + geração tunada   |
| Código sem escalabilidade            | Alto    | Refatoração antes de online           |
| Perda de interesse                   | Médio   | Novo conteúdo regular pós-launch      |

## 📝 Notas de Desenvolvimento

- **Prioridade:** MVP primeiro, tudo mais é adicional
- **Testing:** Jogar localmente em cada fase
- **Feedback:** Beta testers amigos antes de fase 6
- **Iteração:** Estar aberto a cortar features que não funcionem
- **Performance:** 60 FPS mínimo mesmo em 4 players online
- **Accessibility:** Suportar diferentes layouts de teclado

## 🚀 Como Começar

1. **Semana 1:** Setup projeto + mechanics base
2. **Semana 2:** Finalizar MVP, testar em amigos
3. **Semana 3+:** Iterar baseado em feedback

**Status Atual:** Pre-development ✏️
