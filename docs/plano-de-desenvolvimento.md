# Plano de Fases de Desenvolvimento

## Objetivo

Este documento organiza o desenvolvimento do **Snake Battle** em fases praticas de execucao, separando com clareza as responsabilidades de **design** e **dev**.

Ele complementa o roadmap ja descrito em [snake-battle.md](./snake-battle.md), mas com foco em:

- ordem de implementacao
- entregaveis por fase
- divisao de trabalho entre as frentes
- criterio de conclusao antes de avancar
- checkpoints de portfolio

## Contexto do Projeto

Snake Battle e um projeto de portfolio desenvolvido por amigos nas horas livres - fins de semana e apos o expediente. Nao ha pressao comercial nem deadline fixo. O plano foi desenhado para ser **leve e progressivo**: cada fase termina com algo jogavel e apresentavel, independente de o projeto continuar ou nao.

## Principios de Trabalho

- Primeiro deixar o jogo **jogavel**, depois expandir.
- Evitar construir sistemas online antes do loop local estar estavel.
- Design define experiencia, clareza visual e leitura do jogo.
- Dev define arquitetura, implementacao, testes e estabilidade.
- Toda fase deve terminar com uma rodada de playtest e ajustes.
- O projeto deve parecer **completo e apresentavel** em qualquer checkpoint de portfolio.

## Frentes de Responsabilidade

### Design

- direcao visual e estetica
- UX de menus e HUD
- leitura do tabuleiro e feedback de jogo
- conceitos de poderes, obstaculos e progressao
- balanceamento e sensacao de jogo
- audio, VFX e consistencia estetica
- identidade de skins e cosmeticos

### Dev

- arquitetura do cliente e servidor
- implementacao de gameplay
- integracao Phaser, Vite, Express e Socket.io
- estrutura de dados, tipos e serializacao
- performance, build, testes e debug
- persistencia, online e deploy

## Visao Geral das Fases

| Fase | Nome                       | Objetivo principal                            | Portfolio    |
| ---- | -------------------------- | --------------------------------------------- | ------------ |
| 0    | Fundacao e Single Player   | Base tecnica + cobra solo jogavel             | Checkpoint   |
| 1    | Multiplayer Local          | Duelo 2 jogadores com dificuldades            | Checkpoint   |
| 2    | Poderes Set 1 e Polish     | Profundidade tatica e visual completo         | Principal    |
| 3    | Poderes Set 2 e Obstaculos | Variedade e profundidade maxima de gameplay   | Checkpoint   |
| 4    | Online, Skins e Ranking    | Multiplayer em rede, cosmeticos e leaderboard | Opcional     |
| 5    | Pos-lancamento             | Evolucao com base em uso real                 | Se publicado |

---

## Fase 0: Fundacao e Single Player

**Objetivo:** transformar o scaffold atual em uma base confiavel e entregar uma cobra solo jogavel com a identidade visual do projeto.

> **Checkpoint de portfolio:** o projeto existe, sobe, tem visual proprio e e jogavel. Suficiente para apresentar como "trabalho em andamento" ou demonstracao de dominio de Phaser + TypeScript.

### Design

- Validar a fantasia central do jogo: reflexo, ritmo e tensao crescente.
- Fechar identidade visual inicial:
  - paleta de cores
  - estilo da cobra e do grid
  - referencias de HUD e menu
- Wireframe de tres telas:
  - menu inicial (com opcao de modo solo visivel)
  - HUD da partida (pontuacao, pausa)
  - tela de game over / resultado
- Definir look da cobra no modo solo (animacao de crescimento, morte).

### Dev

- Confirmar que build de producao e servidor de dev funcionam corretamente.
- Criar e conectar as scenes do Phaser: `MenuScene`, `GameScene`, `GameOverScene`.
- Implementar `Snake` com:
  - movimento em grid baseado em tick
  - fila de direcao (impede reversao instantanea)
  - crescimento ao comer fruta
- Implementar `Fruit` com spawn valido (fora do corpo da cobra).
- Implementar colisao: parede e corpo proprio.
- Implementar placar em tempo real.
- Implementar fluxo completo: menu -> partida -> game over -> reinicio.
- Padronizar tipos em `src/shared/types.ts` e constantes em `src/shared/constants.ts`.
- Configurar lint e format funcionando no repositorio.

### Entregaveis

- cobra solo jogavel do inicio ao fim
- fruta, crescimento, colisao e pontuacao funcionando
- menu e game over com identidade visual aplicada
- build de producao fecha sem erro

### Criterio para avancar

- qualquer pessoa consegue abrir e jogar sem instrucao tecnica
- nenhum bug critico de input, colisao ou travamento
- a base tecnica suporta adicionar um segundo jogador sem reescrever o loop principal

---

## Fase 1: Multiplayer Local e Sistema de Dificuldades

