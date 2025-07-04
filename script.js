// Chave para o localStorage
const STORAGE_KEY = "vermei_pedidos";

// Armazena os produtos do pedido temporariamente
let carrinho = JSON.parse(localStorage.getItem("vermei_carrinho")) || [];

// Função para adicionar produto ao carrinho (usado em index.html)
function adicionarAoPedido(nome, preco) {
  carrinho.push({ nome, preco });
  localStorage.setItem("vermei_carrinho", JSON.stringify(carrinho));
  alert(`${nome} adicionado ao pedido!`);
}

// Função para ir para a página pedido.html
function irParaPedido() {
  if (carrinho.length === 0) {
    alert("Por favor, adicione pelo menos um produto ao pedido.");
    return;
  }
  window.location.href = "pedido.html";
}

// --- Código para pedido.html ---

// Atualiza a lista do pedido na página pedido.html
function atualizarListaPedido() {
  const lista = document.getElementById("lista-pedido");
  if (!lista) return; // só executa em pedido.html

  lista.innerHTML = "";
  carrinho.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    lista.appendChild(li);
  });
}

// Função para finalizar o pedido na pedido.html
function finalizarPedido() {
  const nome = document.getElementById("nome").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const pagamento = document.getElementById("pagamento").value;
  const observacoes = document.getElementById("observacoes").value.trim();

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }
  if (!nome || !endereco) {
    alert("Por favor, preencha nome e endereço.");
    return;
  }

  // Cria objeto do pedido
  const pedido = {
    id: Date.now(),
    nomeCliente: nome,
    endereco,
    pagamento,
    observacoes,
    itens: carrinho,
    horario: new Date().toLocaleString(),
  };

  // Pega pedidos já salvos, adiciona o novo e salva
  const pedidosExistentes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  pedidosExistentes.push(pedido);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pedidosExistentes));

  // Limpa carrinho e formulário
  carrinho = [];
  localStorage.removeItem("vermei_carrinho");
  atualizarListaPedido();
  document.getElementById("nome").value = "";
  document.getElementById("endereco").value = "";
  document.getElementById("observacoes").value = "";

  // Esconde formulário e mostra confirmação
  document.getElementById("resumo-pedido").style.display = "none";
  document.getElementById("confirmacao").style.display = "block";
}

// Voltar para o cardápio
function voltarAoCardapio() {
  window.location.href = "index.html";
}

// Ao carregar pedido.html, atualiza a lista
if (window.location.pathname.endsWith("pedido.html")) {
  atualizarListaPedido();
}

// --- Código para funcionarios.html ---

// Atualiza a lista de pedidos no painel de funcionários
function atualizarPedidosFuncionarios() {
  const divLista = document.getElementById("lista-pedidos-func");
  if (!divLista) return;

  const pedidos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  divLista.innerHTML = "";

  if (pedidos.length === 0) {
    divLista.innerHTML = "<p>Nenhum pedido recebido.</p>";
    return;
  }

  pedidos.forEach((pedido) => {
    const div = document.createElement("div");
    div.className = "pedido-func";
    div.innerHTML = `
      <strong>Pedido ID:</strong> ${pedido.id}<br>
      <strong>Nome:</strong> ${pedido.nomeCliente}<br>
      <strong>Endereço:</strong> ${pedido.endereco}<br>
      <strong>Pagamento:</strong> ${pedido.pagamento}<br>
      <strong>Observações:</strong> ${pedido.observacoes || "Nenhuma"}<br>
      <strong>Itens:</strong>
      <ul>
        ${pedido.itens
          .map((item) => `<li>${item.nome} - R$ ${item.preco.toFixed(2)}</li>`)
          .join("")}
      </ul>
      <strong>Horário:</strong> ${pedido.horario}
    `;
    divLista.appendChild(div);
  });
}

// Função para limpar todos os pedidos no painel de funcionários
function limparPedidos() {
  if (confirm("Tem certeza que deseja limpar todos os pedidos?")) {
    localStorage.removeItem(STORAGE_KEY);
    atualizarPedidosFuncionarios();
  }
}

// Atualiza a lista ao carregar funcionarios.html
if (window.location.pathname.endsWith("funcionarios.html")) {
  atualizarPedidosFuncionarios();
}