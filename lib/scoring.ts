// Priority Score: (expectedImpact * evidenceWeight * confidence) / implementationDifficulty
// Normalized 0-100. Clearly labeled "Experimental prioritisation model"

type EvidenceStrength = "very-low" | "low" | "medium" | "high"
const evidenceWeights: Record<EvidenceStrength, number> = {
  "very-low": 0.2,
  "low": 0.4,
  "medium": 0.7,
  "high": 1.0,
}

export function calculatePriorityScore(policy: {
  expectedImpact: number
  evidenceStrength: EvidenceStrength
  confidence: number | "unknown"
  implementationDifficulty: number
}): number {
  const confidence = policy.confidence === "unknown" ? 30 : policy.confidence
  const evidenceWeight = evidenceWeights[policy.evidenceStrength]
  const raw = (policy.expectedImpact * evidenceWeight * (confidence / 100)) / policy.implementationDifficulty
  // Normalize: max raw score = (5 * 1.0 * 1.0) / 1 = 5, min = (1 * 0.2 * 0) / 5 = 0
  return Math.round((raw / 5) * 100)
}

export { evidenceWeights }
export const SCORING_LABEL = "Experimental prioritisation model — not a policy recommendation"
