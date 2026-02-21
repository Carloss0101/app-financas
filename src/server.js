import "dotenv/config"; 
import express from "express";
import { connectMongo } from "./database/mongo.js";

import authRoutes from "./routes/authRoutes.js";
import lancamento from "./routes/lancamentoRoutes.js";
import pagesRoutes from "./routes/pagesRoutes.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

// Rotas de páginas
app.use("/", pagesRoutes);

app.use("/auth", authRoutes);
app.use("/lancamento", lancamento);

connectMongo();
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
