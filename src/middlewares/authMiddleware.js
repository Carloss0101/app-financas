import { validarToken } from "../services/jtwServices.js";

export function autenticacao(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ mensagem: "Token não fornecido." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = validarToken(token);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ mensagem: "Token inválido ou expirado." });
    }
}
