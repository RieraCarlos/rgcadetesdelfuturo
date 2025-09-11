import 'dotenv/config';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Inicializamos Gemini con la API Key de .env
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// Ruta principal para la IA
app.post("/api/ai", async (req, res) => {
  const { messages } = req.body;

  try {
    // Convertimos los mensajes en un prompt
    const prompt = messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n") + "\nPor favor, responde solo en español.";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    res.json({ response: result.response.text() || "Sin respuesta" });
  } catch (err) {
    console.error("Error Gemini:", err);
    res.status(500).json({ response: "Error en la IA" });
  }
});

// Levantamos el servidor
app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));
