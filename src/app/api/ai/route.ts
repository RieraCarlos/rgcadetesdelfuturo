import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  try {
    // Convertimos historial a un solo prompt
    const prompt = messages.map((m: any) => `${m.role}: ${m.content}`).join("\n")

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const result = await model.generateContent(prompt)

    return NextResponse.json({
      response: result.response.text() ?? "Sin respuesta",
    })
  } catch (error) {
    console.error("Error en Gemini:", error)
    return NextResponse.json({ response: "Error en la IA" }, { status: 500 })
  }
}
