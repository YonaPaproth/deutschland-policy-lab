"use client"

import { Suspense, useMemo } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getAllPolicies } from "@/lib/policies"
import { calculatePriorityScore } from "@/lib/scoring"
import type { Policy } from "@/data/policies"

const DOMAIN_LABELS: Record<Policy["domain"], string> = {
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

const STATUS_LABELS: Record<Policy["status"], string> = {
  idea: "Idea",
  researching: "Researching",
  "evidence-supported": "Evidence Supported",
  pilot: "Pilot",
  implemented: "Implemented",
  evaluated: "Evaluated",
}

const EVIDENCE_LABELS: Record<Policy["evidenceStrength"], string> = {
  "very-low": "Very Low",
  low: "Low",
  medium: "Medium",
  high: "High",
}

const COST_LABELS: Record<Policy["estimatedCost"], string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  unknown: "Unknown",
}

const TIME_LABELS: Record<Policy["timeToImpact"], string> = {
  short: "Short (< 2 yrs)",
  medium: "Medium (2–5 yrs)",
  long: "Long (5+ yrs)",
}

function Stars({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < value ? "text-amber-400" : "text-slate-200"}>
          ★
        </span>
      ))}
    </span>
  )
}

interface CompareRow {
  label: string
  render: (p: Policy) => React.ReactNode
}

const COMPARE_ROWS: CompareRow[] = [
  { label: "Domain", render: (p) => DOMAIN_LABELS[p.domain] },
  { label: "Status", render: (p) => STATUS_LABELS[p.status] },
  {
    label: "Evidence Strength",
    render: (p) => (
      <span
        className={`font-medium ${
          p.evidenceStrength === "high"
            ? "text-green-700"
            : p.evidenceStrength === "medium"
              ? "text-blue-700"
              : p.evidenceStrength === "low"
                ? "text-yellow-700"
                : "text-slate-500"
        }`}
      >
        {EVIDENCE_LABELS[p.evidenceStrength]}
      </span>
    ),
  },
  {
    label: "Expected Impact",
    render: (p) => <Stars value={p.expectedImpact} />,
  },
  {
    label: "Difficulty",
    render: (p) => <Stars value={p.implementationDifficulty} />,
  },
  { label: "Estimated Cost", render: (p) => COST_LABELS[p.estimatedCost] },
  { label: "Time to Impact", render: (p) => TIME_LABELS[p.timeToImpact] },
  {
    label: "Confidence",
    render: (p) =>
      p.confidence === "unknown" ? (
        <span className="italic text-slate-400">Unknown</span>
      ) : (
        <span>{Math.round((p.confidence as number) * 100)}%</span>
      ),
  },
  {
    label: "Priority Score",
    render: (p) => {
      const score = calculatePriorityScore(p)
      return (
        <span
          className={`font-semibold tabular-nums ${
            score >= 70
              ? "text-green-700"
              : score >= 40
                ? "text-yellow-600"
                : "text-red-600"
          }`}
        >
          {score} / 100
        </span>
      )
    },
  },
]

function CompareContent() {
  const searchParams = useSearchParams()
  const idsParam = searchParams.get("ids") ?? ""
  const ids = useMemo(
    () => idsParam.split(",").filter(Boolean),
    [idsParam],
  )

  const allPolicies = getAllPolicies()
  const selected = useMemo(
    () => ids.map((id) => allPolicies.find((p) => p.id === id)).filter(Boolean) as Policy[],
    [ids, allPolicies],
  )

  if (ids.length === 0 || selected.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h2 className="mb-3 text-2xl font-bold text-slate-900">No policies selected</h2>
        <p className="mb-6 text-base text-slate-500">
          Add policies to compare from the policy explorer.
        </p>
        <Link
          href="/policies"
          className="inline-block rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
        >
          Browse policies
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-700">Home</Link>
        <span>/</span>
        <span className="text-slate-900">Compare</span>
      </nav>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Policy Comparison</h1>
          <p className="mt-1 text-sm text-slate-500">
            Comparing {selected.length} {selected.length === 1 ? "policy" : "policies"}
          </p>
        </div>
        <Link
          href="/policies"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          + Add more policies
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
        <table className="min-w-full divide-y divide-slate-100">
          <thead>
            <tr className="bg-slate-50">
              <th className="w-36 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Attribute
              </th>
              {selected.map((p) => (
                <th
                  key={p.id}
                  className="px-5 py-4 text-left text-sm font-semibold text-slate-900"
                >
                  <Link
                    href={`/policies/${p.id}`}
                    className="hover:text-blue-600"
                  >
                    {p.title}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {COMPARE_ROWS.map((row) => (
              <tr key={row.label} className="hover:bg-slate-50">
                <td className="px-5 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                  {row.label}
                </td>
                {selected.map((p) => (
                  <td
                    key={p.id}
                    className="px-5 py-4 text-sm text-slate-700"
                  >
                    {row.render(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs italic text-slate-400">
        All scores are illustrative &mdash; experimental prioritisation model, not a policy recommendation.
      </p>
    </div>
  )
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="h-64 animate-pulse rounded-xl bg-slate-200" />
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  )
}
