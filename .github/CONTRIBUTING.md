# 🤝 Guia de Contribuição - Snake Battle

Obrigado por considerar contribuir com Snake Battle! Este guia vai ajudá-lo a entender nosso processo de desenvolvimento e como contribuir melhor.

## 📋 Índice

1. [Código de Conduta](#código-de-conduta)
2. [Como Contribuir](#como-contribuir)
3. [Processo de Desenvolvimento](#processo-de-desenvolvimento)
4. [Padrões de Código](#padrões-de-código)
5. [Commits e PRs](#commits-e-prs)
6. [Setup Local](#setup-local)
7. [Dúvidas?](#dúvidas)

## 🤗 Código de Conduta

Esperamos que todos os contribuidores:

- Sejam respeitosos e inclusivos
- Aceitem críticas construtivas
- Focam no que é melhor para a comunidade
- Mostrem empatia com outros colaboradores

Comportamento abusivo, assédio ou discriminação **não será tolerado**.

## 🚀 Como Contribuir

### Reportar Bugs

Antes de criar um relatório de bug, verifique se o problema já foi reportado. Se encontrou um novo bug:

1. **Use um título claro e descritivo**
2. **Descreva os passos exatos** para reproduzir o problema
3. **Forneça exemplos específicos** para demonstrar os passos
4. **Descreva o comportamento observado** e o que esperava
5. **Inclua screenshots** se relevante
6. **Mencione seu SO e versão do Node.js**

### Sugerir Melhorias

Sugestões de melhorias são sempre bem-vindas! Para sugerir uma melhoria:

1. **Use um título claro e descritivo**
2. **Forneça uma descrição passo-a-passo** da melhoria sugerida
3. **Cite exemplos** onde essa melhoria seria útil
4. **Liste algumas alternativas** que você considerou

### Enviando PRs

1. Fork o repositório e crie sua branch a partir de `main`
2. Garanta que seu código segue o style guide (`npm run lint`)
5. Envie seu Pull Request com um bom título e descrição

## 📍 Processo de Desenvolvimento

### Estrutura de Branches

```
main                 # Branch principal (prod-ready)
├── feature/nome     # Novas features
├── fix/nome         # Correções de bugs
├── docs/nome        # Documentação
└── refactor/nome    # Refatorações
```

### Workflow

1. **Crie uma issue** descrevendo o que vai fazer (ou comente em uma existente)
2. **Crie uma branch** com padrão: `tipo/descricao-curta`
3. **Faça commits atômicos** com mensagens claras
4. **Mantenha atualizado** com `main` (rebase quando necessário)
5. **Envie PR** quando terminar
6. **Responda a reviews** e faça ajustes
7. **Merge** quando aprovado

### Exemplo de Workflow

```bash
# Clone e setup
git clone https://github.com/seu-usuario/joguinho-o-retorno.git
cd joguinho-o-retorno
npm install

# Crie sua branch
git checkout -b feature/implementar-menu-scene

# Faça suas mudanças
npm run dev        # Desenvolvimento
npm run lint       # Verificar estilo

# Commit com mensagem clara
git commit -m "feat: implementar menu scene com seleção de dificuldade"

# Push e crie PR
git push origin feature/implementar-menu-scene
```

## 📐 Padrões de Código

### TypeScript

- ✅ Use tipos explícitos (evite `any`)
- ✅ Use interfaces para contracts públicos
- ✅ Documente tipos complexos com comentários
- ✅ Use const para valores imutáveis

```typescript
// ✅ Bom
interface Player {
  id: string;
  name: string;
  score: number;
}

function createPlayer(name: string): Player {
  return { id: generateId(), name, score: 0 };
}

// ❌ Ruim
function createPlayer(name) {
  return { id: generateId(), name, score: 0 };
}
```

### Nomeação

- **Classes**: PascalCase (`MenuScene`, `SnakeObject`)
- **Funções**: camelCase (`handleInput`, `calculateCollision`)
- **Constantes**: UPPER_SNAKE_CASE (`GRID_WIDTH`, `PLAYER_SPEED`)
- **Booleans**: prefixo `is` ou `has` (`isGameRunning`, `hasCollected`)

### Comentários

```typescript
// ✅ Comente o "por quê", não o "o quê"
// Spawnar frutas com delay evita lag no início do jogo
const FRUIT_SPAWN_DELAY = 500;

// ❌ Comentário óbvio
// Incrementa contador
count++;
```

### Organização de Arquivos

```
src/
├── client/
│   ├── index.ts              # Entry point
│   ├── scenes/
│   │   ├── MenuScene.ts      # Uma scene por arquivo
│   │   └── GameScene.ts
│   ├── objects/
│   │   ├── Snake.ts          # Game objects
│   │   └── Fruit.ts
│   └── network/
│       └── SocketClient.ts   # Comunicação
├── server/
│   ├── server.ts             # Entry point
│   ├── websocket/            # WebSocket logic
│   ├── routes/               # REST endpoints
│   └── models/               # Data models
└── shared/
    ├── types.ts              # Tipos compartilhados
    └── constants.ts          # Constantes
```

### Linting & Formatting

```bash
# Verificar erros
npm run lint

# Formatar automaticamente
npm run format

# Linting com fix automático
npm run lint -- --fix
```

## 📝 Commits e PRs

### Mensagens de Commit

Siga o padrão de Conventional Commits:

```
tipo(escopo): descrição breve

Descrição detalhada (opcional)
- Mudança 1
- Mudança 2

Fixes #123
```

**Tipos válidos:**

- `feat`: Nova feature
- `fix`: Correção de bug
- `docs`: Mudança em documentação
- `style`: Formatação (sem mudança de lógica)
- `refactor`: Refatoração de código
- `perf`: Melhoria de performance
- `test`: Testes
- `chore`: Build, deps, etc

**Exemplos:**

```bash
git commit -m "feat(game): implementar power-up de invencibilidade"
git commit -m "fix(collision): corrigir detecção de colisão com parede"
git commit -m "docs: melhorar documentação de setup"
git commit -m "refactor(socket): simplificar lógica de reconexão"
```

### Pull Requests

Veja [PULLREQUEST.md](./pull_request_template.md) para o template completo.

**Checklist antes de submeter:**

- [ ] Testei localmente com `npm run dev`
- [ ] Rodei linting com `npm run lint`
- [ ] Atualizei documentação relevante
- [ ] Minha branch está atualizada com `main`
- [ ] Commits tienen mensagens claras
- [ ] Não tenho conflitos de merge
- [ ] PR descreve a mudança claramente

### Reviewers

Seus PRs podem ser revisados por:

- Mantenedores do projeto
- Contribuidores experientes
- Community members

Se o review pedir mudanças:

1. Faça os ajustes
2. Crie um novo commit com as correções e dê push na branch
3. Comente "Pronto para re-review"

## 🛠️ Setup Local

### Pré-requisitos

```bash
node --version  # 18.0.0+
npm --version   # 8.0.0+
git --version   # 2.25.0+
```

### Setup

```bash
# 1. Fork e clone
git clone https://github.com/SEU_USUARIO/joguinho-o-retorno.git
cd joguinho-o-retorno

# 2. Install deps
npm install

# 3. Configurar env
cp .env.example .env

# 4. Rodar em desenvolvimento
npm run dev

# 5. Acessar
# - Servidor: http://localhost:3000
# - Cliente: http://localhost:5173
```

### Comandos Úteis

```bash
npm run dev              # Dev server (hot reload)
npm run build            # Build para produção
npm run lint             # Verificar erros
npm run lint -- --fix    # Corrigir erros automaticamente
npm run format           # Formatar código

# Desenvolvimento separado
npm run server:dev       # Apenas servidor
npm run client:dev       # Apenas cliente
```

## 📚 Recursos Úteis

- **[Especificação do Jogo](../docs/snake-battle.md)** - Design completo, mecânicas e poderes
- **[Plano de Desenvolvimento](../docs/plano-de-desenvolvimento.md)** - Fases, entregáveis e checkpoints
- **[README](../README.md)** - Overview do projeto
- **[Tipos Compartilhados](../src/shared/types.ts)** - Estruturas principais
- **[Constantes do Jogo](../src/shared/constants.ts)** - Balanceamento

## 🎯 Roadmap de Desenvolvimento

O projeto segue 6 fases progressivas, desenvolvidas aos fins de semana:

| Fase | Foco                                           |
| ---- | ---------------------------------------------- |
| 0    | Fundação técnica + cobra solo jogável          |
| 1    | Multiplayer local + 4 dificuldades             |
| 2    | Poderes set 1 (Speed Boost, Invisibilidade...) |
| 3    | Poderes set 2 + obstáculos em Hard/Insane      |
| 4    | Online, skins e leaderboard (opcional)         |
| 5    | Pós-lançamento                                 |

Veja [docs/plano-de-desenvolvimento.md](../docs/plano-de-desenvolvimento.md) para entregáveis e critérios de conclusão de cada fase.

## ❓ Dúvidas?

- 📖 Leia a documentação em `docs/`
- 🐛 Abra uma issue com a tag `question`
- 💬 Comente em issues ou PRs relacionados

---

**Obrigado por contribuir! 🎮**

Juntos estamos criando um jogo incrível!
