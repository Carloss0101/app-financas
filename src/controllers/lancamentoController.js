import { validarDadosLancamento, salvarLancamento, salvarEditLancamento, buscarLancamentosPorUsuario, deletarLancamentosPorId } from "../services/lancamentoServices.js";

export async function criarLancamento(req, res) {
    console.log("Dados recebidos para criação de lançamento:", req.body);
    const resultadoValidacao = validarDadosLancamento(req.body);
    
    if (!resultadoValidacao.valido) {
        return res.status(400).json({ mensagem: resultadoValidacao.mensagem });
    }
    
    const resultadoCadastro = await salvarLancamento(req.body, req.usuario.id);
    
    if (!resultadoCadastro.sucesso) {
        return res.status(500).json({ mensagem: resultadoCadastro.mensagem });
    }

    return res.status(201).json({ status: "sucesso", mensagem: "Lançamento criado com sucesso.", lancamento: resultadoCadastro.lancamento });
}

export async function getLancamentos(req, res) {
    const resultadoLancamentos = await buscarLancamentosPorUsuario(req.usuario.id, req.params?.ano, req.params?.mes);

    if (!resultadoLancamentos.sucesso) {
        return res.status(500).json({ mensagem: resultadoLancamentos.mensagem });
    }

    return res.status(200).json({ status: "sucesso", lancamentos: resultadoLancamentos.lancamentos });
}

export async function deleteLancamento(req, res) {
    const resultadoLancamentos = await deletarLancamentosPorId(req.usuario.id, req.params.id);

    if (!resultadoLancamentos.sucesso) {
        return res.status(500).json({ mensagem: resultadoLancamentos.mensagem });
    }

    return res.status(200).json({ status: "sucesso", mensagem: "Lançamento deletado com sucesso." });
}

export async function editarLancamento(req, res) {
    console.log("Dados recebidos para edição de lançamento:", req.body);
    const resultadoValidacao = validarDadosLancamento(req.body);

    if (!resultadoValidacao.valido) {
        return res.status(400).json({ mensagem: resultadoValidacao.mensagem });
    }

    const resultadoEdicao = await salvarEditLancamento(req.body, req.usuario.id);

    if (!resultadoEdicao.sucesso) {
        return res.status(500).json({ mensagem: resultadoEdicao.mensagem });
    }

    return res.status(200).json({ status: "sucesso", mensagem: "Lançamento editado com sucesso.", lancamento: resultadoEdicao.lancamento });

}