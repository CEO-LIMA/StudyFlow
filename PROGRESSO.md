# 🚀 StudyFlow — Progresso Técnico & Roadmap de Modularização (v0.2 ➔ v0.3)

> **Escopo da v0.2:** Estabilização e Modularização de Pomodoro e Tasks.  
> **Meta Metodológica:** Servir de base limpa e desacoplada para o fluxo de trabalho profissional com Git (Branches atômicas e Pull Requests bem delimitados).

---

## 📍 Estado da Modularização (v0.2 Concluída)

### ✅ Concluído: Modularização e Desacoplamento do Pomodoro (18/11/2026)
- **Regras de Negócio e Estado (`src/modules/pomodoro/pomodoro.js`):**
  - Focado estritamente em controle do timer, intervalos de ciclo, regras de cálculo e persistência de estatísticas no `localStorage`.
  - Desacoplado de mutações visuais diretas (`textContent` removido das regras).
  - `getEstado()` unificado e expondo todos os dados necessários (tempo, modo, ciclos, minutos acumulados e ofensiva).
- **Mapeamento de Interface (`src/modules/pomodoro/DOM.js`):**
  - Centraliza todas as capturas de elementos do DOM do timer e do painel de estatísticas (`elMinutosHoje`, `elMinutosOntem`, `elOfensiva`, etc.).
- **Camada de Apresentação (`src/modules/pomodoro/render.js`):**
  - Responsabilidade única de atualizar display, status orientativo, visibilidade dos controles e o painel de estatísticas diárias com base no estado recebido.
- **Módulo Utilitário Compartilhado (`src/shared/formatadores.js`):**
  - Extração de `formatarTempoAcumulado` para reutilização pura fora dos módulos de feature.
- **Orquestrador Central (`src/index.js`):**
  - Inicialização da aplicação centralizada no evento `DOMContentLoaded` (`inicializarAplicativo` e primeira chamada de `renderizarPomodoro`).
  - Gerenciamento de eventos de clique e integração reativa com o ciclo do timer.

---

### ✅ Concluído: Modularização e Desacoplamento das Tarefas (Todo) (25/11/2026)
- **Mapeamento de Interface (`src/modules/todo/DOM.js` - 23/11/2026):**
  - Centraliza todas as referências dos nós da interface de tarefas (`inputTarefa`, `btnAdicionarTarefas`, `listaTarefas`, `listaConcluidas`).
- **Regras de Negócio e Estado Puro (`src/modules/todo/todo.js` - 24/11/2026):**
  - Gerenciamento de estado em memória com funções puras e isoladas (`getTarefas()`, `adicionarTarefa()`, `alternarStatusTarefa()`, `removerTarefa()`).
  - Totalmente desacoplado de manipulações e nós do DOM.
- **Camada de Apresentação (`src/modules/todo/render.js` - 25/11/2026):**
  - Função `renderizarTarefas()` responsável exclusivamente por montar os itens `li`, classes, botões de exclusão, checkboxes e mensagens de listas vazias.
- **Orquestração e Event Delegation (`src/index.js` - 25/11/2026):**
  - Event listeners de submissão e input centralizados no maestro da aplicação.
  - Gerenciamento eficiente de cliques e toggles via Event Delegation nas listas utilizando `e.target.closest("li")`.
- **Limpeza de HTML (`index.html` - 25/11/2026):**
  - Remoção da tag `<script>` legada de tarefas; carregamento 100% modular via `type="module"`.

---

## 🎯 Próximo Marco: Início da v0.3 — Fundação de Flow (Fluxo Git: main + develop)

> **Diretriz de Tech Lead:** *Com a estabilização e modularização de Pomodoro e Tasks concluídas na v0.2, consolidamos a base técnica para adotar o fluxo profissional de Git com branches `main` (produção/estável) e `develop` (integração de features).*

- **Transição de Versão:** Encerramento oficial da **v0.2** (Estabilização) e abertura da **v0.3** (Fundação de Flow).
- **Estratégia de Branches:**
  1. **Consolidação da v0.2:** Merge e fechamento da branch `refactor/modularize-task` na branch `develop`, consolidando a versão estável em `main`.
  2. **Adoção do Git Flow:**
     - `main`: código estável de produção (v0.2 finalizada).
     - `develop`: branch base para o desenvolvimento integrado das features da v0.3.
     - `feature/*`: branches pontuais criadas a partir de `develop` (ex.: `feature/create-flow`, `feature/list-flows`).
- **Foco Técnico da v0.3:**
  - Criação da entidade `Flow` (espaço de acompanhamento com id, título, status e timestamps).
  - Vínculo obrigatório: toda `Task` deve pertencer a um `Flow` (Regra de Domínio RN04).
  - Estruturação do Dashboard para alternância e visualização de Flows ativos.

---

## ⚠️ Pontos de Trava / Regras de Domínio Pendentes

### 1. Modelagem de Tarefas (Migração para o Domínio da v0.3)
- **Situação Atual:** Tarefas funcionam com `{ id, texto, concluida: boolean }`.
- **Requisito do Domínio (Seção 3.3 e 9 de `docs/requisitos-studyflow.md`):** Uma `Task` deve possuir `flowId` obrigatório, status (`'pendente'`, `'em andamento'`, `'concluída'`), timestamps (`createdAt`, `completedAt`) e `topicId` opcional.
- **Ação na v0.3:** Evoluir o modelo de dados de tarefas assim que a entidade `Flow` estiver instituída.

### 2. Vínculo de Pomodoro com Task e Flow (StudySession)
- **Requisito do Domínio (RF11, RF12, RF14, RN12, RN15):** Toda sessão de foco pertence a um `Flow` e pode referenciar uma `Task`.
- **Ação na v0.3:** Integrar os ciclos concluídos do Pomodoro com o registro de `StudySession` atrelado ao Flow selecionado.

### 3. Persistência de Dados no Cliente (`localStorage`)
- O Pomodoro possui persistência de estatísticas diárias.
- O Todo opera atualmente em memória.
- Na v0.3, estruturar a persistência centralizada do estado de Flows e suas respectivas Tasks e Sessões.

---

## 🔬 Lacunas Mapeadas (Bloco 2 — Micro-Labs)

| Data | Lacuna Identificada | Micro-Lab Criado | Status |
| :--- | :------------------ | :--------------- | :----- |
| 25/11/2026 | Event Delegation e Element.closest() | Lab de delegação de eventos e captura contextual em listas dinâmicas | Mapeado |
|      |                     |                  |        |
|      |                     |                  |        |
|      |                     |                  |        |
|      |                     |                  |        |

---
