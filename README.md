# Snake Battle

Este é o repositório do **Snake Battle**, um jogo multijogador competitivo baseado no clássico "Snake", desenvolvido com:

- **Frontend:** Phaser 3 (HTML5 2D Game Engine)
- **Backend:** Express.js + Socket.io
- **Linguagem:** TypeScript (Full-Stack)
- **Estilo:** Pixel Art Retro 8-bit

## 🎮 Sobre o Jogo

**Snake Battle** é uma versão moderna e competitiva do clássico jogo da cobrinha. Duas cobras competem em um mapa fechado, comendo frutas para crescer enquanto evitam colisões (consigo mesmas, uma com a outra e com as paredes).

### Mecânicas Principais

- 🐍 **Solo ou 2 Jogadores Locais:** modo solo ou P1 (WASD) vs P2 (Setas)
- 🍎 **Sistema de Frutas:** Coma frutas para crescer e ganhar pontos
- ⚡ **Poderes Especiais:** 6 poderes únicos para ganhar vantagem tática (Fase 2+)
- 🎯 **Níveis de Dificuldade:** Easy, Normal, Hard, Insane
- 🗺️ **Obstáculos:** Blocos estáticos e móveis em Hard e Insane (Fase 3+)
- 🎨 **Estética Retro:** Visual pixel art 8-bit com cores vibrantes

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

### Controles (2 Jogadores)

| Ação     | Jogador 1 | Jogador 2 |
| -------- | --------- | --------- |
| Cima     | **W**     | **↑**     |
| Baixo    | **S**     | **↓**     |
| Esquerda | **A**     | **←**     |
| Direita  | **D**     | **→**     |
| Pausa    | **P**     | **P**     |

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

## 🎯 Status Atual

**Fase atual:** Fase 0 - Fundação e Single Player ✏️

- [ ] **Fase 0:** Fundação técnica + cobra solo jogável
- [ ] **Fase 1:** Multiplayer local + 4 dificuldades
- [ ] **Fase 2:** Poderes set 1 (Speed Boost, Invisibilidade, Speed Reversal) + polish visual
- [ ] **Fase 3:** Poderes set 2 (Sabre, Caracol, Pedra) + obstáculos em Hard/Insane
- [ ] **Fase 4 (opcional):** Online, skins e leaderboard
- [ ] **Fase 5:** Pós-lançamento

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

## 📚 Documentação

- **Game Design:** [docs/snake-battle.md](docs/snake-battle.md) - Mecânicas, poderes, dificuldades
- **Plano de Desenvolvimento:** [docs/plano-de-desenvolvimento.md](docs/plano-de-desenvolvimento.md) - Fases, entregáveis, checkpoints

## 🤝 Contribuindo

Este é um projeto em desenvolvimento. Contribuições são bem-vindas!

1. Faça um Fork
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Distribuído sob a Licença MIT. Veja `LICENSE` para mais informações.
