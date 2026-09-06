"use client"

import { Suspense, useMemo } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getAllPolicies } from "@/lib/policies"
import { calculatePriorityScore } from "@/lib/scoring"
import { useLang } from "@/lib/i18n/use-lang"
import { translations } from "@/lib/i18n/translations"
import type { Policy } from "@/data/policies"

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

function CompareContent() {
  const lang = useLang()
  const T = translations[lang]
  const C = T.compare
  const isDe = lang === "de"

  const COST_LABELS: Record<Policy["estimatedCost"], string> = {
    low: T.common.low,
    medium: T.evidence.medium,
    high: T.common.high,
    unknown: T.common.unknown,
  }

  const TIME_LABELS: Record<Policy["timeToImpact"], string> = {
    short: isDe ? "Kurzfristig (< 2 J.)" : "Short (< 2 yrs)",
    medium: isDe ? "Mittelfristig (2–5 J.)" : "Medium (2–5 yrs)",
    long: isDe ? "Langfristig (5+ J.)" : "Long (5+ yrs)",
  }

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
        <h2 className="mb-3 text-2xl font-bold text-slate-900">{C.noPolicies}</h2>
        <p className="mb-6 text-base text-slate-500">{C.noPoliciesDesc}</p>
        <Link
          href={`/${lang}/policies`}
          className="inline-block rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
        >
          {C.browseBtn}
        </Link>
      </div>
    )
  }

  const EVIDENCE_LABELS: Record<Policy["evidenceStrength"], string> = {
    "very-low": T.evidence["very-low"],
    low: T.evidence.low,
    medium: T.evidence.medium,
    high: T.evidence.high,
  }

  const STATUS_LABELS: Record<Policy["status"], string> = {
    idea: T.status.idea,
    researching: T.status.researching,
    "evidence-supported": T.status["evidence-supported"],
    pilot: T.status.pilot,
    implemented: T.status.implemented,
    evaluated: T.status.evaluated,
  }

  const DOMAIN_LABELS: Record<Policy["domain"], string> = {
    "state-capacity": T.domains["state-capacity"],
    housing: T.domains.housing,
    labour: T.domains.labour,
    migration: T.domains.migration,
    innovation: T.domains.innovation,
    energy: T.domains.energy,
    education: T.domains.education,
    "economic-growth": T.domains["economic-growth"],
    pensions: T.domains.pensions,
    defence: T.domains.defence,
  }

  interface CompareRow {
    label: string
    render: (p: Policy) => React.ReactNode
  }

  const COMPARE_ROWS: CompareRow[] = [
    { label: C.domain, render: (p) => DOMAIN_LABELS[p.domain] },
    { label: C.status, render: (p) => STATUS_LABELS[p.status] },
    {
      label: C.evidenceStrength,
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
      label: C.impact,
      render: (p) => <Stars value={p.expectedImpact} />,
    },
    {
      label: C.difficulty,
      render: (p) => <Stars value={p.implementationDifficulty} />,
    },
    { label: C.cost, render: (p) => COST_LABELS[p.estimatedCost] },
    { label: C.time, render: (p) => TIME_LABELS[p.timeToImpact] },
    {
      label: C.confidence,
      render: (p) =>
        p.confidence === "unknown" ? (
          <span className="italic text-slate-400">{C.unknown}</span>
        ) : (
          <span>{Math.round((p.confidence as number) * 100)}%</span>
        ),
    },
    {
      label: C.priorityScore,
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

  const subtitleText = C.subtitle
    .replace("{{count}}", String(selected.length))
    .replace("{{label}}", selected.length === 1 ? C.policyLabel : C.policiesLabel)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link href={`/${lang}`} className="hover:text-slate-700">{T.common.home}</Link>
        <span>/</span>
        <span className="text-slate-900">{T.nav.compare}</span>
      </nav>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{C.title}</h1>
          <p className="mt-1 text-sm text-slate-500">{subtitleText}</p>
        </div>
        <Link
          href={`/${lang}/policies`}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          {C.addPolicy}
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
        <table className="min-w-full divide-y divide-slate-100">
          <thead>
            <tr className="bg-slate-50">
              <th className="w-36 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                {C.attribute}
              </th>
              {selected.map((p) => {
                const deTrans = p.translations?.de
                const title = lang === "de" && deTrans?.title ? deTrans.title : p.title
                return (
                  <th
                    key={p.id}
                    className="px-5 py-4 text-left text-sm font-semibold text-slate-900"
                  >
                    <Link
                      href={`/${lang}/policies/${p.id}`}
                      className="hover:text-blue-600"
                    >
                      {title}
                    </Link>
                  </th>
                )
              })}
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
        {C.disclaimer}
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
