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
      from: "Formulario <onboarding@resend.dev>", // si verificas tu dominio puedes cambiar esto
      to: "brayanryv2003@gmail.com", // correo donde recibirás los mensajes
      subject: `📩 Nuevo mensaje de ${nombre}`,
      html: `
        <h2>Nuevo mensaje desde el formulario de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Servicio:</strong> ${servicio}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
        <hr />
        <small>Este mensaje fue enviado automáticamente desde tu sitio web.</small>
      `,
    });

    res.json({ success: true, message: "Correo enviado correctamente", data });
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
    res.status(500).json({ success: false, message: "Error al enviar el correo" });
  }
});

export default router;
