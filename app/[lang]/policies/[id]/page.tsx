import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllPolicies, getPolicyById } from "@/lib/policies"
import { getSourcesForPolicy } from "@/lib/sources"
import ConfidenceBar from "@/components/confidence-bar"
import { EvidenceStrengthBadge } from "@/components/evidence-badge"
import WhatWouldChangeMind from "@/components/what-would-change-mind"
import PriorityScore from "@/components/priority-score"
import { getLang, translations } from "@/lib/i18n/translations"

export function generateStaticParams() {
  const langs = ["de", "en"]
  return langs.flatMap((lang) =>
    getAllPolicies().map((p) => ({ lang, id: p.id }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { id, lang: langStr } = await params
  const policy = getPolicyById(id)
  if (!policy) return {}
  const lang = getLang(langStr)
  const deTrans = policy.translations?.de
  const title = lang === "de" && deTrans?.title ? deTrans.title : policy.title
  return {
    title: `${title} — Deutschland Policy Lab`,
    description: lang === "de" && deTrans?.shortDescription ? deTrans.shortDescription : policy.shortDescription,
  }
}

const COST_LABELS_EN: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  unknown: "Unknown",
}

const COST_LABELS_DE: Record<string, string> = {
  low: "Niedrig",
  medium: "Mittel",
  high: "Hoch",
  unknown: "Unbekannt",
}

const TIME_LABELS_EN: Record<string, string> = {
  short: "Short (< 2 yrs)",
  medium: "Medium (2–5 yrs)",
  long: "Long (5+ yrs)",
}

const TIME_LABELS_DE: Record<string, string> = {
  short: "Kurzfristig (< 2 J.)",
  medium: "Mittelfristig (2–5 J.)",
  long: "Langfristig (5+ J.)",
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
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang: langStr, id } = await params
  const lang = getLang(langStr)
  const T = translations[lang]
  const D = T.detail
  const isDe = lang === "de"

  const policy = getPolicyById(id)
  if (!policy) notFound()

  const deTrans = policy.translations?.de
  const title = isDe && deTrans?.title ? deTrans.title : policy.title
  const shortDescription = isDe && deTrans?.shortDescription ? deTrans.shortDescription : policy.shortDescription
  const problem = isDe && deTrans?.problem ? deTrans.problem : policy.problem
  const objective = isDe && deTrans?.objective ? deTrans.objective : policy.objective
  const intervention = isDe && deTrans?.intervention ? deTrans.intervention : policy.intervention

  const sources = getSourcesForPolicy(policy.sources)
  const isLowEvidence =
    policy.evidenceStrength === "low" || policy.evidenceStrength === "very-low"

  const DOMAIN_LABELS = isDe ? T.domains : translations.en.domains
  const STATUS_LABELS = isDe ? T.status : translations.en.status
  const COST_LABELS = isDe ? COST_LABELS_DE : COST_LABELS_EN
  const TIME_LABELS = isDe ? TIME_LABELS_DE : TIME_LABELS_EN

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link href={`/${lang}`} className="hover:text-slate-700">{T.common.home}</Link>
        <span>/</span>
        <Link href={`/${lang}/policies`} className="hover:text-slate-700">{T.nav.policies}</Link>
        <span>/</span>
        <span className="text-slate-900">{title}</span>
      </nav>

      {/* Low-evidence disclaimer */}
      {isLowEvidence && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <span className="mt-0.5 shrink-0 text-lg" aria-hidden="true">⚠</span>
          <div>
            <p className="text-sm font-semibold text-yellow-900">
              {D.hypothesisWarning}
            </p>
            <p className="mt-0.5 text-sm text-yellow-800">
              {D.hypothesisDetail.replace("{{strength}}", T.evidence[policy.evidenceStrength])}
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
            <h1 className="text-3xl font-bold leading-snug text-slate-900">{title}</h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              {shortDescription}
            </p>
            <p className="mt-3 text-xs text-slate-400">
              {D.lastReviewed}: {policy.lastReviewed} &middot; {D.illustrative}
            </p>
          </div>

          {/* Problem */}
          <section>
            <SectionHeading>{D.problem}</SectionHeading>
            <p className="text-sm leading-relaxed text-slate-700">{problem}</p>
          </section>

          {/* Objective */}
          <section>
            <SectionHeading>{D.objective}</SectionHeading>
            <p className="text-sm leading-relaxed text-slate-700">{objective}</p>
          </section>

          {/* Intervention Hypothesis */}
          <section>
            <SectionHeading>{D.intervention}</SectionHeading>
            <p className="text-sm leading-relaxed text-slate-700">{intervention}</p>
          </section>

          {/* International Examples */}
          {policy.internationalExamples.length > 0 && (
            <section>
              <SectionHeading>{D.examples}</SectionHeading>
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
                        {D.outcome}
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
              <SectionHeading>{D.risks}</SectionHeading>
              <BulletList items={policy.risks} />
            </section>
            <section>
              <SectionHeading>{D.tradeoffs}</SectionHeading>
              <BulletList items={policy.tradeoffs} />
            </section>
          </div>

          {/* Counterarguments */}
          {policy.counterarguments.length > 0 && (
            <section>
              <SectionHeading>{D.counterarguments}</SectionHeading>
              <BulletList items={policy.counterarguments} />
            </section>
          )}

          {/* Open Questions */}
          {policy.openQuestions.length > 0 && (
            <section>
              <SectionHeading>{D.openQuestions}</SectionHeading>
              <BulletList items={policy.openQuestions} />
            </section>
          )}

          {/* KPIs */}
          {policy.kpis.length > 0 && (
            <section>
              <SectionHeading>{D.kpis}</SectionHeading>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="min-w-full divide-y divide-slate-100 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {D.kpiMetric}
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {D.kpiBaseline}
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {D.kpiTarget}
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
              <p className="mt-2 text-xs italic text-slate-400">{D.kpiNote}</p>
            </section>
          )}

          {/* What Would Change Our Mind */}
          <WhatWouldChangeMind whatWouldChangeOurMind={policy.whatWouldChangeOurMind} lang={lang} />

          {/* Sources */}
          {sources.length > 0 && (
            <section>
              <SectionHeading>{D.sources}</SectionHeading>
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
                          {D.sourceView}
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
              lang={lang}
            />
          </div>

          {/* Stats */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="space-y-4">
              <Stars value={policy.expectedImpact} label={D.impact} />
              <Stars value={6 - policy.implementationDifficulty} label={D.ease} />

              <div>
                <span className="mb-1 block text-xs text-slate-500">{D.estimatedCost}</span>
                <span className="text-sm font-medium text-slate-900">
                  {COST_LABELS[policy.estimatedCost]}
                </span>
              </div>

              <div>
                <span className="mb-1 block text-xs text-slate-500">{D.timeToImpact}</span>
                <span className="text-sm font-medium text-slate-900">
                  {TIME_LABELS[policy.timeToImpact]}
                </span>
              </div>

              <div>
                <span className="mb-1 block text-xs text-slate-500">{T.policies.filterEvidence}</span>
                <EvidenceStrengthBadge evidenceStrength={policy.evidenceStrength} />
              </div>

              <ConfidenceBar confidence={policy.confidence} lang={lang} />
            </div>
          </div>

          {/* Affected groups */}
          {policy.affectedGroups.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {D.affectedGroups}
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
            href={`/${lang}/compare?ids=${policy.id}`}
            className="block w-full rounded-lg border border-slate-200 py-2.5 text-center text-sm font-medium text-slate-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            {D.compareThis}
          </Link>

          <Link
            href={`/${lang}/policies`}
            className="block text-center text-xs text-slate-500 hover:text-slate-700"
          >
            {D.backToAll}
          </Link>
        </aside>
      </div>
    </div>
  )
}
