// Seletores dos elementos do DOM
const inputAmigo = document.getElementById('amigo'); // Campo de input
const listaAmigos = document.getElementById('listaAmigos'); // Lista de amigos
const resultado = document.getElementById('resultado'); // Resultado do sorteio
let amigos = []; // Array para armazenar os nomes

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const nomeAmigo = inputAmigo.value.trim(); // Remove espaços em branco no início e no fim

    if (nomeAmigo === "") {
        abrirModal("Por favor, digite um nome válido."); // Exibe o modal com a mensagem
        return;
    }

    if (amigos.includes(nomeAmigo)) {
        abrirModal("Este nome já foi adicionado. Por favor, insira um nome diferente."); // Exibe o modal com a mensagem
        return;
    }

    // Adiciona o nome ao array
    amigos.push(nomeAmigo);

    // Atualiza a lista de amigos na tela
    atualizarListaAmigos();

    // Limpa o campo de input
    inputAmigo.value = "";
}

// Função para atualizar a lista de amigos na tela
function atualizarListaAmigos() {
    listaAmigos.innerHTML = ""; // Limpa a lista atual

    // Adiciona cada amigo à lista
    amigos.forEach((amigo) => {
        const itemLista = document.createElement('li');
        itemLista.textContent = amigo;
        listaAmigos.appendChild(itemLista);
    });
}

// Função para sortear os amigos secretos
function sortearAmigo() {
    // Verifica se o número de nomes é par
    if (amigos.length < 2) {
        abrirModal("Adicione pelo menos 2 nomes para realizar o sorteio.");
        return;
    }

    if (amigos.length % 2 !== 0) { // Verifica se o número de nomes é ímpar
        abrirModal(`O número de participantes é ímpar (${amigos.length}). Adicione mais um nome para que o sorteio possa ser realizado em pares.`);
        return;
    }

    // Se o número for par, oculta o modal (caso esteja aberto)
    fecharModal();

    // Embaralha a lista de amigos
    const amigosEmbaralhados = embaralharArray([...amigos]);

    // Limpa o resultado anterior
    resultado.innerHTML = "";

    // Exibe os resultados do sorteio
    for (let i = 0; i < amigos.length; i++) {
        const amigoAtual = amigos[i];
        const amigoSorteado = amigosEmbaralhados[i];

        // Cria um item de lista para o resultado
        const itemResultado = document.createElement('li');
        itemResultado.textContent = `${amigoAtual} ➔ ${amigoSorteado}`;
        resultado.appendChild(itemResultado);
    }
}

// Função para embaralhar um array (algoritmo Fisher-Yates)
function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para reiniciar o sorteio
function reiniciarSorteio() {
    // Limpa o array de amigos
    amigos = [];

    // Limpa a lista de amigos na tela
    listaAmigos.innerHTML = "";

    // Limpa o resultado do sorteio na tela
    resultado.innerHTML = "";

    // Foca no campo de input para facilitar a digitação
    inputAmigo.focus();
}

// Função para abrir o modal com uma mensagem
function abrirModal(mensagem) {
    const modal = document.getElementById('modalAviso');
    const modalMensagem = document.getElementById('modalMensagem');

    modalMensagem.textContent = mensagem; // Define a mensagem no modal
    modal.style.display = 'flex'; // Exibe o modal
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById('modalAviso');
    modal.style.display = 'none'; // Oculta o modal
}