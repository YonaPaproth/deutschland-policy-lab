import Anthropic from "@anthropic-ai/sdk"

export interface PolicyContext {
  policies: Array<{
    id: string
    title: string
    domain: string
    evidenceStrength: string
    confidence: number | "unknown"
  }>
}

export interface AIResponse {
  answer: string
  confidence: "low" | "medium" | "high" | "demo"
  sources: string[]
  isDemoMode: boolean
}

export interface AIProvider {
  ask(question: string, context: PolicyContext): Promise<AIResponse>
}

const SYSTEM_PROMPT = `You are a non-partisan policy research assistant for Deutschland Policy Lab.
Your role is to help users understand policy evidence and options for Germany.

RULES:
- Always separate evidence from speculation
- Explicitly mention uncertainty
- Never present assumptions as facts
- Show counterarguments to any recommendation
- Cite specific policies from the database when relevant (use their IDs)
- Reference international examples with specific countries
- Avoid partisan framing — never mention parties
- Structure every response: Answer → Evidence → Examples → Trade-offs → Confidence → Open questions`

export class AnthropicProvider implements AIProvider {
  private client: Anthropic

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey })
  }

  async ask(question: string, context: PolicyContext): Promise<AIResponse> {
    const contextSummary =
      context.policies.length > 0
        ? `\n\nRelevant policies in database:\n${context.policies
            .map(
              (p) =>
                `- [${p.id}] ${p.title} (domain: ${p.domain}, evidence: ${p.evidenceStrength}, confidence: ${p.confidence})`,
            )
            .join("\n")}`
        : ""

    const response = await this.client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `${question}${contextSummary}`,
        },
      ],
    })

    const textBlock = response.content.find((block) => block.type === "text")
    const answer = textBlock ? textBlock.text : "No response generated."

    return {
      answer,
      confidence: "medium",
      sources: [],
      isDemoMode: false,
    }
  }
}

export class DemoProvider implements AIProvider {
  async ask(question: string, context: PolicyContext): Promise<AIResponse> {
    const policyCount = context.policies.length
    const domainList = [...new Set(context.policies.map((p) => p.domain))].join(", ")

    const answer = `**Demo Mode — AI assistant not active**

In a live deployment, this assistant would analyse your question: "${question}"

Here is what a full response would include:

**Answer:** A direct, evidence-based response to your question drawing on the policy database and peer-reviewed research.

**Evidence:** Citations from the ${policyCount} ${policyCount === 1 ? "policy" : "policies"} in the database${domainList ? ` spanning domains: ${domainList}` : ""}, cross-referenced with academic and institutional sources.

**Examples:** International comparisons — e.g. how Denmark, Estonia, or Sweden have approached similar policy challenges — with explicit caveats about transferability.

**Trade-offs:** A structured overview of who benefits and who bears costs, including distributional effects and second-order consequences.

**Confidence:** An explicit confidence rating (low / medium / high) with explanation of the key uncertainties.

**Open questions:** The research gaps and empirical questions that would need to be answered before higher confidence could be warranted.

---
To enable the AI assistant, provide an Anthropic API key via the \`ANTHROPIC_API_KEY\` environment variable.`

    return {
      answer,
      confidence: "demo",
      sources: [],
      isDemoMode: true,
    }
  }
}

export function createAIProvider(apiKey?: string): AIProvider {
  if (apiKey) {
    return new AnthropicProvider(apiKey)
  }
  return new DemoProvider()
}
