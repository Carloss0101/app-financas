import { renderizarModalDespesa } from "./modais/formDispesa.js";
import {solicitacaoAPI} from "./utils/AcessApi.js";
var lancamentos = [];

export async function carregarDados() {
    const url = "http://localhost:3000/lancamento/2";
    const resultado = await solicitacaoAPI(url);   

    lancamentos = resultado?.lancamentos;
    
    atualizarDashboard(lancamentos);
    atualizarTabelaLancamentos(lancamentos);
    
    console.log("Resultado da API:", resultado);
}

await carregarDados();

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
            <td>${new Date(lancamento.data).toLocaleDateString("pt-BR")}</td>
            <td>${lancamento.descricao}</td>
            <td>R$ ${lancamento.valor?.toFixed(2)?.replace(".", ",")}</td>
            <td>${lancamento.categoria}</td>
            <td>
                <button class="btn-acao editar">Editar</button>
                <button class="btn-acao excluir">Excluir</button>
            </td>
        `;
        tabela.appendChild(linha);
    }
}

document.getElementById('adicionar-despesa').onclick = renderizarModalDespesa;
