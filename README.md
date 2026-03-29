# Snake Battle

Este é o repositório do **Snake Battle**, um jogo multijogador competitivo baseado no clássico "Snake", desenvolvido com:

- **Frontend:** Phaser 3 (HTML5 2D Game Engine)
- **Backend:** Express.js + Socket.io
- **Linguagem:** TypeScript (Full-Stack)
- **Estilo:** Pixel Art Retro 8-bit

## 🎮 Sobre o Jogo

**Snake Battle** é uma versão moderna e competitiva do clássico jogo da cobrinha. Duas cobras competem em um mapa fechado, comendo frutas para crescer enquanto evitam colisões (consigo mesmas, uma com a outra e com as paredes).

### Mecânicas Principais

- 🐍 **2 Jogadores Locais:** P1 (WASD) vs P2 (Setas)
- 🍎 **Sistema de Frutas:** Coma frutas para crescer e ganhar pontos
- ⚡ **Poderes Especiais:** 5+ poderes únicos para ganhar vantagem tática
- 🎯 **Níveis de Dificuldade:** Easy, Normal, Hard, Insane
- 🗺️ **Fases com Obstáculos:** A partir da Fase 3+
- 🎨 **Estética Retro:** Visual pixel art 8-bit com cores vibrantes

## 📊 Roadmap de Desenvolvimento

```
Fase 1: MVP Local        → Fase 2: Poderes      → Fase 3: Obstáculos
Semana 1-2               Semana 3               Semana 4
v0.1                     v0.2                   v0.3
✓ Controles              ✓ 3 Poderes            ✓ Blocos estáticos
✓ Colisões               ✓ Audio/Música         ✓ 3 Novos poderes
✓ Pontuação              ✓ Leaderboard local    ✓ Replay system
✓ Menu                                          ✓ Balanceamento

Fase 4: Skins            → Fase 5: Online Prep  → Fase 6: Online Deploy
Semana 5-6               Semana 6-7             Semana 7-9
v0.4                     v0.5                   v1.0
✓ 10+ Skins              ✓ GameState            ✓ Autenticação JWT
✓ Unlock system          ✓ Serialização         ✓ Leaderboard Online
✓ Editor in-game         ✓ Synchronization      ✓ Deploy em Produção
```

Para detalhes completos, veja [docs/snake-battle.md](docs/snake-battle.md)

## 🚀 Como Rodar Localmente

### Pré-requisitos

