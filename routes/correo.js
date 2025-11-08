import express from "express";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/enviar", async (req, res) => {
  const { nombre, telefono, email, servicio, mensaje } = req.body;

  try {
    const data = await resend.emails.send({
      from: "Formulario Web <onboarding@resend.dev>", // Dirección de envío (Resend)
      to: "brayanryv2003@gmail.com", // Tu correo de destino
      subject: `Nuevo mensaje de ${nombre}`,
      html: `
        <h2>Nuevo mensaje desde tu formulario web</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Servicio:</strong> ${servicio}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    });

    console.log("✅ Correo enviado correctamente:", data);
    res.json({ success: true, message: "Correo enviado correctamente", data });
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    res.status(500).json({ success: false, message: "Error al enviar correo", error });
  }
});

export default router;
