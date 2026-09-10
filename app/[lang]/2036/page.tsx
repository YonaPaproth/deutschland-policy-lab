import Link from "next/link"
import { getLang, translations } from "@/lib/i18n/translations"
import { HOUSING_COST_OVERBURDEN_2025 } from "@/lib/housing-data"

type DomainStatus = "on-track" | "off-track" | "unknown"

interface DomainObjective {
  domain: string
  current: string
  milestone2030: string
  target2036: string
  unit: string
  status: DomainStatus
  confidence: "illustrative"
}

const DOMAIN_OBJECTIVES: DomainObjective[] = [
  {
    domain: "state-capacity",
    current: "35% digital services",
    milestone2030: "70% digital services",
    target2036: "95% digital services",
    unit: "% of public services available end-to-end digitally",
    status: "off-track",
    confidence: "illustrative",
  },
  {
    domain: "housing",
    current: "11.2% housing cost overburden (2025, Eurostat)",
    milestone2030: "8% housing cost overburden",
    target2036: "≤6% — level of Austria & Netherlands",
    unit: "% of households spending >40% of income on housing. Best: Finland 4.7%, Austria 6.1%, Netherlands 6.5%",
    status: "off-track",
    confidence: "illustrative",
  },
  {
    domain: "labour",
    current: "75% labour force participation",
    milestone2030: "78% participation",
    target2036: "81% labour force participation",
    unit: "% of working-age population in employment",
    status: "unknown",
    confidence: "illustrative",
  },
  {
    domain: "migration",
    current: "4–7 months visa processing",
    milestone2030: "6 weeks processing",
    target2036: "30 days skilled-worker visa processing",
    unit: "average processing time for skilled-worker visa applications",
    status: "off-track",
    confidence: "illustrative",
  },
  {
    domain: "innovation",
    current: "Germany #9 innovation index",
    milestone2030: "#7 innovation index",
    target2036: "Germany top 5 global innovation index",
    unit: "rank in acatech / WIPO global innovation index",
    status: "off-track",
    confidence: "illustrative",
  },
  {
    domain: "energy",
    current: "~60% renewable electricity",
    milestone2030: "80% renewable electricity",
    target2036: "90% renewable electricity",
    unit: "% of electricity generation from renewable sources",
    status: "on-track",
    confidence: "illustrative",
  },
  {
    domain: "education",
    current: "PISA scores declining trend",
    milestone2030: "Stabilise at OECD average",
    target2036: "Top-10 OECD PISA rankings",
    unit: "PISA composite score rank among OECD members",
    status: "off-track",
    confidence: "illustrative",
  },
  {
    domain: "economic-growth",
    current: "~0.5% GDP growth",
    milestone2030: "1.5% average GDP growth",
    target2036: "2% annual GDP growth rate",
    unit: "real GDP growth rate, % per year",
    status: "off-track",
    confidence: "illustrative",
  },
  {
    domain: "pensions",
    current: "~3% post-retirement employment",
    milestone2030: "6% post-retirement employment",
    target2036: "10% post-retirement employment rate",
    unit: "% of retirees (65+) in active employment",
    status: "unknown",
    confidence: "illustrative",
  },
  {
    domain: "defence",
    current: "~1.6% GDP defence spend",
    milestone2030: "2.0% NATO target met",
    target2036: "2% GDP defence spend, sustained",
    unit: "defence expenditure as % of GDP",
    status: "on-track",
    confidence: "illustrative",
  },
]

function StatusBadge({ status, labels }: { status: DomainStatus; labels: Record<string, string> }) {
  if (status === "on-track") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-200">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
        {labels["on-track"]}
      </span>
    )
  }
  if (status === "off-track") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-200">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden="true" />
        {labels["off-track"]}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden="true" />
      {labels["unknown"]}
    </span>
  )
}