**Objetivo:** entregar o duelo local de 2 jogadores completo, com dificuldades que mudam o ritmo da partida de forma tangivel.

> **Checkpoint de portfolio:** o jogo tem identidade clara - duelo local, controles independentes, quatro dificuldades. Apresentavel como portfolio de jogo funcional.

### Design

- Definir como cada jogador e identificado visualmente (cor, lado do HUD, identificador).
- Especificar feedback de colisao cobra x cobra.
- Revisar HUD para exibir dois jogadores simultaneamente.
- Definir tela de selecao de modo (solo / 2 jogadores).
- Definir variacoes por dificuldade (ritmo, tensao, densidade de frutas).
- Revisar duracao media esperada de cada partida por dificuldade.

### Dev

- Adicionar modo de 2 jogadores no mesmo teclado:
  - Player 1: WASD
  - Player 2: setas
- Implementar colisao cobra x cobra.
- Implementar seletor de modo de jogo (1P / 2P).
- Implementar seletor de dificuldade com quatro niveis: Easy, Normal, Hard, Insane.
- Conectar dificuldade aos parametros reais: velocidade, frutas simultaneas, spawn rate.
- Implementar pausa compartilhada (tecla P).
- Adicionar countdown de inicio e restart limpo.
- Criar utilitarios de debug para colisao, spawn e velocidade.

### Parametros de dificuldade (referencia de `constants.ts`)

| Dificuldade | Tick (ms) | Frutas simultaneas | Obstaculos      |
| ----------- | --------- | ------------------ | --------------- |
| Easy        | 150       | 3                  | nenhum          |
| Normal      | 100       | 2                  | nenhum          |
| Hard        | 80        | 1                  | Fase 3 (5-10)   |
| Insane      | 60        | 1                  | Fase 3 (15-20+) |

> Obstaculos em Hard e Insane serao adicionados na Fase 3. Por enquanto, mapas limpos.

### Entregaveis

- partida local 2 jogadores do menu ao reinicio
- quatro dificuldades com parametros reais distintos
- selecao de modo e dificuldade funcional

### Criterio para avancar

- partida local e divertida e legivel
- dificuldades tem sensacao claramente diferente
- a base de codigo suporta adicionar power-ups sem reescrever o loop

---

## Fase 2: Poderes Set 1 e Polish Visual

**Objetivo:** adicionar profundidade tatica com os primeiros tres poderes e completar o visual do jogo para nivel apresentavel.

> **Checkpoint de portfolio principal:** o jogo esta completo como experiencia local. Design proprio, controles solidos, dificuldades funcionais e poderes que criam decisoes taticas. Ponto de parada confortavel se o projeto nao avancar mais.

### Poderes desta fase

Todos ja modelados em `src/shared/types.ts` (`PowerUpType`) e `src/shared/constants.ts`:

| Power-up             | Tipo             | Descricao                                            | Duracao padrao |
| -------------------- | ---------------- | ---------------------------------------------------- | -------------- |
| Maca Escura          | `SPEED_BOOST`    | Aumenta velocidade propria +50%                      | 8s             |
| Estrela              | `INVISIBILITY`   | Cobra atravessa o inimigo (nao as paredes)           | 5s             |
| Acelerador Invertido | `SPEED_REVERSAL` | Propria cobra -50%, inimigo +50% - poder estrategico | 8s             |

### Design

- Definir identidade visual de cada poder: icone, cor, leitura em campo.
- Especificar feedback audiovisual de coleta, ativacao e termino de efeito.
- Revisar balanceamento inicial: duracao por dificuldade (modificadores ja em `constants.ts`).
- Definir tratamento visual dos estados de poder no HUD (icone + tempo restante).
- Revisar e finalizar todas as telas: menu, HUD, game over, selecao de dificuldade.

### Dev

- Criar sistema base de power-ups (`PowerUp` class no cliente).
- Implementar os tres poderes: `SPEED_BOOST`, `INVISIBILITY`, `SPEED_REVERSAL`.
- Implementar spawn de power-up ao comer fruta (15% de chance, conforme `constants.ts`).
- Implementar duracao, efeitos temporarios e remocao automatica.
- Aplicar modificadores de duracao por dificuldade (`POWER_UP_DURATION_MODIFIERS` em `constants.ts`).
- Exibir estados ativos no HUD.
- Adicionar feedback visual de ativacao e termino.
- Refinar visual geral: animacoes, transicoes de cena, consistencia estetica.

### Entregaveis

- tres poderes funcionais, visuais e legíveis em partida
- HUD mostrando estados ativos de poder
- jogo visualmente refinado e consistente

### Criterio para avancar

- os poderes adicionam decisao real, nao apenas caos
- jogadores entendem o efeito sem consultar documentacao
- winrate por poder entre 45-55% em sessoes de teste

