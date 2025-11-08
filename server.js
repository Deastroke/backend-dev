import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import correoRoutes from "./routes/correo.js"; // 👈 asegúrate que la ruta coincida

dotenv.config();
const app = express();

// Configura CORS para permitir tu frontend
app.use(cors({
  origin: "https://brayan-dev.onrender.com", // reemplaza con tu URL de frontend
  methods: ["GET", "POST"],
}));

app.use(express.json());

// Ruta de prueba
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Backend funcionando correctamente ✅" });
});

// Ruta de tu formulario
app.use("/api", correoRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
