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

#### Tasks

- [ ] Setup do projeto (escolher engine/engine)
  - Opções: Godot, Phaser, Pygame, Canvas HTML5, Unreal Engine
  - Recomendação: **Godot** (gratuito, 2D, multiplayer built-in) ou **Phaser** (web-based)
- [ ] Sistema de movimento e colisão
- [ ] Mecânica de crescimento da cobra
- [ ] Sistema de frutas e spawn
- [ ] Controles do Jogador 1 (WASD ou Setas)
- [ ] Controles do Jogador 2 (IJKL ou Gamepad 2)
- [ ] UI básica (placar, vidas, game over)
- [ ] Menu principal (Start, Selecionar Dificuldade)
- [ ] Testes locais e balanceamento inicial

#### Entregáveis

- Executável/WebGL do jogo funcional
- Suporta Easy, Normal, Hard modos
- 2 jogadores simultâneos

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

### **Fase 5: Preparação para Online** (Semana 6)

**Objetivo:** Arquitetura multi-player online

#### Tasks

- [ ] Refatoração do código para separar lógica de rede e gameplay
- [ ] Implementar Game State Serialization
- [ ] Escolher stack online (WebSocket + Node.js / ou WebRTC / ou Photon)
- [ ] Criar servidor básico de matchmaking
- [ ] Testes de latência e sincronização
- [ ] Mock de online multiplayer local

#### Entregáveis

- Arquitetura escalável de rede
- Servidor de teste funcionando
- Build v0.5 com estrutura de multi-player

### **Fase 6: Multiplayer Online** (Semana 7-8)

**Objetivo:** Jogo online funcional

#### Tasks

- [ ] Implementar conexão ao servidor
- [ ] Sincronização de estado entre clientes
- [ ] Lag compensation e rollback
- [ ] Lobby e matchmaking
- [ ] Chat integrado
- [ ] Stats online (winrate, ranking)

#### Entregáveis

- Build v1.0 com multiplayer online
- Servidor dedicado (cloud deployment)
- Ranking global

### **Fase 7+: Expansões Contínuas**

- Novos tipos de poderes
- Modos de jogo alternativos (Battle Royale, 4 players online)
- Mapas customizados
- Tournaments/Seasons
- Mobile version

## 🛠️ Stack Tecnológico Recomendado

### ⭐ Opção Escolhida: Web-based (Phaser 3 + Node.js)

**Frontend:**

- **Engine:** Phaser 3.55+ (framework 2D HTML5)
- **Linguagem:** JavaScript/TypeScript
- **Build Tool:** Webpack ou Vite
- **Package Manager:** npm ou yarn

**Backend:**

- **Runtime:** Node.js 18+ LTS
- **Framework:** Express.js
- **Real-time:** Socket.io (WebSocket wrapper)
- **Database:** MongoDB (NoSQL) ou PostgreSQL (SQL)
- **Authentication:** JWT (JSON Web Tokens)
- **Hosting:** Vercel (frontend), Railway/Render (backend)

**Ferramentas de Desenvolvimento:**

- **Editor:** VS Code + Phaser Extension
- **Debug:** Chrome DevTools + Phaser Inspector
- **Version Control:** Git + GitHub
- **Testing:** Jest (unit tests) + Cypress (E2E)
- **Linting:** ESLint + Prettier
- **Monitoring:** Sentry (error tracking)

**Dependências Principais (Backend):**

```json
{
  "express": "^4.18.2",
  "socket.io": "^4.5.4",
  "mongoose": "^7.0.0",
  "jsonwebtoken": "^9.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "nodemon": "^2.0.20"
}
```

**Dependências Principais (Frontend):**

```json
{
  "phaser": "^3.55.2",
  "socket.io-client": "^4.5.4",
  "axios": "^1.3.0",
  "webpack": "^5.75.0",
  "webpack-cli": "^5.0.0",
  "webpack-dev-server": "^4.11.1"
}
```

**Estrutura de Pasta Recomendada:**

```
snake-battle/
├── frontend/
│   ├── src/
│   │   ├── scenes/
│   │   │   ├── MenuScene.js
│   │   │   ├── GameScene.js
│   │   │   └── GameOverScene.js
│   │   ├── objects/
│   │   │   ├── Snake.js
│   │   │   ├── Fruit.js
│   │   │   ├── PowerUp.js
│   │   │   └── Obstacle.js
│   │   ├── network/
│   │   │   └── SocketClient.js
│   │   ├── index.js
│   │   └── config.js
│   ├── assets/
│   │   ├── sprites/
│   │   ├── sounds/
│   │   └── fonts/
│   ├── webpack.config.js
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── games.js
│   │   │   └── leaderboard.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── GameSession.js
│   │   │   └── Leaderboard.js
│   │   ├── websocket/
│   │   │   └── GameServer.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── controllers/
│   │   │   ├── gameController.js
│   │   │   └── userController.js
│   │   └── server.js
│   ├── tests/
│   ├── .env.example
│   └── package.json
└── README.md
```

**Setup Inicial:**

```bash
# Criar diretórios
mkdir snake-battle && cd snake-battle

# Frontend
mkdir frontend && cd frontend
npm init -y
npm install phaser socket.io-client axios
npm install --save-dev webpack webpack-cli webpack-dev-server

# Backend (outro terminal)
mkdir backend && cd backend
npm init -y
npm install express socket.io mongoose jsonwebtoken cors dotenv
npm install --save-dev nodemon

# Iniciar desenvolvimento
# Terminal 1 (frontend): npm run dev
# Terminal 2 (backend): npm run start
```

**Performance Esperada:**

- FPS: 60 FPS estável (até 4 players)
- Latência Online: <100ms (mesmo servidor)
- Bundle Size: ~150KB gzipped (frontend)
- Load Time: <2 segundos em 4G

**Browser Support:**

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

### Opção 1: Godot (Alternativa - Prototipar Rápido)

- **Engine:** Godot 4.x
- **Linguagem:** GDScript ou C#
- **Multiplayer:** Godot's MultiplayerAPI built-in
- **Deploy:** HTML5 Web Export, Windows/Mac/Linux
- **Backend:** Node.js/Go para servidor
- **Database:** PostgreSQL (ranking online)

### Opção 3: Unity (Alternativa - AAA Quality)

- **Engine:** Unity 2D
- **Multiplayer:** Mirror ou Netcode for GameObjects
- **Backend:** PlayFab ou Custom
- **Deploy:** WebGL, Windows, Mac, Linux

## 📐 Arquitetura de Código (Proposto)

```
project/
├── scripts/
│   ├── game/
│   │   ├── Game.gd (Controller principal)
│   │   ├── Snake.gd (Lógica de cobra)
│   │   └── Grid.gd (Mapa e colisões)
│   ├── ui/
│   │   ├── Menu.gd
│   │   ├── HUD.gd
│   │   └── GameOver.gd
│   ├── gameplay/
│   │   ├── Fruit.gd
│   │   ├── PowerUp.gd
│   │   └── Obstacle.gd
│   ├── network/ (Futuro)
│   │   ├── Server.js
│   │   ├── Client.gd
│   │   └── GameState.gd
│   └── utilities/
│       ├── Config.gd
│       └── Utils.gd
├── assets/
│   ├── sprites/
│   ├── sounds/
│   └── fonts/
└── scenes/ (Godot) ou .html (Web)
```

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
