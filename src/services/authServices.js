import bcrypt from "bcryptjs";
import User from "../models/user.js";

export function validarDadosLogin(dados) {
    if (!dados?.username || dados?.username.trim() === "") {
        return { valido: false, mensagem: "Nome de usuário é obrigatório." };
    }

    if (!dados?.password || dados?.password.trim() === "") {
        return { valido: false, mensagem: "Senha é obrigatória." };
    }

    return { valido: true, mensagem: "Dados válidos." };
}

export async function verificarUsuarioExistente(dados) {
    const usuario = await User.findOne({
        $or: [
            { username: dados.username },
            { email: dados.email }
        ]
    });

    if (usuario) {
        if (usuario.username === dados.username) {
            return { valido: false, mensagem: "Username já está em uso." };
        }

        if (usuario.email === dados.email) {
            return { valido: false, mensagem: "Email já está em uso." };
        }
    }

    return { valido: true };
}

export async function validarDadosCadastro(dados) {
    if (!dados?.username || dados?.username.trim() === "" || dados?.username.length < 3) {
        return { valido: false, mensagem: "Nome de usuário é obrigatório." };
    }

    if (!dados?.email || dados?.email.trim() === "" || !/\S+@\S+\.\S+/.test(dados?.email)) {
        return { valido: false, mensagem: "Email é obrigatório e deve ser válido." };
    }

    if (!dados?.password || dados?.password.trim() === "" || dados?.password.length < 6) {
        return { valido: false, mensagem: "Senha é obrigatória e deve ter pelo menos 6 caracteres." };
    }

    const resultadoVerificacao = await verificarUsuarioExistente(dados);
    if (!resultadoVerificacao.valido) {
        return resultadoVerificacao;
    }

    return { valido: true, mensagem: "Dados válidos." };
}


export async function salvarUsuario(dados) {
    try {
        const senhaCriptografada = await bcrypt.hash(dados.password, 10);

        const usuario = await User.create({
            username: dados.username,
            email: dados.email,
            password: senhaCriptografada
        });

        return { sucesso: true, mensagem: "Usuário cadastrado com sucesso.", usuario };
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        return { sucesso: false, mensagem: "Erro ao cadastrar usuário." };
    }
}

export async function verificarCredenciais(dados) {
    const usuario = await User.findOne({ username: dados.username }); 

    if (!usuario) {
        return { valido: false, mensagem: "Credenciais inválidas." };
    }

    const senhaValida = await bcrypt.compare(dados.password, usuario.password);

    if (!senhaValida) {
        return { valido: false, mensagem: "Credenciais inválidas." };
    }

    return { valido: true, usuario };
}