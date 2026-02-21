import { validarToken } from "../services/jtwServices.js";

export function autenticacao(req, res, next) {
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    if (!token && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    console.log("Token extraído:", token ? "Token encontrado" : "Nenhum token");

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const decoded = validarToken(token);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.redirect("/login");
    }
}
