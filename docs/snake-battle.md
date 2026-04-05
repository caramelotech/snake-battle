# Snake Battle 🐍

## 📋 Visão Geral

**Snake Battle** é uma versão moderna e competitiva do clássico jogo da cobrinha. O jogo mistura mecânicas tradicionais (comer frutas para crescer) com um foco em multiplayer local e online, onde os jogadores competem não apenas pela pontuação, mas pela sobrevivência e pela dominação do mapa através de poderes especiais.

**Conceito Principal:** Um jogo de estratégia e reflexo onde duas cobras lutam pela sobrevivência em um mapa fechado. O objetivo é comer frutas para crescer, evitar colisões (próprias e do inimigo) e usar poderes especiais para ganhar vantagem tática.

## 🎮 Especificações Principais

### Características Principais (MVP - Fase 0)

- **Local:** 1 jogador, jogo da cobrinha tradicinal, mas com o design novo
- **Sistema de Frutas:** Collectibles que incrementam tamanho e pontuação
- **Colisão Inteligente:** Cobras não podem se chocar com próprio corpo ou em paredes
- **Sistema de Pontuação:** Pontos por frutas que aumentam o seu tamanho
- **Estética Retro:** Visual pixel art 8-bit com cores vibrantes

### Características Principais (MVP - Fase 1)

- **Multiplayer Local:** pode ser escolhido jogo solo ou 2 jogadores no mesmo dispositivo
- **Controles Independentes:** Cada cobra com seu próprio joystick/teclado
- **Sistema de Frutas:** Collectibles que incrementam tamanho e pontuação
- **Colisão Inteligente:** Cobras não podem se chocar com próprio corpo, do inimigo ou paredes
- **Sistema de Pontuação:** Pontos por frutas que aumentam o seu tamanho

### Características Principais (Fase 2)

- **Multiplayer Local:** 2 jogadores no mesmo dispositivo
- **Controles Independentes:** Cada cobra com seu próprio joystick/teclado
- **Sistema de Frutas:** Collectibles que incrementam tamanho e pontuação,
  além disso cada fruta tem carecteristicas especiais, que podem gerar vantagens no jogo.
- **Colisão Inteligente:** Cobras não podem se chocar com próprio corpo, do inimigo ou paredes
- **Sistema de niveis:** Jogo em loop ou em quantidade de partidas setadas inicialmente,
  que geram mapas diferentes e incremeta dificuldades

### Características Principais (Fase 3)

- **Multiplayer Online:** Os dois outros modos de jogo permanecem, sendo eles solo ou local 2 jogadores,
  mas agora com possibilidade de conexão via rede (websockets/UDP) para multiplos jogadores
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
   5.1. Cada fruta tem um poder especial, gerando efeitos positivos para quem consome

### Mapa

- **Tamanho Base (Fase 1):** 40x40 tiles
- **Bordas:** Paredes delimitadas que causam colisão
- **Zona Segura:** Sem obstáculos na fase inicial

## 🎮 Sistema de Controles

### Multiplayer Local

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

## ⚡ Sistema de Poderes (Power-ups)

### Fase 0 e 1 (MVP)

- **Nenhum poder** - Foco na mecânica base

### Fase 2

- **Maçã Escura** (Speed Boost)
  - Aumenta velocidade temporariamente (+50% por 8 segundos)
  - Spawn: 15% de chance ao comer uma fruta normal
- **Estrela** (Invisibilidade Tática)

  - A cobra fica "invisível" para detecção de colisão por 5 segundos
  - Pode cruzar através do inimigo, mas não das paredes
  - Spawn: 10% de chance

- **Acelerador Invertido** (Speed Reversal)
  - Você fica 2x mais lento (-50% velocidade) por 8 segundos
  - Seu inimigo fica 1.5x mais rápido (+50% velocidade) pelo mesmo tempo
  - Spawn: 12% de chance (estratégico)

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

### Insane (Extremo)

- **Velocidade Base:** 60ms por movimento
- **Frutas no Mapa:** 1 simultânea
- **Obstáculos:** 15-20 blocos estáticos aleatórios
- **Obstáculos Móveis:** 1-2 obstáculos que se movem
- **Duração Poderes:** -30% (muito curtos)

## 🗺️ Obstáculos

### Fase 3 (Introdução)

- **Blocos Estáticos:** Aparecem em modos Hard e acima
- **Padrão:** Grade de 3x3 blocos colocados estrategicamente

### Fase 4 (Complexidade)

- **Blocos Dinâmicos:** Obstáculos que se movem em padrões (horizontal, vertical, espiral)
- **Portais:** Teleportam a cobra para o lado oposto do mapa

### Fase 5+

- **Plataformas Móveis**
- **Gaps (Buracos):** Áreas onde as cobras caem
- **Obstáculos Interativos**

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

## 🎯 Métricas de Sucesso (Por Fase)

### Fase 0 e 1

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