- **Node.js** 18+ LTS ([download](https://nodejs.org))
- **npm** 8+ ou **yarn** 3+
- **Git**

### Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/felurye/joguinho-o-retorno.git
cd joguinho-o-retorno
```

2. **Copie o arquivo de variáveis de ambiente:**

```bash
cp .env.example .env
```

3. **Instale as dependências:**

```bash
npm install
```

### Desenvolvimento

Para rodar o servidor E cliente em modo desenvolvimento com **hot reload**:

```bash
npm run dev
```

Isso iniciará:

- 🖥️ **Servidor:** http://localhost:3000
- 🎮 **Cliente:** http://localhost:5173

Qualquer alteração em `.ts` será refletida instantaneamente!

### Build para Produção

```bash
npm run build
npm run start
```

Isso vai:

1. Compilar o TypeScript
2. Fazer bundle do Phaser com Vite
3. Servir o cliente via Express

## 🎮 Controles

### Multiplayer Local (MVP)

| Ação     | Jogador 1 | Jogador 2 |
| -------- | --------- | --------- |
| Cima     | **W**     | **↑**     |
| Baixo    | **S**     | **↓**     |
| Esquerda | **A**     | **←**     |
| Direita  | **D**     | **→**     |
| Pausa    | **P**     | **P**     |

## 📊 Especificações Técnicas

### Performance Alvo

- **FPS:** 60 FPS estável (até 4 players)
- **Latência Online:** <100ms (mesmo servidor)
- **Bundle Size:** ~120KB gzipped
- **Load Time:** <1 segundo em 4G

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🛠️ Stack Tecnológico

| Componente  | Tecnologia | Versão  |
| ----------- | ---------- | ------- |
| Language    | TypeScript | 5.0+    |
| Game Engine | Phaser     | 3.55+   |
| Backend     | Express    | 4.18+   |
| Real-time   | Socket.io  | 4.5+    |
| Build Tool  | Vite       | 4.3+    |
| Runtime     | Node.js    | 18+ LTS |

### Dependências Principais

**Produção:**

- `express` - Web framework
- `socket.io` - Real-time communication
- `phaser` - Game engine
- `cors` - Cross-origin requests

**Desenvolvimento:**

- `typescript` - Type safety
- `vite` - Frontend bundler
- `ts-node` - TypeScript executor
- `nodemon` - File watcher
- `eslint` - Linter
- `prettier` - Code formatter

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm run start

# Lint de código
npm run lint

# Formatar código
npm run format

# Dev do servidor apenas
npm run server:dev

# Dev do cliente apenas
npm run client:dev
```

## 🐛 Troubleshooting

### Porta 3000 já em uso

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Problemas com Node modules

```bash
rm -rf node_modules package-lock.json
npm install
```

### Socket.io não conecta

Verifique se o servidor está rodando em `http://localhost:3000` e a variável `CORS_ORIGIN` está correta no `.env`

## 📚 Documentação

- **Plano Completo:** [docs/snake-battle.md](docs/snake-battle.md)
- **Game Design:** Mecânicas, Poderes, Dificuldades, Fases
- **Wiki Futura:** (contribuições são bem-vindas!)

## 🤝 Contribuindo

Este é um projeto em desenvolvimento. Contribuições são bem-vindas!

1. Faça um Fork
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Distribuído sob a Licença MIT. Veja `LICENSE` para mais informações.

## 🎯 Status Atual

**Fase:** Pre-development ✏️

- [ ] **Fase 1 (MVP):** Game Base com 2 players locais
- [ ] **Fase 2:** Poderes e Melhorias Visuais
- [ ] **Fase 3:** Obstáculos e Novos Poderes
- [ ] **Fase 4:** Sistema de Skins
- [ ] **Fase 5:** Preparação para Online
- [ ] **Fase 6:** Multiplayer Online & Deploy
- [ ] **Fase 7+:** Expansões Contínuas

## 👨‍💻 Autores

<table>
  <tbody>
    <tr>
        <td align="center" valign="top" width="14.28%">
            <a href="http://felurye.com.br"><img src="https://avatars.githubusercontent.com/u/37555137?v=4?s=100" width="100px;" alt="Daniele Araújo"/><br /><sub><b>Daniele Araújo</b></sub></a><br />
            <a href="#code-felurye" title="Code">💻</a>
            <a href="#documentation-felurye" title="Documentation">📖</a>
            <a href="#ideas-felurye" title="Ideas, Planning & Feedback">🤔</a>
        </td>
        <td align="center" valign="top" width="14.28%">
            <a href="https://www.linkedin.com/in/samantha-kellen/"><img src="https://avatars.githubusercontent.com/u/42253793?v=4?s=100" width="100px;" alt="Samantha Kellen"/><br /><sub><b>Samantha Kellen</b></sub></a><br />
            <a href="#code-SamGomes52" title="Code">💻</a>
            <a href="#example-SamGomes52" title="Examples">💡</a>
            <a href="#ideas-SamGomes52" title="Ideas, Planning & Feedback">🤔</a>
        </td>
        <td align="center" valign="top" width="14.28%">
            <a href="https://www.linkedin.com/in/natanael-ferreira-soares-46966a173/"><img src="https://avatars.githubusercontent.com/u/98434282?v=4?s=100" width="100px;" alt="Natanael Ferreira"/><br /><sub><b>Natanael Ferreira</b></sub></a><br />
            <a href="#design-Zaethyr" title="Design">🎨</a>
            <a href="#ideas-Zaethyr" title="Ideas, Planning & Feedback">🤔</a>
            </td>
        <td align="center" valign="top" width="14.28%">
            <a href="https://www.artstation.com/vm21"><img src="https://cdnb.artstation.com/p/assets/images/images/038/971/369/large/vitor-moreira-1-effectsresult.jpg?1624568523?v=4?s=100" width="100px;" alt="Vitor Gonçalves"/><br /><sub><b>Vitor Gonçalves</b></sub></a><br />
            <a href="#design-vitor" title="Design">🎨</a>
            <a href="#ideas-vitor" title="Ideas, Planning & Feedback">🤔</a>
        </td>
    </tr>
  </tbody>
</table>

---

**Quer jogar?** Clone o repositório, rode `npm install && npm run dev`, e divirta-se! 🐍🎮