export default async function Germany2036Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: langStr } = await params
  const lang = getLang(langStr)
  const T = translations[lang]
  const D = T.dashboard

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="mb-4 flex items-center gap-2 text-sm text-slate-500">
          <Link href={`/${lang}`} className="hover:text-slate-700">{T.common.home}</Link>
          <span>/</span>
          <span className="text-slate-900">2036</span>
        </nav>
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-slate-900">
          {D.title}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-600">
          {D.subtitle}
        </p>
      </div>

      {/* Warning banner */}
      <div className="mb-10 flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-5">
        <span className="mt-0.5 shrink-0 text-xl" aria-hidden="true">⚠️</span>
        <div>
          <p className="font-semibold text-yellow-900">{D.warningTitle}</p>
          <p className="mt-0.5 text-sm leading-relaxed text-yellow-800">
            {D.disclaimer}
          </p>
        </div>
      </div>

      {/* Domain cards */}
      <div className="grid gap-5 sm:grid-cols-2">
        {DOMAIN_OBJECTIVES.map((obj) => {
          const domainLabel = D.domainLabels[obj.domain as keyof typeof D.domainLabels] ?? obj.domain
          return (
            <div
              key={obj.domain}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">{domainLabel}</h2>
                  <p className="mt-0.5 text-xs text-slate-500">{obj.unit}</p>
                </div>
                <StatusBadge status={obj.status} labels={D.status} />
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 w-16 shrink-0 text-xs font-medium uppercase tracking-wide text-slate-400">
                    {D.current}
                  </span>
                  <span className="text-sm font-medium text-slate-700">{obj.current}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 w-16 shrink-0 text-xs font-medium uppercase tracking-wide text-blue-400">
                    {D.target2030}
                  </span>
                  <span className="text-sm text-slate-600">{obj.milestone2030}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 w-16 shrink-0 text-xs font-medium uppercase tracking-wide text-slate-900">
                    {D.target2036}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">{obj.target2036}</span>
                </div>
              </div>

              <div className="mt-4 border-t border-slate-100 pt-3">
                <span className="text-xs italic text-slate-400">
                  {D.confidenceNote}
                </span>
              </div>

              <div className="mt-3">
                <Link
                  href={`/${lang}/policies?domain=${obj.domain}`}
                  className="text-xs font-medium text-blue-600 hover:text-blue-800"
                >
                  {D.viewPolicies.replace("{{label}}", domainLabel)}
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* Housing Benchmark — real Eurostat data */}
      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Housing Cost Overburden — International Benchmark
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              % of households spending more than 40% of income on housing.
              Lower is better. <strong>Real data</strong> — Source: Eurostat EU-SILC.
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            Live data
          </span>
        </div>
        <div className="space-y-2.5">
          {HOUSING_COST_OVERBURDEN_2025.sort((a, b) => a.value - b.value).map((d) => {
            const isGermany = d.countryCode === "DE"
            const maxVal = 25
            const pct = Math.round((d.value / maxVal) * 100)
            return (
              <div key={d.countryCode} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${isGermany ? "bg-blue-50 ring-1 ring-blue-200" : ""}`}>
                <span className={`w-28 shrink-0 text-sm ${isGermany ? "font-semibold text-blue-900" : "text-slate-600"}`}>
                  {d.country}
                </span>
                <div className="flex-1">
                  <div className="h-5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all ${isGermany ? "bg-blue-500" : "bg-slate-300"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <span className={`w-16 shrink-0 text-right text-sm ${isGermany ? "font-bold text-blue-900" : "text-slate-600"}`}>
                  {d.value.toFixed(1)}% ({d.year})
                </span>
              </div>
            )
          })}
        </div>
        <p className="mt-4 text-xs text-slate-400">
          Germany (11.2%) performs worse than Austria (6.1%), France (6.4%), and Netherlands (6.5%).
          Target 2036: reduce to ≤6% — the level of the best-performing large EU economies.
          Source: {HOUSING_COST_OVERBURDEN_2025[0].source}.
        </p>
      </div>

      {/* Methodology note */}
      <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="mb-2 text-sm font-semibold text-slate-900">{D.aboutTitle}</h3>
        <p className="text-sm leading-relaxed text-slate-600">
          {D.aboutDesc}{" "}
          <Link href={`/${lang}/methodology`} className="text-blue-600 hover:underline">
            {D.aboutLink}
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
