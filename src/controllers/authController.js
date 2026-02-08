import { validarDadosLogin, validarDadosCadastro } from "../services/authServices.js";
import { gerarToken } from "../services/jtwServices.js";

export function login(req, res) {
    const resultadoValidacao = validarDadosLogin(req.body);

    if (!resultadoValidacao.valido) {
        return res.status(400).json({ mensagem: resultadoValidacao.mensagem });
    }
    const token = gerarToken({ username: req.body.username });
    res.status(200).json({ status: "sucesso", accessToken: token });
}

export function cadastrar(req, res) {   
    const resultadoValidacao = validarDadosCadastro(req.body);

    if (!resultadoValidacao.valido) {
        return res.status(400).json({ mensagem: resultadoValidacao.mensagem });
    }

    const token = gerarToken({ username: req.body.username });
    res.status(201).json({ status: "sucesso", accessToken: token });
}