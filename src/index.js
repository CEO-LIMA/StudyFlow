import { inicializarAplicativo, getEstado, resetarCronometro, pausarCronometro, iniciarCronometro, aumentarTempo, diminuirTempo } from "./modules/pomodoro/pomodoro.js";
import { renderizarPomodoro } from "./modules/pomodoro/render.js";
import { botaoIniciar, botaoReset, btnAumentar, btnDiminuir } from "./modules/pomodoro/DOM.js";
import { inputTarefa, btnAdicionarTarefas, listaTarefas, listaConcluidas } from "./modules/todo/DOM.js";
import { adicionarTarefa, alternarStatusTarefa, removerTarefa } from "./modules/todo/todo.js";
import { renderizarTarefas } from "./modules/todo/render.js";

botaoIniciar.addEventListener("click", () => {

  const estado = getEstado();
  // verifica se cronometro estar executando
  if (estado.status === "executando") {
    pausarCronometro();
  } else {
    iniciarCronometro(() => {
      const estadoAtual = getEstado();
      renderizarPomodoro(estadoAtual);
    });
  }
  const novoEstado = getEstado();
  renderizarPomodoro(novoEstado)
 
});


botaoReset.addEventListener("click", () => {
  resetarCronometro();
  const estado = getEstado();
  renderizarPomodoro(estado);
});

btnAumentar.addEventListener("click", () => {
  aumentarTempo();
  const estado = getEstado();
  renderizarPomodoro(estado);
});
btnDiminuir.addEventListener("click", () => {
  diminuirTempo();
  const estado = getEstado();
  renderizarPomodoro(estado);
});

document.addEventListener("DOMContentLoaded", () => {
  inicializarAplicativo();
  renderizarPomodoro(getEstado());
})

// função de gerenciar clicks do TODO.LIST
const gerenciarCliqueLista = (e) => {
  const itemLi = e.target.closest("li");
  if(!itemLi) return;

  const idTarefa = Number(itemLi.dataset.id);

  if(e.target.classList.contains("btn-deletar")){
    removerTarefa(idTarefa);
    renderizarTarefas();
  }

  if(e.tareget.type === "checkbox") {
    alternarStatusTarefa(idTarefa);
    renderizarTarefas();
  }
};
listaTarefas.addEventListener("click", gerenciarCliqueLista);
listaConcluidas.addEventListener("click", gerenciarCliqueLista);

//eventos do TODO.LIST
btnAdicionarTarefas.addEventListener("click", (e) =>{
    e.preventDefault();
    const adiciona = adicionarTarefa(inputTarefa.value)
    if(adiciona){
        renderizarTarefas();
        inputTarefa.value = ""
    }else{
        inputTarefa.classList.remove("input-erro");
        inputTarefa.offsetWidth;
        inputTarefa.placeholder = "Ei! Escreva uma tarefa real!";
        inputTarefa.classList.add("input-erro");
        inputTarefa.focus()
        return;
    }
    adicionarTarefa();
     // Chama a função de Renderizar e limpar 
    renderizarTarefas();
    // -> Limpar o campo de texto após a criação.
    inputTarefa.value = "";

})

inputTarefa.addEventListener("input", () =>{
    inputTarefa.classList.remove("input-erro");
    inputTarefa.placeholder = "Digite uma nova tarefa..."
});
