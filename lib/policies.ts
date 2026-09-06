import policies, { type Policy } from "@/data/policies"
import { calculatePriorityScore } from "@/lib/scoring"

export function getAllPolicies(): Policy[] {
  return policies
}

export function getPolicyById(id: string): Policy | undefined {
  return policies.find((p) => p.id === id)
}

export function getPoliciesByDomain(domain: Policy["domain"]): Policy[] {
  return policies.filter((p) => p.domain === domain)
}

export function getPoliciesByStatus(status: Policy["status"]): Policy[] {
  return policies.filter((p) => p.status === status)
}

export function filterPolicies(filters: {
  domain?: string
  evidenceStrength?: string
  minImpact?: number
  status?: string
  timeToImpact?: string
}): Policy[] {
  return policies.filter((policy) => {
    if (filters.domain && policy.domain !== filters.domain) return false
    if (filters.evidenceStrength && policy.evidenceStrength !== filters.evidenceStrength) return false
    if (filters.minImpact !== undefined && policy.expectedImpact < filters.minImpact) return false
    if (filters.status && policy.status !== filters.status) return false
    if (filters.timeToImpact && policy.timeToImpact !== filters.timeToImpact) return false
    return true
  })
}

export function sortPolicies(
  policies: Policy[],
  sortBy: "priority" | "impact" | "confidence" | "difficulty",
): Policy[] {
  return [...policies].sort((a, b) => {
    switch (sortBy) {
      case "priority":
        return calculatePriorityScore(b) - calculatePriorityScore(a)
      case "impact":
        return b.expectedImpact - a.expectedImpact
      case "confidence": {
        const confA = a.confidence === "unknown" ? -1 : a.confidence
        const confB = b.confidence === "unknown" ? -1 : b.confidence
        return confB - confA
      }
      case "difficulty":
        return a.implementationDifficulty - b.implementationDifficulty
      default:
        return 0
    }
  })
}