---

## Fase 3: Poderes Set 2 e Obstaculos

**Objetivo:** completar a profundidade de gameplay com os tres poderes avancados e adicionar obstaculos nas dificuldades mais altas.

> **Checkpoint de portfolio:** feature set de gameplay completo. Seis poderes, quatro dificuldades com dinamicas distintas, obstaculos em Hard e Insane.

### Poderes desta fase

Todos ja modelados em `src/shared/types.ts` e `src/shared/constants.ts`:

| Power-up | Tipo              | Descricao                                              | Duracao padrao |
| -------- | ----------------- | ------------------------------------------------------ | -------------- |
| Sabre    | `SLICE`           | Remove os 3 ultimos segmentos do inimigo - instantaneo | instantaneo    |
| Caracol  | `INVERT_CONTROLS` | Inverte os controles do inimigo (cima/baixo, esq/dir)  | 6s             |
| Pedra    | `PETRIFY`         | Congela o inimigo (sem colisao durante o freeze)       | 3s             |

### Design

- Definir identidade visual dos tres novos poderes (icone, cor, leitura em campo).
- Especificar feedback de cada poder - especialmente Sabre (instantaneo) e Pedra (afeta colisao).
- Definir visual de obstaculos estaticos: distincao clara de parede e cobra.
- Definir layouts de obstaculos para Hard e Insane:
  - Hard: 5-10 blocos estaticos posicionados estrategicamente
  - Insane: 15-20 blocos estaticos + 1-2 obstaculos moveis
- Revisar balanceamento de Hard e Insane com obstaculos.

### Dev

- Implementar os tres poderes: `SLICE`, `INVERT_CONTROLS`, `PETRIFY`.
- Implementar sistema de obstaculos estaticos:
  - geracao de layout garantindo que spawn de cobra e fruta nunca ocorra sobre obstaculos
  - integracao com o sistema de colisao existente
- Implementar obstaculos moveis em Insane (movimento simples: horizontal ou vertical).
- Ativar obstaculos conforme `OBSTACLE_COUNTS` e `MOVING_OBSTACLE_COUNTS` em `constants.ts`.
- Ajustar balanceamento geral de Hard e Insane.

### Entregaveis

- seis poderes totais funcionais
- obstaculos estaticos em Hard e Insane
- obstaculos moveis no modo Insane
- Hard e Insane sao desafiadores mas nao injustos

### Criterio para avancar

- obstaculos aumentam desafio sem criar estados impossiveis
- partidas nao terminam por layout ruim ou spawn injusto
- nenhum travamento ou comportamento inesperado de colisao com obstaculos

---

## Fase 4: Online, Skins e Ranking

**Objetivo:** adicionar multiplayer em rede, customizacao de cobras e leaderboard online.

> **Nota:** esta e a fase mais complexa e **opcional** para um projeto de fins de semana. So deve comecar se o grupo tiver energia e disponibilidade. O jogo ja esta completo e apresentavel ao final da Fase 3.
>
> Sugestao: dividir em sub-etapas independentes - skins primeiro (mais simples e isolado), depois online, depois ranking e deploy.

> **Checkpoint de portfolio:** se concluida, o projeto e um produto completo com multiplayer online, customizacao visual e placar global.

### Sub-etapa A: Skins

#### Design

- Definir biblioteca inicial de skins (minimo 10 opcoes): variacoes de cor, padrao ou estilo.
- Definir tela de selecao de skin integrada ao fluxo de jogo.
- Definir sistema de desbloqueio (sugestao: baseado em partidas jogadas ou score acumulado).

#### Dev

- Criar sistema de skins no cliente (selecao, aplicacao, renderizacao).
- Persistir selecao localmente (localStorage).
- Implementar logica de desbloqueio.

### Sub-etapa B: Online

#### Design

- Definir fluxo de lobby: criar sala, entrar com codigo, aguardar segundo jogador.
- Projetar estados de conexao: conectando, aguardando, reconectando, desconectado.
- Definir expectativas de UX para latencia e erros de rede.

#### Dev

- Criar `GameState` centralizado e serializavel (estado autoritativo no servidor).
- Separar estado de simulacao da renderizacao (cliente como apresentador do estado).
- Implementar protocolo de eventos via Socket.io: input do jogador, atualizacao de estado.
- Implementar lobby com criacao de sala e codigo de entrada.
- Testar com latencia artificial (100-200ms).

### Sub-etapa C: Auth, Ranking e Deploy

#### Design

- Definir fluxo de login (sugestao: usuario + senha simples ou anonimo com nickname).
- Definir tela de leaderboard: top jogadores, melhor pontuacao, partidas jogadas.
- Fechar identidade visual de release: screenshots, README atualizado.

#### Dev

