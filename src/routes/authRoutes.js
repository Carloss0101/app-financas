import { Router } from "express";
import { login, cadastrar } from "../controllers/authController.js";

const router = Router();

//Login
router.post('/login', login);
router.post('/cadastro', cadastrar);

export default router;