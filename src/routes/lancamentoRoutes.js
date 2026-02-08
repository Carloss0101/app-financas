import { Router } from "express";
import { autenticacao } from "../middlewares/authMiddleware.js";
import {criarLancamento, getLancamentos } from "../controllers/lancamentoController.js";
import { get } from "mongoose";

const router = Router();

//Lançamentos (Receitas ou Despesas)
router.post('/', autenticacao, criarLancamento);
router.get('/', autenticacao, getLancamentos );
//router.put('/:id');
//router.delete('/:id');

export default router;