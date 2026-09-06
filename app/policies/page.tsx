"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Suspense, useMemo } from "react"
import Link from "next/link"
import { getAllPolicies, filterPolicies, sortPolicies } from "@/lib/policies"
import PolicyCard from "@/components/policy-card"
import type { Policy } from "@/data/policies"

const ALL_DOMAINS: Array<{ value: Policy["domain"] | ""; label: string }> = [
  { value: "", label: "All domains" },
  { value: "state-capacity", label: "State Capacity" },
  { value: "housing", label: "Housing" },
  { value: "labour", label: "Labour" },
  { value: "migration", label: "Migration" },
  { value: "innovation", label: "Innovation" },
  { value: "energy", label: "Energy" },
  { value: "education", label: "Education" },
  { value: "economic-growth", label: "Economic Growth" },
  { value: "pensions", label: "Pensions" },
  { value: "defence", label: "Defence" },
]

const EVIDENCE_OPTIONS: Array<{ value: Policy["evidenceStrength"] | ""; label: string }> = [
  { value: "", label: "Any evidence strength" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
  { value: "very-low", label: "Very low" },
]

const STATUS_OPTIONS: Array<{ value: Policy["status"] | ""; label: string }> = [
  { value: "", label: "Any status" },
  { value: "idea", label: "Idea" },
  { value: "researching", label: "Researching" },
  { value: "evidence-supported", label: "Evidence supported" },
  { value: "pilot", label: "Pilot" },
  { value: "implemented", label: "Implemented" },
  { value: "evaluated", label: "Evaluated" },
]

const TIME_OPTIONS: Array<{ value: Policy["timeToImpact"] | ""; label: string }> = [
  { value: "", label: "Any time horizon" },
  { value: "short", label: "Short (< 2 years)" },
  { value: "medium", label: "Medium (2–5 years)" },
  { value: "long", label: "Long (5+ years)" },
]

const SORT_OPTIONS: Array<{ value: "priority" | "impact" | "confidence" | "difficulty"; label: string }> = [
  { value: "priority", label: "Priority score" },
  { value: "impact", label: "Expected impact" },
  { value: "confidence", label: "Confidence" },
  { value: "difficulty", label: "Ease of implementation" },
]

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

function PoliciesContent() {
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
    router.push(`/policies?${params.toString()}`)
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
    router.push("/policies")
  }

  const hasActiveFilters =
    domain || evidenceStrength || minImpact > 1 || status || timeToImpact

  return (
    <div>
      {/* Page header */}
      <div className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-slate-700">Home</Link>
            <span>/</span>
            <span className="text-slate-900">Policies</span>
          </nav>
          <h1 className="text-3xl font-bold text-slate-900">Policy Explorer</h1>
          <p className="mt-2 text-sm text-slate-600">
            Browse and filter all {allPolicies.length} policy interventions in the database.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filter bar */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <SelectField
              label="Domain"
              value={domain}
              onChange={(v) => updateParam("domain", v)}
              options={ALL_DOMAINS}
            />
            <SelectField
              label="Evidence strength"
              value={evidenceStrength}
              onChange={(v) => updateParam("evidenceStrength", v)}
              options={EVIDENCE_OPTIONS}
            />
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-500">
                Min. impact ({minImpact}/5)
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
              label="Status"
              value={status}
              onChange={(v) => updateParam("status", v)}
              options={STATUS_OPTIONS}
            />
            <SelectField
              label="Time to impact"
              value={timeToImpact}
              onChange={(v) => updateParam("timeToImpact", v)}
              options={TIME_OPTIONS}
            />
            <SelectField
              label="Sort by"
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
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Count */}
        <p className="mb-5 text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
          of {allPolicies.length} policies
        </p>

        {/* Policy grid */}
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">
            <p className="text-slate-500">No policies match your current filters.</p>
            <button
              onClick={resetFilters}
              className="mt-4 text-sm font-medium text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((policy) => (
              <PolicyCard key={policy.id} policy={policy} />
            ))}
          </div>
        )}
      </div>
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
