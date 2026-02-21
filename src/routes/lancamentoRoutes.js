import { Router } from "express";
import { autenticacao } from "../middlewares/authMiddleware.js";
import {criarLancamento, getLancamentos, deleteLancamento, editarLancamento } from "../controllers/lancamentoController.js";

const router = Router();

//Lançamentos (Receitas ou Despesas)
router.post('/', autenticacao, criarLancamento);
router.get('/:ano/:mes', autenticacao, getLancamentos );
router.put('/', autenticacao, editarLancamento);
router.delete('/:id', autenticacao, deleteLancamento);

export default router;