import { validarDadosLancamento, salvarLancamento, buscarLancamentosPorUsuario } from "../services/lancamentoServices.js";

export async function criarLancamento(req, res) {
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
    console.log("Obtendo lançamentos para usuário: ", req.usuario.id);
    const resultadoLancamentos = await buscarLancamentosPorUsuario(req.usuario.id);

    if (!resultadoLancamentos.sucesso) {
        return res.status(500).json({ mensagem: resultadoLancamentos.mensagem });
    }

    return res.status(200).json({ status: "sucesso", lancamentos: resultadoLancamentos.lancamentos });
}