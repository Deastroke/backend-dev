import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// 🔹 Ajuste CORS para producción
app.use(cors({
  origin: ["http://localhost:5173", "https://brayan-dev.onrender.com"]
}));

app.use(express.json());

app.post("/enviar-correo", async (req, res) => {
  const { nombre, telefono, email, servicio, mensaje } = req.body;

  if (!nombre || !telefono || !email || !servicio || !mensaje) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Nuevo mensaje de ${nombre}`,
      text: `
📩 Nuevo mensaje recibido desde el formulario de contacto

👤 Nombre: ${nombre}
📞 Teléfono: ${telefono}
📧 Correo: ${email}
🧩 Servicio: ${servicio}

💬 Mensaje:
${mensaje}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado correctamente");
    res.status(200).json({ ok: true, mensaje: "Correo enviado correctamente" });
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    res.status(500).json({ error: "Error al enviar el correo" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
