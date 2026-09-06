import { describe, it, expect } from "vitest"
import { getAllPolicies } from "@/lib/policies"

const VALID_EVIDENCE_STRENGTHS = ["very-low", "low", "medium", "high"] as const

const REQUIRED_FIELDS: Array<keyof ReturnType<typeof getAllPolicies>[number]> = [
  "id",
  "title",
  "domain",
  "problem",
  "objective",
  "intervention",
  "status",
  "evidenceStrength",
  "expectedImpact",
  "implementationDifficulty",
  "estimatedCost",
  "timeToImpact",
  "confidence",
  "affectedGroups",
  "internationalExamples",
  "risks",
  "tradeoffs",
  "kpis",
  "sources",
  "counterarguments",
  "openQuestions",
  "whatWouldChangeOurMind",
  "lastReviewed",
]

describe("getAllPolicies", () => {
  const policies = getAllPolicies()

  describe("count", () => {
    it("returns exactly 18 policies", () => {
      expect(policies).toHaveLength(18)
    })
  })

  describe("required fields", () => {
    it("every policy has all required fields", () => {
      for (const policy of policies) {
        for (const field of REQUIRED_FIELDS) {
          expect(
            policy[field],
            `Policy "${policy.id}" is missing field "${field}"`,
          ).toBeDefined()
        }
      }
    })

    it("every policy has a non-empty title", () => {
      for (const policy of policies) {
        expect(policy.title.trim().length, `Policy "${policy.id}" has an empty title`).toBeGreaterThan(0)
      }
    })

    it("every policy has a non-empty problem statement", () => {
      for (const policy of policies) {
        expect(policy.problem.trim().length, `Policy "${policy.id}" has an empty problem`).toBeGreaterThan(0)
      }
    })

    it("every policy has a non-empty objective", () => {
      for (const policy of policies) {
        expect(policy.objective.trim().length, `Policy "${policy.id}" has an empty objective`).toBeGreaterThan(0)
      }
    })

    it("every policy has a non-empty intervention", () => {
      for (const policy of policies) {
        expect(policy.intervention.trim().length, `Policy "${policy.id}" has an empty intervention`).toBeGreaterThan(0)
      }
    })
  })

  describe("IDs", () => {
    it("no duplicate IDs exist", () => {
      const ids = policies.map((p) => p.id)
      const unique = new Set(ids)
      expect(unique.size).toBe(ids.length)
    })

    it("all IDs are kebab-case strings", () => {
      const kebabCaseRegex = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/
      for (const policy of policies) {
        expect(
          kebabCaseRegex.test(policy.id),
          `Policy ID "${policy.id}" is not kebab-case`,
        ).toBe(true)
      }
    })

    it("all IDs are non-empty strings", () => {
      for (const policy of policies) {
        expect(typeof policy.id).toBe("string")
        expect(policy.id.trim().length).toBeGreaterThan(0)
      }
    })
  })

  describe("confidence values", () => {
    it("all confidence values are numbers 0-100 or the string 'unknown'", () => {
      for (const policy of policies) {
        const { confidence } = policy
        if (confidence === "unknown") {
          expect(confidence).toBe("unknown")
        } else {
          expect(typeof confidence, `Policy "${policy.id}" confidence must be a number or "unknown"`).toBe("number")
          expect(confidence, `Policy "${policy.id}" confidence must be >= 0`).toBeGreaterThanOrEqual(0)
          expect(confidence, `Policy "${policy.id}" confidence must be <= 100`).toBeLessThanOrEqual(100)
        }
      }
    })
  })

  describe("expectedImpact values", () => {
    it("all expectedImpact values are integers 1-5", () => {
      for (const policy of policies) {
        expect(
          [1, 2, 3, 4, 5],
          `Policy "${policy.id}" has invalid expectedImpact: ${policy.expectedImpact}`,
        ).toContain(policy.expectedImpact)
      }
    })
  })

  describe("evidenceStrength values", () => {
    it("all evidenceStrength values are valid enum values", () => {
      for (const policy of policies) {
        expect(
          VALID_EVIDENCE_STRENGTHS as readonly string[],
          `Policy "${policy.id}" has invalid evidenceStrength: "${policy.evidenceStrength}"`,
        ).toContain(policy.evidenceStrength)
      }
    })
  })

  describe("whatWouldChangeOurMind", () => {
    it("every policy has all three arrays in whatWouldChangeOurMind", () => {
      for (const policy of policies) {
        const { whatWouldChangeOurMind } = policy
        expect(
          whatWouldChangeOurMind,
          `Policy "${policy.id}" is missing whatWouldChangeOurMind`,
        ).toBeDefined()
        expect(
          Array.isArray(whatWouldChangeOurMind.increaseConfidence),
          `Policy "${policy.id}" is missing whatWouldChangeOurMind.increaseConfidence array`,
        ).toBe(true)
        expect(
          Array.isArray(whatWouldChangeOurMind.decreaseConfidence),
          `Policy "${policy.id}" is missing whatWouldChangeOurMind.decreaseConfidence array`,
        ).toBe(true)
        expect(
          Array.isArray(whatWouldChangeOurMind.abandonRecommendation),
          `Policy "${policy.id}" is missing whatWouldChangeOurMind.abandonRecommendation array`,
        ).toBe(true)
      }
    })

    it("every policy has at least one item in each whatWouldChangeOurMind array", () => {
      for (const policy of policies) {
        const { whatWouldChangeOurMind } = policy
        expect(
          whatWouldChangeOurMind.increaseConfidence.length,
          `Policy "${policy.id}" has empty whatWouldChangeOurMind.increaseConfidence`,
        ).toBeGreaterThan(0)
        expect(
          whatWouldChangeOurMind.decreaseConfidence.length,
          `Policy "${policy.id}" has empty whatWouldChangeOurMind.decreaseConfidence`,
        ).toBeGreaterThan(0)
        expect(
          whatWouldChangeOurMind.abandonRecommendation.length,
          `Policy "${policy.id}" has empty whatWouldChangeOurMind.abandonRecommendation`,
        ).toBeGreaterThan(0)
      }
    })
  })

  describe("implementationDifficulty values", () => {
    it("all implementationDifficulty values are integers 1-5", () => {
      for (const policy of policies) {
        expect(
          [1, 2, 3, 4, 5],
          `Policy "${policy.id}" has invalid implementationDifficulty: ${policy.implementationDifficulty}`,
        ).toContain(policy.implementationDifficulty)
      }
    })
  })

  describe("array fields", () => {
    it("all affectedGroups are non-empty arrays", () => {
      for (const policy of policies) {
        expect(Array.isArray(policy.affectedGroups), `Policy "${policy.id}" affectedGroups must be an array`).toBe(true)
        expect(policy.affectedGroups.length, `Policy "${policy.id}" affectedGroups must not be empty`).toBeGreaterThan(0)
      }
    })

    it("all internationalExamples are arrays", () => {
      for (const policy of policies) {
        expect(
          Array.isArray(policy.internationalExamples),
          `Policy "${policy.id}" internationalExamples must be an array`,
        ).toBe(true)
      }
    })

    it("all sources are non-empty arrays", () => {
      for (const policy of policies) {
        expect(Array.isArray(policy.sources), `Policy "${policy.id}" sources must be an array`).toBe(true)
        expect(policy.sources.length, `Policy "${policy.id}" sources must not be empty`).toBeGreaterThan(0)
      }
    })
  })
})