- Implementar autenticacao basica (JWT ou sessao simples).
- Integrar persistencia de resultados e ranking (banco simples ou JSON para comecar).
- Implementar leaderboard na interface.
- Configurar variaveis de ambiente e deploy (Railway, Fly.io ou similar).

### Entregaveis

- sistema de skins com 10+ opcoes e desbloqueio
- partidas online entre dois jogadores em redes diferentes
- leaderboard global funcional
- deploy acessivel publicamente

### Criterio para avancar

- partidas online ocorrem com latencia maxima de 200ms
- fluxo de skins funciona do inicio ao fim
- deploy estavel para beta aberto

---

## Fase 5: Pos-lancamento

**Objetivo:** evoluir o jogo com base em uso real e feedback de jogadores.

> Esta fase so existe se o projeto chegou na Fase 4 e foi publicado. Nao e planejavel com antecedencia.

### Design

- analisar feedback: o que esta confuso, o que esta entediante
- propor novos poderes, skins e modos de jogo
- revisar onboarding: o jogo e autoexplicativo sem instrucao?

### Dev

- corrigir bugs criticos e gargalos de performance
- adicionar telemetria minima (eventos de game over, poderes mais usados)
- iterar em conteudo e qualidade de vida
- explorar obstaculos dinamicos ou portais se fizer sentido

### Entregaveis

- backlog priorizado por impacto real
- versoes incrementais com melhoria continua

---

## Checkpoints de Portfolio

O projeto foi desenhado para ser apresentavel em qualquer uma das seguintes paradas:

| Fase concluida | O que o portfolio demonstra                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------- |
| **Fase 0**     | Jogo solo funcional com design proprio. "Construi um jogo com Phaser 3 e TypeScript."           |
| **Fase 1**     | Duelo local com quatro dificuldades. "Jogo multiplayer local com input handling e dificuldade." |
| **Fase 2**     | Jogo polido com poderes taticos. "Snake Battle completo com poderes e gameplay balanceado."     |
| **Fase 3**     | Feature set maxima offline. "Seis poderes, quatro dificuldades, obstaculos - projeto fechado."  |
| **Fase 4**     | Produto publicado. "Snake Battle com multiplayer online, skins, ranking e deploy."              |

**Regra pratica:** nunca pare no meio de uma fase. Conclua o criterio de avanco antes de comecar a proxima.

---

## Dependencias Entre Design e Dev

- Design precisa fechar wireframes e identidade visual antes do polish de UI (Fases 0-1).
- Dev precisa entregar o loop local estavel antes de balanceamento serio de poderes (Fase 1 antes da Fase 2).
- Cada poder deve ser especificado em design (icone, leitura, balanceamento) antes de ser implementado.
- Obstaculos precisam de layouts aprovados em design antes de geracao em dev.
- Online so deve comecar depois que o jogo local na Fase 3 estiver confiavel.
- Skins sao independentes do estado de jogo e podem ser desenvolvidas em paralelo na Fase 4.

---

## Sugestao de Ritmo para Fins de Semana

**Inicio de fase (primeiro encontro ou sessao sincrona):**

- alinhar o que vai ser feito (escopo da fase)
- dividir quem faz o que
- combinar criterio de pronto

**Durante a fase (sessoes individuais ou assincronas):**

- commits pequenos e frequentes
- abrir PR mesmo que incompleto para visibilidade
- perguntas no grupo ao inves de travar sozinho

**Fim de fase (sessao de playtest):**

- jogar junto e anotar o que incomoda
- congelar escopo (nao adicionar coisas novas)
- corrigir bugs criticos e documentar decisoes tomadas
- confirmar se o criterio de avanco foi atingido antes de comecar a proxima fase

**Estimativa de duracao por fase:**

| Fase   | Complexidade | Estimativa (fins de semana de 4-6h) |
| ------ | ------------ | ----------------------------------- |
| Fase 0 | Baixa        | 2-3 fins de semana                  |
| Fase 1 | Media        | 2-3 fins de semana                  |
| Fase 2 | Media-alta   | 3-4 fins de semana                  |
| Fase 3 | Alta         | 3-4 fins de semana                  |
| Fase 4 | Muito alta   | 6-10 fins de semana ou mais         |

---

## Proxima Prioridade Recomendada

Pelo estado atual do repositorio (scaffold pronto, scenes e objects vazios), o foco ideal agora e:

1. **Concluir a Fase 0** - cobra solo jogavel com visual aplicado
2. **Entrar na Fase 1** - adicionar o segundo jogador e as dificuldades

Isso significa priorizar agora:

- `MenuScene`, `GameScene`, `GameOverScene` no Phaser
- `Snake` e `Fruit` como objetos de jogo
- loop de tick, colisao e pontuacao
- seletor de modo e dificuldade

Antes de poderes, obstaculos e online.
