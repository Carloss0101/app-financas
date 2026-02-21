import Lancamento from "../models/Lancamento.js";

export function validarDadosLancamento(dados) {
    if (!dados?.tipo || !["receita", "despesa"].includes(dados.tipo)) {
        return { valido: false, mensagem: "Tipo deve ser 'receita' ou 'despesa'." };
    }

    if (!dados?.descricao || dados.descricao.trim() === "") {
        return { valido: false, mensagem: "Descrição é obrigatória." };
    }

    if (typeof dados.valor !== "number" || dados.valor <= 0) {
        return { valido: false, mensagem: "Valor deve ser um número maior que zero." };
    }

    if (!dados?.categoria || dados.categoria.trim() === "") {
        return { valido: false, mensagem: "Categoria é obrigatória." };
    }

    if (dados?.data && isNaN(new Date(dados.data).getTime())) {
        return { valido: false, mensagem: "Data inválida." };
    }

    if (dados?.recorrente !== undefined && typeof dados.recorrente !== "boolean") {
        return { valido: false, mensagem: "Recorrente deve ser true ou false." };
    }

    return { valido: true, mensagem: "Dados válidos." };
}


export async function salvarLancamento(dados, userId) {
    try {
        const lancamento = await Lancamento.create({
            userId: userId,
            tipo: dados.tipo,
            descricao: dados.descricao,
            valor: dados.valor,
            categoria: dados.categoria,
            data: dados.data ? new Date(dados.data) : new Date(),
            recorrente: dados.recorrente ?? false
        });

        return {
            sucesso: true,
            mensagem: "Lançamento salvo com sucesso.",
            lancamento
        };

    } catch (error) {
        console.error("Erro ao cadastrar Lançamento: ", error);
        return { sucesso: false, mensagem: "Erro ao cadastrar lançamento." };
    }

}

export async function buscarLancamentosPorUsuario(userId, ano, mes) {
    try {
        console.log("ANO recebido:", ano);
        console.log("MES recebido:", mes);
        const anoNumero = parseInt(ano);
        const mesNumero = parseInt(mes);

        const dataInicio = new Date(anoNumero, mesNumero - 1, 1);
        const dataFim = new Date(anoNumero, mesNumero, 1);
        
        const lancamentos = await Lancamento.find({
            userId: userId,
            data: {
                $gte: dataInicio,
                $lt: dataFim
            }

        }).sort({ data: 1 });
        return {
            sucesso: true,
            lancamentos
        };
    } catch (error) {
        console.error("Erro ao buscar Lançamentos: ", error);
        return {
            sucesso: false,
            mensagem: "Erro ao buscar lançamentos."
        };
    }
}

export async function deletarLancamentosPorId(userId, lancamentoId) {
    try {
        const resultado = await Lancamento.deleteOne({ _id: lancamentoId, userId: userId });

        if (resultado.deletedCount === 0) {
            return {
                sucesso: false,
                mensagem: "Lançamento não encontrado ou não pertence a este usuário."
            };
        }

        return {
            sucesso: true,
            mensagem: "Lançamento deletado com sucesso."
        };
    } catch (error) {
        console.error("Erro ao deletar lançamento: ", error);
        return { sucesso: false, mensagem: "Erro ao deletar lançamento." };
    }
}
