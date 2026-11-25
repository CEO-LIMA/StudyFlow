let listaDetarefasArray = [];

export const getTarefas = () => [listaDetarefasArray];

export const adicionarTarefa = (textoBruto = "") => {
    // -> Validar se o campo não está vazio (remover espaços com .trim()).
    const textoLimpo = textoBruto.trim();
    if(textoLimpo === ""){
        return false;
    }

// -> Criar o objeto da tarefa e empurrar (push) para o array principal.
    let novaTarefa = {
        id: Date.now(),
        texto: textoLimpo,
        concluida: false
    }
    listaDetarefasArray.push(novaTarefa);
    return true;
}

export const alternarStatusTarefa = (id)  => {
    const tarefa = listaDetarefasArray.find((t) => t.id === id);
    if((tarefa)){
        tarefa.concluida = !tarefa.concluida;
        return;
    }
}

export const removerTarefa = (id) => {
    listaDetarefasArray = listaDetarefasArray.filter((tarefa) => tarefa.id !== id);
    return;
};