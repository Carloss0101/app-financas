import express, { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { exibirPaginaLogin, exibirPaginaCadastro, exibirPaginaIndex } from "../controllers/pagesController.js";
import { autenticacao } from "../middlewares/authMiddleware.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.use("/public", express.static(path.join(__dirname, "../../public")));

// Páginas Publicas
router.get("/login", exibirPaginaLogin);
router.get("/cadastro", exibirPaginaCadastro);

//Paginas protegidas

router.get('/', autenticacao, exibirPaginaIndex);
router.get('/index', autenticacao, exibirPaginaIndex);
export default router;