let produtos = new Array();

// Carregar listagem ao carregar a página
function carregarListagem() {
    if (localStorage.hasOwnProperty("produtos")) {
        produtos = JSON.parse(localStorage.getItem("produtos"));
    }

    produtos.sort((primeiro, segundo) => primeiro.valor - segundo.valor);
    
    atualizarListaProdutos();
}

// Atualizar a tabela com a listagem de produtos
function atualizarListaProdutos() {
    const listagem = document.getElementById("listagem-produtos");

    listagem.innerHTML = "";

    produtos.forEach((produto, index) => {
        const linhaTabela = document.createElement("tr");
        linhaTabela.innerHTML = `
        <td>${produto.nome}</td>
        <td>${produto.valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</td>
        <td>
          <button class="edicao-button" data-index="${index}">Editar</button>
        </td>
      `;
        listagem.appendChild(linhaTabela);
    });

    // Botões de edição
    const botoesEdicao = document.querySelectorAll(".edicao-button");
    botoesEdicao.forEach(botoesEdicao => {
        botoesEdicao.addEventListener("click", function () {
            const index = botoesEdicao.getAttribute("data-index");
            abrirModalEdicao(index);
        });
    });
}

// Abrir formulário de cadastro
function abrirCadastro() {
    document.getElementById("container-listagem").classList.add("hidden");
    document.getElementById("container-cadastro").classList.remove("hidden");
}

// Fechar formulário de cadastro
function fecharCadastro() {
    document.getElementById("container-listagem").classList.remove("hidden");
    document.getElementById("container-cadastro").classList.add("hidden");
}

// Formulário de Cadastro
document.getElementById("formulario-cadastro").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const disponibilidade = Boolean(document.getElementById("disponibilidade").value);

    if (localStorage.hasOwnProperty("produtos")) {
        produtos = JSON.parse(localStorage.getItem("produtos"));
    }

    produtos.push({ nome, descricao, valor, disponibilidade });
    localStorage.setItem("produtos", JSON.stringify(produtos));
    produtos.sort((primeiro, segundo) => primeiro.valor - segundo.valor);

    atualizarListaProdutos();
    fecharCadastro();
});

// Abrir modal de edição de produto
function abrirModalEdicao(index) {
    const produtoEscolhido = produtos[index];

    document.getElementById("editar-nome").value = produtoEscolhido.nome;
    document.getElementById("editar-descricao").value = produtoEscolhido.descricao;
    document.getElementById("editar-valor").value = produtoEscolhido.valor;
    document.getElementById("editar-disponibilidade").value = produtoEscolhido.disponibilidade;

    document.getElementById("teste-modal").style.display = "flex";
    document.getElementById("formulario-edicao").setAttribute("editar-index", index);
}

// Fechar modal de edição
function fecharModal() {
    document.getElementById("fundo-modal").style.display = "none";
    document.getElementById("modal-edicao").style.display = "none";
}