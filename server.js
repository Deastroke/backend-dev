import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import correoRoutes from "./routes/correo.js"; // 👈 asegúrate que la ruta coincida

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Ruta de tu formulario
app.use("/api", correoRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
