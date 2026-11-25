import { listaTarefas, listaConcluidas } from "./DOM.js";
import { getTarefas } from "./todo.js";

// [ ] PILAR 2: LISTAR TAREFAS (READ)
export const renderizarTarefas = () => {
    // -> Limpar o contêiner HTML antes de renderizar para não duplicar.
    listaTarefas.innerHTML = "";
    listaConcluidas.innerHTML = "";
    // -> Percorrer o array de tarefas.
    getTarefas().forEach(tarefa => {
    let novoItem = document.createElement("li");
    // Cria o ID do objeto atual no dataset do LI
    novoItem.dataset.id = tarefa.id;
    // Cria o nó de texto usando o texto do objeto atual
    let textoFormatado = tarefa.texto.charAt(0).toUpperCase() + tarefa.texto.slice(1);
    let textoNode = document.createTextNode(textoFormatado);
    novoItem.appendChild(textoNode);
    // Cria e configura o botão
    let buttonDelete = document.createElement("button");
    buttonDelete.textContent = "X";
    // Evento de delete com filter
    buttonDelete.classList.add("btn-deletar");
        removerTarefa(tarefa.id);
        // Chama a função de Renderizar as Tarefas
        renderizarTarefas();

    // [ ] PILAR 3: CONCLUIR TAREFA (UPDATE)

    // Cria o elemneto input
    let checkBoxConcluir = document.createElement("input");
    novoItem.classList.add("todo-item");
    checkBoxConcluir.type = "checkbox";
    novoItem.classList.add("todo-item");
    checkBoxConcluir.addEventListener("change", () =>{
        // -> Alternar o estado (true/false) da propriedade de conclusão no objeto.
        let tarefaEncontrada = listaDetarefasArray.find(item => item.id === tarefa.id);
        if(tarefaEncontrada){
            tarefaEncontrada.concluida = checkBoxConcluir.checked;
        }
        console.log(tarefaEncontrada)
        // -> Injetar a estrutura na tela.
        renderizarTarefas();
    })
    novoItem.appendChild(checkBoxConcluir);

    // -> Aplicar o estilo visual de "concluído"
    if(tarefa.concluida === true){
        novoItem.classList.add("conluida");
        checkBoxConcluir.checked = true;
        listaConcluidas.appendChild(novoItem);
    }else{
        novoItem.classList.remove("conlcuida");
        checkBoxConcluir.checked = false;
        listaTarefas.appendChild(novoItem);
    }
    
    novoItem.appendChild(buttonDelete);
    });

    if(listaTarefas.children.length === 0){
        listaTarefas.innerHTML = "<li>Nenhuma tarefa em andamento.</>";
    }
    if(listaConcluidas.children.length === 0){
        listaConcluidas.innerHTML = "<li>Nenhuma tarefa concluída.</li>";
    }
};
