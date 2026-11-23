# 🚀 StudyFlow — Progresso Técnico & Roadmap de Modularização (v0.2)

> **Escopo da v0.2:** Estabilização e Modularização de Pomodoro e Tasks.  
> **Meta Metodológica:** Servir de base limpa e desacoplada para o fluxo de trabalho profissional com Git (Branches atômicas e Pull Requests bem delimitados).

---

## 📍 Estado Atual da Modularização (v0.2)

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

### 🔄 Em Andamento: Modularização das Tarefas (Todo) — Branch `refactor/modularize-task` (23/11/2026)
- **Avanços Realizados (23/11/2026):**
  - **Criação de `src/modules/todo/DOM.js`:** Isolamento das capturas de nós do DOM (`inputTarefa`, `btnAdicionarTarefas`, `listaTarefas`, `listaConcluidas`).
  - **Migração para ES Modules:** Início da conversão de `src/modules/todo/todo.js` com importação dos seletores do `DOM.js` e exportação inicial de `renderizarTarefas`.
- **Pontos Restantes na Branch:**
  - `src/modules/todo/todo.js` ainda mantém acoplamento de estado (`listaDetarefasArray`) com manipulação imperativa de DOM e event listeners anexados no escopo do arquivo.
  - Necessidade de extrair a lógica de renderização para `src/modules/todo/render.js` e as operações de estado puro para `src/modules/todo/todo.js`.
  - O `src/index.js` ainda não orquestra o ciclo de vida e eventos de tarefas.

---

## 🎯 Próximo Passo na Branch / PR: `refactor/modularize-task`

> **Regra de Ouro do Tech Lead:** *Isole a feature em camadas de responsabilidade única (DOM, Estado/Regras e Renderização), orquestrando o fluxo no ponto de entrada da aplicação.*

- **Tipo:** Refatoração Arquitetural e Modularização ES6 (Refactor).
- **Alvo Imediato:** Extrair as funções puras de estado (`getTarefas`, manipulação do array) em `src/modules/todo/todo.js` e isolar a construção de interface em `src/modules/todo/render.js`.
- **Checklist da Branch:**
  - [x] **Criar `src/modules/todo/DOM.js` (23/11/2026):** Exportar seletores dos inputs, botões e listas (`inputTarefa`, `btnAdicionarTarefas`, `listaTarefas`, `listaConcluidas`).
  - [x] **Migrar `src/modules/todo/todo.js` para ES Modules (23/11/2026):** Importar elementos do `DOM.js`.
  - [ ] **Extrair funções de estado puro (Próximo Passo):** Isolar em `src/modules/todo/todo.js` as funções de negócio e estado: `getTarefas()`, `adicionarTarefa()`, `alternarStatusTarefa()` e `removerTarefa()`, sem referências a nós de interface.
  - [ ] **Criar `src/modules/todo/render.js` (Próximo Passo):** Extrair a função `renderizarTarefas(tarefas)` responsável exclusivamente por construir os itens visuais (`li`, checkboxes, botões de exclusão e mensagens de lista vazia).
  - [ ] **Integrar no `src/index.js`:** Conectar os event listeners de submissão e deleção/toggle no orquestrador raiz.
  - [ ] **Atualizar `index.html`:** Remover a importação legada `<script src="./src/modules/todo/todo.js"></script>`.
- **Critério de Sucesso (DoD):** Todas as operações de tarefas funcionando via ES Modules orquestradas pelo `src/index.js`, com `todo.js` totalmente livre de manipulação de DOM.

---

## ⚠️ Pontos de Trava / Regras de Domínio Pendentes

### 1. Modelagem de Tarefas (Boolean vs Estados de Domínio)
- **Situação Atual:** Tarefas estruturadas com `{ id, texto, concluida: boolean }`.
- **Requisito do Domínio (Seção 3.3 e 9 de `docs/requisitos-studyflow.md`):** Uma `Task` no domínio StudyFlow deve ter status (`'pendente'`, `'em andamento'`, `'concluída'`) e campos de rastreamento temporal (`createdAt`, `completedAt`).
- **Estratégia na v0.2:** Durante a extração para `todo.js`, preparar a estrutura para acomodar os estados de domínio sem quebrar a interface simples de checkbox atual.

### 2. Vínculo de Pomodoro com Task e Flow (StudySession)
- **Requisito do Domínio (RF11, RF12, RF14, RN12, RN15):** Toda sessão pertence a um `Flow` e pode referenciar uma `Task`.
- **Diretriz de Escopo:** **Não conectar Pomodoro a Tasks agora.** Essa vinculação pertence à **v0.3 (Fundação de Flow)**. Na v0.2 mantemos as duas features independentes e estáveis.

### 3. Persistência de Dados no Cliente (`localStorage`)
- O Pomodoro já lê e grava métricas no `localStorage`.
- O módulo de tarefas ainda opera exclusivamente em memória (perde dados ao recarregar).
- A persistência das tarefas pode ser adicionada como refinamento pós-modularização ou na v0.3.

---

## 🔬 Lacunas Mapeadas (Bloco 2 — Micro-Labs)

| Data | Lacuna Identificada | Micro-Lab Criado | Status |
| :--- | :------------------ | :--------------- | :----- |
|      |                     |                  |        |
|      |                     |                  |        |
|      |                     |                  |        |
|      |                     |                  |        |
|      |                     |                  |        |

---
