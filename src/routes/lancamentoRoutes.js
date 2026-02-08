import { Router } from "express";
import { autenticacao } from "../middlewares/authMiddleware.js";
import {criarLancamento } from "../controllers/lancamentoController.js";

const router = Router();

//Lançamentos (Receitas ou Despesas)
router.post('/', autenticacao, criarLancamento);
//router.get('/');
//router.get('/:id');
//router.put('/:id');
//router.delete('/:id');

export default router;