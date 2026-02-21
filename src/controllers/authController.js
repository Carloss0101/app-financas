import { validarDadosLogin, validarDadosCadastro, verificarCredenciais, salvarUsuario } from "../services/authServices.js";
import { gerarToken } from "../services/jtwServices.js";

export async function login(req, res) {
    const resultadoValidacao = validarDadosLogin(req.body);

    if (!resultadoValidacao.valido) {
        return res.status(400).json({ status: false, mensagem: resultadoValidacao.mensagem });
    }

    const resultadoCredenciais = await verificarCredenciais(req.body);

    if (!resultadoCredenciais.valido) {
        return res.status(401).json({ status: false, mensagem: resultadoCredenciais.mensagem });
    }
    
    const token = gerarToken({ id: resultadoCredenciais.usuario._id });

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 30 
    });

    const usuarioSeguro = {
        userid: resultadoCredenciais.usuario._id,
        username: resultadoCredenciais.usuario.username,
        email: resultadoCredenciais.usuario.email
    };

    res.status(200).json({ status: true, usuario: usuarioSeguro, accessToken: token });
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

    const usuarioSeguro = {
        userid: resultadoSalvamento.usuario._id,
        username: resultadoSalvamento.usuario.username,
        email: resultadoSalvamento.usuario.email
    };
    res.status(201).json({ usuario: usuarioSeguro, accessToken: token });
}