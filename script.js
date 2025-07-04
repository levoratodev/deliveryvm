let pedidos = [];

function adicionarPedido(nome, preco) {
  pedidos.push({ nome, preco });
  atualizarLista();
}

function atualizarLista() {
  const lista = document.getElementById("lista-pedido");
  lista.innerHTML = "";
  pedidos.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    lista.appendChild(li);
  });
}

function enviarPedido() {
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const pagamento = document.getElementById("pagamento").value;

  if (!nome || !endereco) {
    alert("Por favor, preencha nome e endereço.");
    return;
  }

  let resumo = `Novo pedido de ${nome}:\n\n`;
  pedidos.forEach(item => resumo += `- ${item.nome} (R$ ${item.preco.toFixed(2)})\n`);
  resumo += `\nEndereço: ${endereco}\nPagamento: ${pagamento}`;

  alert(resumo); // Simula envio

  // Limpar tudo
  pedidos = [];
  atualizarLista();
  document.getElementById("nome").value = "";
  document.getElementById("endereco").value = "";
}