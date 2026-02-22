import { renderizarModalDespesa } from "./modais/formDispesa.js";
import { renderizarModalReceita } from "./modais/formReceita.js";
import {solicitacaoAPI} from "./utils/AcessApi.js";
import {getDataAtual, avancarMes, voltarMes, formatarMesAno} from "./utils/monthNavigator.js";

var lancamentos = [];

document.getElementById('nome').textContent = `Olá, ${localStorage.getItem("name")}`;

export async function carregarDados(ano, mes) {
    const url = `lancamento/${ano}/${mes}`;
    const resultado = await solicitacaoAPI(url);   

    lancamentos = resultado?.lancamentos;
    
    atualizarDashboard(lancamentos);
    atualizarTabelaLancamentos(lancamentos);
    
    console.log("Resultado da API:", resultado);
}

function calcularDadosDashboard(dados) {
    const receitas = dados.filter(lancamento => lancamento.tipo === "receita");
    const despesas = dados.filter(lancamento => lancamento.tipo === "despesa");

    const totalReceitas = receitas.reduce((total, lancamento) => {
        return total + lancamento.valor;
    }, 0);

    const totalDespesas = despesas.reduce((total, lancamento) => {
        return total + lancamento.valor;
    }, 0);

    return {
        totalReceitas: totalReceitas?.toFixed(2).replace(".", ","),
        totalDespesas: totalDespesas?.toFixed(2).replace(".", ","),
        saldo: (totalReceitas - totalDespesas)?.toFixed(2).replace(".", ",")
    };
}

function atualizarDashboard(lancamentos) {
    const dadosDashboard = calcularDadosDashboard(lancamentos);

    document.getElementById("receita").textContent = `R$ ${dadosDashboard.totalReceitas}`;
    document.getElementById("despesa").textContent = `R$ ${dadosDashboard.totalDespesas}`;
    const saldo = document.getElementById("saldo");
    saldo.textContent = `R$ ${dadosDashboard.saldo}`;  
    saldo.style.color = parseFloat(dadosDashboard.saldo) >= 0 ? "#22c55e" : "#ef4444";
    

    console.log("Dashboard atualizado com sucesso!");
}

export function atualizarTabelaLancamentos(lancamentos) {
    const tabela = document.getElementById("tabela-lancamentos");
    tabela.innerHTML = `
        <tr>
            <th>Tipo</th>
            <th>Data</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Ações</th>
        </tr>
    `;
    for (const lancamento of lancamentos) {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <th><span class="tipo-${lancamento.tipo}">${lancamento.tipo}</span></th>
            <td>${new Date(lancamento.data).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</td>
            <td>${lancamento.descricao}</td>
            <td>R$ ${lancamento.valor?.toFixed(2)?.replace(".", ",")}</td>
            <td>${lancamento.categoria}</td>
            <td>
                <button class="btn-acao editar" data-id="${lancamento}">Editar</button>
                <button class="btn-acao excluir" data-id="${lancamento._id}">Excluir</button>
            </td>
        `;

        linha.querySelector(".editar").addEventListener("click", () => {
            editarLancamento(lancamento);
        });

        linha.querySelector(".excluir").addEventListener("click", () => {
            deletarLancamento(lancamento._id);
        });

        tabela.appendChild(linha);
    }
}

document.getElementById('adicionar-despesa').onclick = renderizarModalDespesa;
document.getElementById('adicionar-receita').onclick = renderizarModalReceita;

const spanMes = document.getElementById("mesAtual");

export async function renderizarMes() {
    const data = getDataAtual();
    const ano = data.getFullYear();
    const mes = data.getMonth() + 1;

    spanMes.textContent = formatarMesAno(data);
    await carregarDados(ano, mes);
}

document.getElementById("proximoMes").addEventListener("click", () => {
    avancarMes();
    renderizarMes();
});

document.getElementById("mesAnterior").addEventListener("click", () => {
    voltarMes();
    renderizarMes();
});

renderizarMes();

async function deletarLancamento(id) {
    console.log("ID do lançamento a ser deletado:", id);
    const confirmacao = confirm("Tem certeza que deseja excluir este lançamento?");
    if (confirmacao) {
        const resultado = await solicitacaoAPI(`lancamento/${id}`, "DELETE");

        if(resultado.status === "sucesso") {
            await renderizarMes();
        }
    }
}

async function editarLancamento(lancamento) {
    if (lancamento.tipo === "despesa") {

        renderizarModalDespesa(
            lancamento._id,
            lancamento.descricao,
            lancamento.valor,
            lancamento.categoria,
            lancamento.data
        );

    } else if (lancamento.tipo === "receita") {

        renderizarModalReceita(
            lancamento._id,
            lancamento.descricao,
            lancamento.valor,
            lancamento.categoria,
            lancamento.data
        );

    }
}