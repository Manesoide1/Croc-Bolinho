
function adicionarProduto() {
    const container = document.getElementById('produtosContainer');
    const grupo = document.createElement('div');
    grupo.className = 'produto-group';
    grupo.innerHTML = `
        <label>Porção de bolinhos:
          <select class="sabor" required>
            <option value="Bolinho unitário (145g)">Bolinho unitário (145g)</option>
            <option value="Bolinho unitário c/ queijo (145g)">Bolinho unitário c/ queijo (145g)</option>
            <option value="Porção de 3 bolinhos (145g cada)">Porção de 3 bolinhos (145g cada)</option>
            <option value="X-Bolinho">X-Bolinho</option>
            <option value="Salada">Salada</option>
          </select>
        </label>
        <label>Quantidade:
          <input type="number" class="quantidade" min="1" required>
        </label>
      `;
    container.appendChild(grupo);
}

function buscarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado!");
                return;
            }
            document.getElementById('rua').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('estado').value = data.uf;
        })
        .catch(() => {
            alert("Erro ao buscar CEP!");
        });
}

document.getElementById('pedidoForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const pagamento = document.getElementById('pagamento').value;
    const numero = document.getElementById('numero').value;
    const complemento = document.getElementById('complemento').value;
    const rua = document.getElementById('rua').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;

    const endereco = `${rua}, ${numero} ${complemento ? "- " + complemento : ""} - ${bairro}, ${cidade} - ${estado}`;

    // Coletar produtos
    const sabores = document.querySelectorAll('.sabor');
    const quantidades = document.querySelectorAll('.quantidade');
    let listaProdutos = "";

    for (let i = 0; i < sabores.length; i++) {
        const sabor = sabores[i].value;
        const qtd = quantidades[i].value;
        listaProdutos += `• ${qtd}x ${sabor}\n`;
    }

    const mensagem =
        `*Novo Pedido!*

*Nome:* ${nome}
*Itens:*
${listaProdutos}
*Pagamento:* ${pagamento}
*Endereço:* ${endereco}

Obrigado! ❤️`;

    const whatsapp = "5511976632194";
    const url = `https://api.whatsapp.com/send?phone=${whatsapp}&text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
});