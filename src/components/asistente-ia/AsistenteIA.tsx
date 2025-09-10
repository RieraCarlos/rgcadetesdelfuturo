"use client"

import * as React from "react"

export function AsistenteIA() {
  const [input, setInput] = React.useState("")
  const [messages, setMessages] = React.useState<{ role: string; content: string }[]>([])
  const [loading, setLoading] = React.useState(false)

  const handleSend = async () => {
    if (!input) return
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (error) {
      console.error(error)
      setMessages((prev) => [...prev, { role: "assistant", content: "Error de conexión" }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.role === "user" ? "text-right" : "text-left"}>
            <p className="p-2 rounded-md bg-gray-200 inline-block">{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Escribe tu mensaje..."
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </div>
  )
}
