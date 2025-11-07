import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import correoRoutes from "./routes/correo.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST"],
}));
app.use(express.json());

// Ruta del formulario
app.use("/api/correo", correoRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
