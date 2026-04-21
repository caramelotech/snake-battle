## 📝 Descrição

<!-- Descreva sua mudança claramente. O que você está implementando? Por quê? -->

## 🎯 Tipo de Mudança

<!-- Marque a opção relevante com um 'x' -->

- [ ] 🐛 Correção de bug (mudança que corrige um comportamento incorreto)
- [ ] ✨ Nova feature (mudança que adiciona funcionalidade)
- [ ] 📚 Documentação (mudança apenas em documentação)
- [ ] ♻️ Refatoração (mudança sem afetar comportamento)
- [ ] 🎨 Estilo (formatação, missing semicolons, etc)
- [ ] ⚡ Performance (melhoria de performance)
- [ ] 🧪 Testes (adicionar ou melhorar testes)

## 🔗 Issues Relacionadas

<!-- Feche issues automaticamente com "Fixes #123" ou "Closes #456" -->

Fixes #

<!-- ou -->

Closes #

## ✅ Checklist

<!--
Não se preocupe em completar tudo de uma vez. Este é um checklist para você verificar.
Coloque 'x' nos itens que completou: [x]
-->

### Mudanças

- [ ] Meu código segue o style guide do projeto (`npm run lint`)
- [ ] Rodei `npm run format` para formatação automática
- [ ] Atualizei documentação relevante
- [ ] Atualizei `CHANGELOG.md` se aplicável
- [ ] Minhas mudanças não quebram nenhum teste existente

### Testes

- [ ] Testei minha mudança localmente com `npm run dev`
- [ ] Adicionei testes para novos comportamentos (quando implementado)
- [ ] Todos os testes passam (`npm run test`)
- [ ] Verificei cobertura de testes

### Commits

- [ ] Minhas mensagens de commit seguem [Conventional Commits](https://www.conventionalcommits.org/)
- [ ] Squasheei commits relacionados se necessário
- [ ] Minha branch está atualizada com `main` (sem conflitos)

### Código

- [ ] Não há console.log ou debug code deixado
- [ ] Sem `any` types (ou com comentário justificando)
- [ ] Sem código comentado ou imports não utilizados
- [ ] TypeScript compila sem erros

### Performance & Segurança

- [ ] Minhas mudanças não degradam performance
- [ ] Sem dados sensíveis commitados (API keys, senhas, etc)
- [ ] Sem vulnerabilidades de segurança óbvias

## 📸 Screenshots (se aplicável)

<!-- Se sua mudança tem componente visual, adicione screenshots/gifs -->

## 💭 Considerações Adicionais

<!-- Algo que os reviewers devem saber? Alternativas consideradas? Trade-offs? -->

## 🔍 Como Testar

<!--
Descreva os passos específicos para testar sua mudança.
Seja tão detalhado possível!
-->

1. Execute `npm install`
2. Execute `npm run dev`
3. Navegue para `http://localhost:5173`
4. Faça [ações específicas]...
5. Verifique [comportamento esperado]

## 📋 Detalhes de Implementação

<!-- Opcional: explique decisões técnicas importantes -->

### Mudanças Principais

- Mudança 1
- Mudança 2
- Mudança 3

### Estrutura Alterada

<!-- Se você criou/deletou operações ou restructurou código -->

```
Antes:
src/
  └── client/oldFile.ts

Depois:
src/
  └── client/
      ├── newFile.ts
      └── utils/helper.ts
```

### Impacto

<!-- Quais áreas do código são afetadas? -->

- [ ] Client (Phaser scenes)
- [ ] Server (Express routes, WebSocket)
- [ ] Shared (types, constants)
- [ ] Network (Socket.io)
- [ ] Performance
- [ ] Segurança
- [ ] Documentação

## 🚀 Pronto para Review?

Por favor, certifique-se que você:

- [ ] Respondeu todas as questões acima
- [ ] Resolveu todos os conflitos de merge
- [ ] Não tem pedindo reviews antes de estar pronto
- [ ] Entende que você pode ser pedido para fazer mudanças

---

**Obrigado por contribuir! 🎮**
