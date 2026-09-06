import { describe, it, expect } from "vitest"
import { calculatePriorityScore } from "@/lib/scoring"

// evidenceWeights: very-low=0.2, low=0.4, medium=0.7, high=1.0
// Formula: (impact * evidenceWeight * confidence/100) / difficulty
// Normalized: raw / 5 * 100
// Max raw = (5 * 1.0 * 1.0) / 1 = 5  → score 100
// Min raw = (1 * 0.2 * 0)   / 5 = 0  → score 0

describe("calculatePriorityScore", () => {
  describe("extreme cases", () => {
    it("returns a high score for high impact, high evidence, high confidence, low difficulty", () => {
      const score = calculatePriorityScore({
        expectedImpact: 5,
        evidenceStrength: "high",
        confidence: 100,
        implementationDifficulty: 1,
      })
      // raw = (5 * 1.0 * 1.0) / 1 = 5 → normalized = (5/5)*100 = 100
      expect(score).toBe(100)
    })

    it("returns a low score for low impact, very-low evidence, low confidence", () => {
      const score = calculatePriorityScore({
        expectedImpact: 1,
        evidenceStrength: "very-low",
        confidence: 10,
        implementationDifficulty: 5,
      })
      // raw = (1 * 0.2 * 0.1) / 5 = 0.004 → normalized = (0.004/5)*100 = 0.08 → rounds to 0
      expect(score).toBe(0)
    })
  })

  describe("score bounds", () => {
    it("score is always >= 0", () => {
      const score = calculatePriorityScore({
        expectedImpact: 1,
        evidenceStrength: "very-low",
        confidence: 0,
        implementationDifficulty: 5,
      })
      expect(score).toBeGreaterThanOrEqual(0)
    })

    it("score is always <= 100", () => {
      const score = calculatePriorityScore({
        expectedImpact: 5,
        evidenceStrength: "high",
        confidence: 100,
        implementationDifficulty: 1,
      })
      expect(score).toBeLessThanOrEqual(100)
    })

    it("score is within 0-100 for a typical mid-range policy", () => {
      const score = calculatePriorityScore({
        expectedImpact: 3,
        evidenceStrength: "medium",
        confidence: 60,
        implementationDifficulty: 3,
      })
      expect(score).toBeGreaterThanOrEqual(0)
      expect(score).toBeLessThanOrEqual(100)
    })
  })

  describe("unknown confidence", () => {
    it("treats unknown confidence as 30", () => {
      const withUnknown = calculatePriorityScore({
        expectedImpact: 4,
        evidenceStrength: "medium",
        confidence: "unknown",
        implementationDifficulty: 2,
      })
      const withThirty = calculatePriorityScore({
        expectedImpact: 4,
        evidenceStrength: "medium",
        confidence: 30,
        implementationDifficulty: 2,
      })
      expect(withUnknown).toBe(withThirty)
    })

    it("unknown confidence produces a lower score than confidence: 100", () => {
      const base = {
        expectedImpact: 4 as const,
        evidenceStrength: "high" as const,
        implementationDifficulty: 2,
      }
      const unknownScore = calculatePriorityScore({ ...base, confidence: "unknown" })
      const highScore = calculatePriorityScore({ ...base, confidence: 100 })
      expect(unknownScore).toBeLessThan(highScore)
    })
  })

  describe("formula verification", () => {
    it("correctly applies (impact * evidenceWeight * confidence/100) / difficulty, normalised to 0-100", () => {
      // evidenceWeight for "low" = 0.4
      // raw = (3 * 0.4 * 0.5) / 2 = 0.6 / 2 = 0.3
      // normalized = (0.3 / 5) * 100 = 6
      const score = calculatePriorityScore({
        expectedImpact: 3,
        evidenceStrength: "low",
        confidence: 50,
        implementationDifficulty: 2,
      })
      expect(score).toBe(6)
    })

    it("score scales with impact — higher impact yields higher score, all else equal", () => {
      const base = {
        evidenceStrength: "medium" as const,
        confidence: 70,
        implementationDifficulty: 3,
      }
      const lowImpact = calculatePriorityScore({ ...base, expectedImpact: 2 })
      const highImpact = calculatePriorityScore({ ...base, expectedImpact: 5 })
      expect(highImpact).toBeGreaterThan(lowImpact)
    })

    it("score scales inversely with difficulty — higher difficulty yields lower score, all else equal", () => {
      const base = {
        expectedImpact: 4,
        evidenceStrength: "high" as const,
        confidence: 80,
      }
      const easyScore = calculatePriorityScore({ ...base, implementationDifficulty: 1 })
      const hardScore = calculatePriorityScore({ ...base, implementationDifficulty: 5 })
      expect(easyScore).toBeGreaterThan(hardScore)
    })

    it("score scales with evidenceStrength — higher strength yields higher score, all else equal", () => {
      const base = {
        expectedImpact: 4,
        confidence: 80,
        implementationDifficulty: 2,
      }
      const veryLow = calculatePriorityScore({ ...base, evidenceStrength: "very-low" })
      const low = calculatePriorityScore({ ...base, evidenceStrength: "low" })
      const medium = calculatePriorityScore({ ...base, evidenceStrength: "medium" })
      const high = calculatePriorityScore({ ...base, evidenceStrength: "high" })
      expect(low).toBeGreaterThan(veryLow)
      expect(medium).toBeGreaterThan(low)
      expect(high).toBeGreaterThan(medium)
    })

    it("score scales with confidence — higher confidence yields higher score, all else equal", () => {
      const base = {
        expectedImpact: 3,
        evidenceStrength: "medium" as const,
        implementationDifficulty: 2,
      }
      const lowConf = calculatePriorityScore({ ...base, confidence: 20 })
      const highConf = calculatePriorityScore({ ...base, confidence: 90 })
      expect(highConf).toBeGreaterThan(lowConf)
    })
  })
})
