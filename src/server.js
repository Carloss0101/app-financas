import "dotenv/config"; 
import authRoutes from "./routes/authRoutes.js";
import express from "express";
import { connectMongo } from "./database/mongo.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

connectMongo();
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
