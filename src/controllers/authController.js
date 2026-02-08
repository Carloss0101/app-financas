import { validarDadosLogin, validarDadosCadastro, verificarCredenciais, salvarUsuario } from "../services/authServices.js";
import { gerarToken } from "../services/jtwServices.js";

export async function login(req, res) {
    const resultadoValidacao = validarDadosLogin(req.body);

    if (!resultadoValidacao.valido) {
        return res.status(400).json({ mensagem: resultadoValidacao.mensagem });
    }

    const resultadoCredenciais = await verificarCredenciais(req.body);

    if (!resultadoCredenciais.valido) {
        return res.status(401).json({ mensagem: resultadoCredenciais.mensagem });
    }
    
    console.log("Usuário autenticado com sucesso:", resultadoCredenciais);
    console.log("Usuário autenticado com sucesso:", resultadoCredenciais.usuario._id);
    const token = gerarToken({ id: resultadoCredenciais.usuario._id });
    res.status(200).json({ resultadoCredenciais, accessToken: token });
}

export async function cadastrar(req, res) {   
    const resultadoValidacao = await validarDadosCadastro(req.body);

    if (!resultadoValidacao.valido) {
        return res.status(400).json({ mensagem: resultadoValidacao.mensagem });
    }

    const resultadoSalvamento = await salvarUsuario(req.body);

    if (!resultadoSalvamento.sucesso) {
        return res.status(500).json({ mensagem: resultadoSalvamento.mensagem });
    }

    const token = gerarToken({ id: resultadoSalvamento.usuario._id });
    res.status(201).json({ resultadoSalvamento, accessToken: token });
}