"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { EvidenceStrengthBadge } from "@/components/evidence-badge"
import ConfidenceBar from "@/components/confidence-bar"
import PriorityScore from "@/components/priority-score"
import type { Policy } from "@/data/policies"

const domainColors: Record<Policy["domain"], string> = {
  "state-capacity": "bg-indigo-500",
  housing: "bg-amber-500",
  labour: "bg-emerald-500",
  migration: "bg-orange-500",
  innovation: "bg-violet-500",
  energy: "bg-yellow-500",
  education: "bg-rose-500",
  "economic-growth": "bg-teal-500",
  pensions: "bg-sky-500",
  defence: "bg-slate-500",
}

const domainLabels: Record<Policy["domain"], string> = {
  "state-capacity": "State Capacity",
  housing: "Housing",
  labour: "Labour",
  migration: "Migration",
  innovation: "Innovation",
  energy: "Energy",
  education: "Education",
  "economic-growth": "Economic Growth",
  pensions: "Pensions",
  defence: "Defence",
}

function StarRating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Impact: ${value} out of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`text-sm leading-none ${i < value ? "text-amber-400" : "text-slate-200"}`}
        >
          ★
        </span>
      ))}
    </div>
  )
}

interface PolicyCardProps {
  policy: Policy
}

export default function PolicyCard({ policy }: PolicyCardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleCompare() {
    const existing = searchParams.get("ids")?.split(",").filter(Boolean) ?? []
    if (existing.includes(policy.id)) return
    const updated = [...existing, policy.id].join(",")
    router.push(`/compare?ids=${updated}`)
  }

  return (
    <article className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Domain indicator */}
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${domainColors[policy.domain]}`}
          aria-hidden="true"
        />
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {domainLabels[policy.domain]}
        </span>
        <span
          className={`ml-auto rounded-full px-2 py-0.5 text-xs font-medium ${
            policy.status === "implemented"
              ? "bg-green-50 text-green-700"
              : policy.status === "pilot"
                ? "bg-blue-50 text-blue-700"
                : policy.status === "evaluated"
                  ? "bg-purple-50 text-purple-700"
                  : "bg-slate-100 text-slate-600"
          }`}
        >
          {policy.status}
        </span>
      </div>

      {/* Title */}
      <Link
        href={`/policies/${policy.id}`}
        className="mb-2 block text-base font-semibold leading-snug text-slate-900 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        {policy.title}
      </Link>

      {/* Short description */}
      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-500">
        {policy.shortDescription}
      </p>

      {/* Badges row */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <EvidenceStrengthBadge evidenceStrength={policy.evidenceStrength} />
        <div className="flex items-center gap-1">
          <span className="text-xs text-slate-400">Impact</span>
          <StarRating value={policy.expectedImpact} />
        </div>
      </div>

      {/* Confidence bar */}
      <div className="mb-4">
        <ConfidenceBar confidence={policy.confidence} />
      </div>

      {/* Footer row: priority score + compare button */}
      <div className="mt-auto flex items-end justify-between">
        <PriorityScore
          policy={{
            expectedImpact: policy.expectedImpact,
            evidenceStrength: policy.evidenceStrength,
            confidence: policy.confidence,
            implementationDifficulty: policy.implementationDifficulty,
          }}
        />

        <button
          onClick={handleCompare}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label={`Add ${policy.title} to comparison`}
        >
          + Compare
        </button>
      </div>
    </article>
  )
}
