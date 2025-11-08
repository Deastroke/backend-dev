import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import correoRoutes from "./routes/correo.js";

dotenv.config();
const app = express();

// ✅ Permitir solicitudes desde tu frontend en Render
app.use(
  cors({
    origin: ["https://brayan-dev.onrender.com", "http://localhost:5173"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ Middleware para leer JSON
app.use(express.json());

// ✅ Ruta de prueba
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Backend funcionando correctamente ✅" });
});

// ✅ Ruta del formulario
app.use("/api", correoRoutes);

// ✅ Levantar servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
