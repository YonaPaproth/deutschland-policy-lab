"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Suspense, useMemo } from "react"
import Link from "next/link"
import { getAllPolicies, filterPolicies, sortPolicies } from "@/lib/policies"
import PolicyCard from "@/components/policy-card"
import { useLang } from "@/lib/i18n/use-lang"
import { translations } from "@/lib/i18n/translations"
import type { Policy } from "@/data/policies"

function PoliciesContent() {
  const lang = useLang()
  const T = translations[lang]
  const Tp = T.policies

  const searchParams = useSearchParams()
  const router = useRouter()

  const domain = searchParams.get("domain") ?? ""
  const evidenceStrength = searchParams.get("evidenceStrength") ?? ""
  const minImpact = Number(searchParams.get("minImpact") ?? "1")
  const status = searchParams.get("status") ?? ""
  const timeToImpact = searchParams.get("timeToImpact") ?? ""
  const sortBy = (searchParams.get("sortBy") ?? "priority") as "priority" | "impact" | "confidence" | "difficulty"

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/${lang}/policies?${params.toString()}`)
  }

  const allPolicies = getAllPolicies()
  const filtered = useMemo(() => {
    const f = filterPolicies({
      domain: domain || undefined,
      evidenceStrength: evidenceStrength || undefined,
      minImpact: minImpact > 1 ? minImpact : undefined,
      status: status || undefined,
      timeToImpact: timeToImpact || undefined,
    })
    return sortPolicies(f, sortBy)
  }, [domain, evidenceStrength, minImpact, status, timeToImpact, sortBy])

  function resetFilters() {
    router.push(`/${lang}/policies`)
  }

  const hasActiveFilters = domain || evidenceStrength || minImpact > 1 || status || timeToImpact

  const ALL_DOMAINS: Array<{ value: Policy["domain"] | ""; label: string }> = [
    { value: "", label: Tp.allDomains },
    { value: "state-capacity", label: T.domains["state-capacity"] },
    { value: "housing", label: T.domains.housing },
    { value: "labour", label: T.domains.labour },
    { value: "migration", label: T.domains.migration },
    { value: "innovation", label: T.domains.innovation },
    { value: "energy", label: T.domains.energy },
    { value: "education", label: T.domains.education },
    { value: "economic-growth", label: T.domains["economic-growth"] },
    { value: "pensions", label: T.domains.pensions },
    { value: "defence", label: T.domains.defence },
  ]

  const EVIDENCE_OPTIONS: Array<{ value: Policy["evidenceStrength"] | ""; label: string }> = [
    { value: "", label: Tp.anyEvidence },
    { value: "high", label: T.evidence.high },
    { value: "medium", label: T.evidence.medium },
    { value: "low", label: T.evidence.low },
    { value: "very-low", label: T.evidence["very-low"] },
  ]

  const STATUS_OPTIONS: Array<{ value: Policy["status"] | ""; label: string }> = [
    { value: "", label: Tp.anyStatus },
    { value: "idea", label: T.status.idea },
    { value: "researching", label: T.status.researching },
    { value: "evidence-supported", label: T.status["evidence-supported"] },
    { value: "pilot", label: T.status.pilot },
    { value: "implemented", label: T.status.implemented },
    { value: "evaluated", label: T.status.evaluated },
  ]

  const TIME_OPTIONS: Array<{ value: Policy["timeToImpact"] | ""; label: string }> = [
    { value: "", label: Tp.anyTime },
    { value: "short", label: Tp.timeShort },
    { value: "medium", label: Tp.timeMedium },
    { value: "long", label: Tp.timeLong },
  ]

  const SORT_OPTIONS: Array<{ value: "priority" | "impact" | "confidence" | "difficulty"; label: string }> = [
    { value: "priority", label: Tp.sortPriority },
    { value: "impact", label: Tp.sortImpact },
    { value: "confidence", label: Tp.sortConfidence },
    { value: "difficulty", label: Tp.sortEase },
  ]

  return (
    <div>
      {/* Page header */}
      <div className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <Link href={`/${lang}`} className="hover:text-slate-700">{T.common.home}</Link>
            <span>/</span>
            <span className="text-slate-900">{T.nav.policies}</span>
          </nav>
          <h1 className="text-3xl font-bold text-slate-900">{Tp.title}</h1>
          <p className="mt-2 text-sm text-slate-600">
            {lang === "de"
              ? `Alle ${allPolicies.length} Maßnahmen durchsuchen und filtern.`
              : `Browse and filter all ${allPolicies.length} policy interventions in the database.`}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filter bar */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <SelectField
              label={Tp.filterDomain}
              value={domain}
              onChange={(v) => updateParam("domain", v)}
              options={ALL_DOMAINS}
            />
            <SelectField
              label={Tp.filterEvidence}
              value={evidenceStrength}
              onChange={(v) => updateParam("evidenceStrength", v)}
              options={EVIDENCE_OPTIONS}
            />
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-500">
                {Tp.minImpact} ({minImpact}/5)
              </label>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={minImpact}
                onChange={(e) => updateParam("minImpact", e.target.value === "1" ? "" : e.target.value)}
                className="mt-2 h-2 w-full cursor-pointer accent-blue-600"
              />
            </div>
            <SelectField
              label={Tp.filterStatus}
              value={status}
              onChange={(v) => updateParam("status", v)}
              options={STATUS_OPTIONS}
            />
            <SelectField
              label={Tp.filterTime}
              value={timeToImpact}
              onChange={(v) => updateParam("timeToImpact", v)}
              options={TIME_OPTIONS}
            />
            <SelectField
              label={Tp.sortBy}
              value={sortBy}
              onChange={(v) => updateParam("sortBy", v)}
              options={SORT_OPTIONS}
            />
          </div>
          {hasActiveFilters && (
            <div className="mt-3 flex justify-end">
              <button
                onClick={resetFilters}
                className="text-xs font-medium text-slate-500 hover:text-slate-800"
              >
                {Tp.resetFilters}
              </button>
            </div>
          )}
        </div>

        {/* Count */}
        <p className="mb-5 text-sm text-slate-500">
          {Tp.showing}{" "}
          <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
          {Tp.of} {allPolicies.length} {Tp.policiesCount}
        </p>

        {/* Policy grid */}
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">
            <p className="text-slate-500">{Tp.noMatch}</p>
            <button
              onClick={resetFilters}
              className="mt-4 text-sm font-medium text-blue-600 hover:underline"
            >
              {Tp.clearFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((policy) => (
              <PolicyCard key={policy.id} policy={policy} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: Array<{ value: string; label: string }>
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-500">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default function PoliciesPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-xl bg-slate-200"
              />
            ))}
          </div>
        </div>
      }
    >
      <PoliciesContent />
    </Suspense>
  )
}
