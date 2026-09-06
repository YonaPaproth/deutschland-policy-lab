"use client"

import { useState, useRef, useEffect } from "react"
import { useLang } from "@/lib/i18n/use-lang"
import { translations } from "@/lib/i18n/translations"
import type { AIResponse } from "@/lib/ai/provider"

interface Message {
  role: "user" | "assistant"
  content: string
  confidence?: AIResponse["confidence"]
  isDemoMode?: boolean
}

function ConfidenceChip({ confidence, label }: { confidence?: AIResponse["confidence"]; label: string }) {
  if (!confidence || confidence === "demo") return null

  const styles =
    confidence === "high"
      ? "bg-green-50 text-green-700 ring-1 ring-green-200"
      : confidence === "medium"
        ? "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200"
        : "bg-red-50 text-red-700 ring-1 ring-red-200"

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles}`}>
      {confidence} {label}
    </span>
  )
}

function MessageBubble({ message, demoLabel }: { message: Message; demoLabel: string }) {
  const isUser = message.role === "user"
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[70%] ${
          isUser
            ? "bg-blue-50 text-slate-900"
            : "bg-white text-slate-800 shadow-sm border border-slate-100"
        }`}
      >
        {message.isDemoMode && (
          <div className="mb-2 flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5">
            <span className="text-xs text-amber-700">{demoLabel}</span>
          </div>
        )}
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </div>
        {message.confidence && (
          <div className="mt-2">
            <ConfidenceChip confidence={message.confidence} label="confidence" />
          </div>
        )}
      </div>
    </div>
  )
}

function LoadingBubble() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[70%] rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-slate-300 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AskPage() {
  const lang = useLang()
  const T = translations[lang]
  const A = T.ask

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  async function sendMessage(question: string) {
    if (!question.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: question.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.trim(),
          conversationHistory: messages,
        }),
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      const data: AIResponse = await res.json()
      const assistantMessage: Message = {
        role: "assistant",
        content: data.answer,
        confidence: data.confidence,
        isDemoMode: data.isDemoMode,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch {
      const errorMessage: Message = {
        role: "assistant",
        content: A.errorMsg,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    sendMessage(input)
  }

  const isEmpty = messages.length === 0

  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col">
      {/* Header */}
      <div className="shrink-0 border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
        <h1 className="text-xl font-bold text-slate-900">{A.title}</h1>
        <p className="mt-0.5 text-sm text-slate-500">{A.subtitle}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-5">
          {isEmpty && (
            <div className="py-8 text-center">
              <p className="mb-6 text-sm text-slate-500">{A.promptHint}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {A.suggestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} demoLabel={A.demoMode} />
          ))}

          {isLoading && <LoadingBubble />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          {!isEmpty && (
            <div className="mb-3 flex flex-wrap gap-2">
              {A.suggestions.slice(0, 3).map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500 hover:border-blue-200 hover:text-blue-600"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={A.placeholder}
              disabled={isLoading}
              className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {A.send}
            </button>
          </form>
          <p className="mt-2 text-xs text-slate-400">{A.disclaimer}</p>
        </div>
      </div>
    </div>
  )
}
