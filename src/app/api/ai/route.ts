import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
    })

    return NextResponse.json({
      response: completion.choices[0].message?.content ?? "Sin respuesta",
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ response: "Error en la IA" })
  }
}
