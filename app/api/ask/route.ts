import { NextRequest, NextResponse } from "next/server"
import { createAIProvider } from "@/lib/ai/provider"
import { getAllPolicies } from "@/lib/policies"

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json()

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "question is required and must be a string" },
        { status: 400 },
      )
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    const provider = createAIProvider(apiKey)
    const policies = getAllPolicies()

    const context = {
      policies: policies.map((p) => ({
        id: p.id,
        title: p.title,
        domain: p.domain,
        evidenceStrength: p.evidenceStrength,
        confidence: p.confidence,
      })),
    }

    const response = await provider.ask(question, context)
    return NextResponse.json(response)
  } catch (err) {
    console.error("API /ask error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}
