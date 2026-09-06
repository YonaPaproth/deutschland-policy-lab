import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllPolicies, getPolicyById } from "@/lib/policies"
import { getSourcesForPolicy } from "@/lib/sources"
import ConfidenceBar from "@/components/confidence-bar"
import { EvidenceStrengthBadge } from "@/components/evidence-badge"
import WhatWouldChangeMind from "@/components/what-would-change-mind"
import PriorityScore from "@/components/priority-score"

export function generateStaticParams() {
  return getAllPolicies().map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const policy = getPolicyById(id)
  if (!policy) return {}
  return {
    title: `${policy.title} — Deutschland Policy Lab`,
    description: policy.shortDescription,
  }
}

const DOMAIN_LABELS: Record<string, string> = {
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

const STATUS_LABELS: Record<string, string> = {
  idea: "Idea",
  researching: "Researching",
  "evidence-supported": "Evidence Supported",
  pilot: "Pilot",
  implemented: "Implemented",
  evaluated: "Evaluated",
}

const COST_LABELS: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  unknown: "Unknown",
}

const TIME_LABELS: Record<string, string> = {
  short: "Short (< 2 yrs)",
  medium: "Medium (2–5 yrs)",
  long: "Long (5+ yrs)",
}

function Stars({ value, max = 5, label }: { value: number; max?: number; label: string }) {
  return (
    <div>
      <span className="mb-1 block text-xs text-slate-500">{label}</span>
      <div
        className="flex items-center gap-0.5"
        aria-label={`${label}: ${value} out of ${max}`}
      >
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            className={`text-base leading-none ${i < value ? "text-amber-400" : "text-slate-200"}`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">
      {children}
    </h2>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default async function PolicyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const policy = getPolicyById(id)
  if (!policy) notFound()

  const sources = getSourcesForPolicy(policy.sources)
  const isLowEvidence =
    policy.evidenceStrength === "low" || policy.evidenceStrength === "very-low"

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-700">Home</Link>
        <span>/</span>
        <Link href="/policies" className="hover:text-slate-700">Policies</Link>
        <span>/</span>
        <span className="text-slate-900">{policy.title}</span>
      </nav>

      {/* Low-evidence disclaimer */}
      {isLowEvidence && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <span className="mt-0.5 shrink-0 text-lg" aria-hidden="true">⚠</span>
          <div>
            <p className="text-sm font-semibold text-yellow-900">
              This is a hypothesis, not a recommendation.
            </p>
            <p className="mt-0.5 text-sm text-yellow-800">
              Evidence strength is {policy.evidenceStrength}. Treat all analysis on this page as
              exploratory. Do not use in policy briefs without expert review.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
        {/* Main content */}
        <div className="space-y-10">
          {/* Header */}
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {DOMAIN_LABELS[policy.domain]}
              </span>
              <span className="text-slate-300">·</span>
              <EvidenceStrengthBadge evidenceStrength={policy.evidenceStrength} />
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                {STATUS_LABELS[policy.status]}
              </span>
            </div>
            <h1 className="text-3xl font-bold leading-snug text-slate-900">{policy.title}</h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              {policy.shortDescription}
            </p>
            <p className="mt-3 text-xs text-slate-400">
              Last reviewed: {policy.lastReviewed} &middot; Illustrative — requires evidence review
            </p>
          </div>

          {/* Problem */}
          <section>
            <SectionHeading>Problem</SectionHeading>
            <p className="text-sm leading-relaxed text-slate-700">{policy.problem}</p>
          </section>

          {/* Objective */}
          <section>
            <SectionHeading>Objective</SectionHeading>
            <p className="text-sm leading-relaxed text-slate-700">{policy.objective}</p>
          </section>

          {/* Intervention Hypothesis */}
          <section>
            <SectionHeading>Intervention Hypothesis</SectionHeading>
            <p className="text-sm leading-relaxed text-slate-700">{policy.intervention}</p>
          </section>

          {/* International Examples */}
          {policy.internationalExamples.length > 0 && (
            <section>
              <SectionHeading>International Examples</SectionHeading>
              <div className="space-y-4">
                {policy.internationalExamples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{ex.country}</span>
                    </div>
                    <p className="mb-2 text-sm leading-relaxed text-slate-700">
                      {ex.description}
                    </p>
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 text-xs font-semibold uppercase tracking-wide text-green-600">
                        Outcome
                      </span>
                      <p className="text-sm leading-relaxed text-slate-600">{ex.outcome}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Risks & Trade-offs */}
          <div className="grid gap-6 sm:grid-cols-2">
            <section>
              <SectionHeading>Risks</SectionHeading>
              <BulletList items={policy.risks} />
            </section>
            <section>
              <SectionHeading>Trade-offs</SectionHeading>
              <BulletList items={policy.tradeoffs} />
            </section>
          </div>

          {/* Counterarguments */}
          {policy.counterarguments.length > 0 && (
            <section>
              <SectionHeading>Counterarguments</SectionHeading>
              <BulletList items={policy.counterarguments} />
            </section>
          )}

          {/* Open Questions */}
          {policy.openQuestions.length > 0 && (
            <section>
              <SectionHeading>Open Questions</SectionHeading>
              <BulletList items={policy.openQuestions} />
            </section>
          )}

          {/* KPIs */}
          {policy.kpis.length > 0 && (
            <section>
              <SectionHeading>Key Performance Indicators</SectionHeading>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="min-w-full divide-y divide-slate-100 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Metric
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Baseline
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Target
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {policy.kpis.map((kpi, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3 text-slate-700">{kpi.metric}</td>
                        <td className="px-4 py-3 text-slate-500">
                          {kpi.baseline ?? <span className="italic text-slate-400">—</span>}
                        </td>
                        <td className="px-4 py-3 text-slate-500">
                          {kpi.target ?? <span className="italic text-slate-400">—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs italic text-slate-400">
                All KPI values are illustrative — requires evidence review
              </p>
            </section>
          )}

          {/* What Would Change Our Mind */}
          <WhatWouldChangeMind whatWouldChangeOurMind={policy.whatWouldChangeOurMind} />

          {/* Sources */}
          {sources.length > 0 && (
            <section>
              <SectionHeading>Sources</SectionHeading>
              <div className="space-y-3">
                {sources.map((src) => (
                  <div
                    key={src.id}
                    className="rounded-lg border border-slate-200 bg-white p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{src.title}</p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {src.authors.join(", ")} &middot; {src.institution} &middot; {src.year}
                        </p>
                      </div>
                      {src.url && (
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-xs font-medium text-blue-600 hover:underline"
                        >
                          View source &rarr;
                        </a>
                      )}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{src.summary}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          {/* Priority score */}
          <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <PriorityScore
              policy={{
                expectedImpact: policy.expectedImpact,
                evidenceStrength: policy.evidenceStrength,
                confidence: policy.confidence,
                implementationDifficulty: policy.implementationDifficulty,
              }}
            />
          </div>

          {/* Stats */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="space-y-4">
              <Stars value={policy.expectedImpact} label="Impact" />
              <Stars value={6 - policy.implementationDifficulty} label="Ease of implementation" />

              <div>
                <span className="mb-1 block text-xs text-slate-500">Estimated cost</span>
                <span className="text-sm font-medium text-slate-900">
                  {COST_LABELS[policy.estimatedCost]}
                </span>
              </div>

              <div>
                <span className="mb-1 block text-xs text-slate-500">Time to impact</span>
                <span className="text-sm font-medium text-slate-900">
                  {TIME_LABELS[policy.timeToImpact]}
                </span>
              </div>

              <div>
                <span className="mb-1 block text-xs text-slate-500">Evidence strength</span>
                <EvidenceStrengthBadge evidenceStrength={policy.evidenceStrength} />
              </div>

              <ConfidenceBar confidence={policy.confidence} />
            </div>
          </div>

          {/* Affected groups */}
          {policy.affectedGroups.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Affected groups
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {policy.affectedGroups.map((g) => (
                  <span
                    key={g}
                    className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Compare button */}
          <Link
            href={`/compare?ids=${policy.id}`}
            className="block w-full rounded-lg border border-slate-200 py-2.5 text-center text-sm font-medium text-slate-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            Compare this policy
          </Link>

          <Link
            href="/policies"
            className="block text-center text-xs text-slate-500 hover:text-slate-700"
          >
            &larr; Back to all policies
          </Link>
        </aside>
      </div>
    </div>
  )
}
