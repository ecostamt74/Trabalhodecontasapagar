let contas = [];

// Função para registrar nova conta
function registrarConta(event) {
    event.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
    const vencimento = document.getElementById('vencimento').value;

    const novaConta = {
        descricao: descricao,
        valor: valor,
        vencimento: vencimento
    };

    contas.push(novaConta);
    exibirContas();
    salvarDadosLocalStorage(); // Salva os dados no localStorage
    event.target.reset(); // Limpa o formulário após o registro
}

// Função para exibir as contas registradas
function exibirContas() {
    const listaContas = document.getElementById('listaContas');
    listaContas.innerHTML = '';

    contas.forEach((conta, index) => {
        const li = document.createElement('li');
        li.textContent = `Descrição: ${conta.descricao} - Valor: R$ ${conta.valor} - Vencimento: ${conta.vencimento}`;
        listaContas.appendChild(li);
    });
}

// Função para exportar dados para um arquivo TXT
function exportarParaTxt() {
    let texto = '';

    contas.forEach(conta => {
        texto += `Descrição: ${conta.descricao}, Valor: R$ ${conta.valor}, Vencimento: ${conta.vencimento}\n`;
    });

    const blob = new Blob([texto], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'contas_a_pagar.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Função para carregar dados salvos no localStorage
function carregarDadosLocalStorage() {
    const dados = localStorage.getItem('contas');
    if (dados) {
        contas = JSON.parse(dados);
        exibirContas();
    }
}

// Função para salvar os dados no localStorage
function salvarDadosLocalStorage() {
    localStorage.setItem('contas', JSON.stringify(contas));
}

// Event listeners
document.getElementById('formRegistro').addEventListener('submit', registrarConta);
document.getElementById('exportarTxt').addEventListener('click', exportarParaTxt);

// Carregar dados do localStorage ao iniciar a página
carregarDadosLocalStorage();
