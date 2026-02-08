export function validarDadosLogin(dados) {
    if (!dados?.username || dados?.username.trim() === "") {
        return { valido: false, mensagem: "Nome de usuário é obrigatório." };
    }

    if (!dados?.password || dados?.password.trim() === "") {
        return { valido: false, mensagem: "Senha é obrigatória." };
    }

    return { valido: true, mensagem: "Dados válidos." };
}

export function validarDadosCadastro(dados) {
    if (!dados?.username || dados?.username.trim() === "" || dados?.username.length < 3) {
        return { valido: false, mensagem: "Nome de usuário é obrigatório." };
    }

    if (!dados?.email || dados?.email.trim() === "" || !/\S+@\S+\.\S+/.test(dados?.email)) {
        return { valido: false, mensagem: "Email é obrigatório e deve ser válido." };
    }

    if (!dados?.password || dados?.password.trim() === "" || dados?.password.length < 6) {
        return { valido: false, mensagem: "Senha é obrigatória e deve ter pelo menos 6 caracteres." };
    }

    return { valido: true, mensagem: "Dados válidos." };
}