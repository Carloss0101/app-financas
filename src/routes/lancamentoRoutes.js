import { Router } from "express";
import { autenticacao } from "../middlewares/authMiddleware.js";
import {criarLancamento, getLancamentos, deleteLancamento } from "../controllers/lancamentoController.js";

const router = Router();

//Lançamentos (Receitas ou Despesas)
router.post('/', autenticacao, criarLancamento);
router.get('/:ano/:mes', autenticacao, getLancamentos );
//router.put('/:id');
router.delete('/:id', autenticacao, deleteLancamento);

export default router;