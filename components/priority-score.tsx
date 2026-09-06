import { calculatePriorityScore, SCORING_LABEL } from "@/lib/scoring"

interface PriorityScoreProps {
  policy: {
    expectedImpact: number
    evidenceStrength: "very-low" | "low" | "medium" | "high"
    confidence: number | "unknown"
    implementationDifficulty: number
  }
  className?: string
  lang?: "de" | "en"
}

function getScoreColor(score: number): string {
  if (score >= 70) return "text-green-700"
  if (score >= 40) return "text-yellow-600"
  return "text-red-600"
}

function getScoreRingColor(score: number): string {
  if (score >= 70) return "ring-green-200"
  if (score >= 40) return "ring-yellow-200"
  return "ring-red-200"
}

export default function PriorityScore({ policy, className = "", lang = "en" }: PriorityScoreProps) {
  const score = calculatePriorityScore(policy)
  const label = lang === "de" ? "Prioritätsscore" : "Priority Score"
  const experimental = lang === "de" ? "Experimentell" : "Experimental"

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className={`flex h-14 w-14 flex-col items-center justify-center rounded-full bg-white ring-2 ${getScoreRingColor(score)}`}
      >
        <span className={`text-lg font-bold tabular-nums leading-none ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className="text-[9px] font-medium uppercase tracking-wide text-slate-400">/ 100</span>
      </div>
      <span className="mt-1 text-xs font-medium text-slate-600">{label}</span>
      <span
        className="mt-0.5 text-center text-[10px] leading-tight text-slate-400"
        title={SCORING_LABEL}
      >
        {experimental}
      </span>
    </div>
  )
}
