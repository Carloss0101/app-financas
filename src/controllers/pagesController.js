import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Paginas de autenticação (Publico)
export function exibirPaginaLogin(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../../public/html/login.html"));
}

export function exibirPaginaCadastro(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../../public/html/cadastro.html"));
}