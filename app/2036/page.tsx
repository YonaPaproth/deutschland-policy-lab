import Link from "next/link"

type DomainStatus = "on-track" | "off-track" | "unknown"

interface DomainObjective {
  domain: string
  label: string
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
    label: "State Capacity",
    current: "35% digital services",
    milestone2030: "70% digital services",
    target2036: "95% digital services",
    unit: "% of public services available end-to-end digitally",
    status: "off-track",
    confidence: "illustrative",
  },
  {
    domain: "housing",
    label: "Housing",
    current: "~400,000 new units/year",
    milestone2030: "450,000 new units/year",
    target2036: "500,000 new units/year",
    unit: "new residential units completed per year",
    status: "off-track",
    confidence: "illustrative",
  },
  {
    domain: "labour",
    label: "Labour",
    current: "75% labour force participation",
    milestone2030: "78% participation",
    target2036: "81% labour force participation",
    unit: "% of working-age population in employment",
    status: "unknown",
    confidence: "illustrative",
  },
  {
    domain: "migration",
    label: "Migration",
    current: "4–7 months visa processing",
    milestone2030: "6 weeks processing",
    target2036: "30 days skilled-worker visa processing",
    unit: "average processing time for skilled-worker visa applications",
    status: "off-track",
    confidence: "illustrative",
  },
  {
    domain: "innovation",
    label: "Innovation",
    current: "Germany #9 innovation index",
    milestone2030: "#7 innovation index",
    target2036: "Germany top 5 global innovation index",
    unit: "rank in acatech / WIPO global innovation index",
    status: "off-track",
    confidence: "illustrative",
  },
  {
    domain: "energy",
    label: "Energy",
    current: "~60% renewable electricity",
    milestone2030: "80% renewable electricity",
    target2036: "90% renewable electricity",
    unit: "% of electricity generation from renewable sources",
    status: "on-track",
    confidence: "illustrative",
  },
  {
    domain: "education",
    label: "Education",
    current: "PISA scores declining trend",
    milestone2030: "Stabilise at OECD average",
    target2036: "Top-10 OECD PISA rankings",
    unit: "PISA composite score rank among OECD members",
    status: "off-track",
    confidence: "illustrative",
  },
  {
    domain: "economic-growth",
    label: "Economic Growth",
    current: "~0.5% GDP growth",
    milestone2030: "1.5% average GDP growth",
    target2036: "2% annual GDP growth rate",
    unit: "real GDP growth rate, % per year",
    status: "off-track",
    confidence: "illustrative",
  },
  {
    domain: "pensions",
    label: "Pensions",
    current: "~3% post-retirement employment",
    milestone2030: "6% post-retirement employment",
    target2036: "10% post-retirement employment rate",
    unit: "% of retirees (65+) in active employment",
    status: "unknown",
    confidence: "illustrative",
  },
  {
    domain: "defence",
    label: "Defence",
    current: "~1.6% GDP defence spend",
    milestone2030: "2.0% NATO target met",
    target2036: "2% GDP defence spend, sustained",
    unit: "defence expenditure as % of GDP",
    status: "on-track",
    confidence: "illustrative",
  },
]

function StatusBadge({ status }: { status: DomainStatus }) {
  if (status === "on-track") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-200">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
        On track
      </span>
    )
  }
  if (status === "off-track") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-200">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden="true" />
        Off track
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden="true" />
      Unknown
    </span>
  )
}

export default function Germany2036Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="mb-4 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span>/</span>
          <span className="text-slate-900">2036</span>
        </nav>
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-slate-900">
          Germany 2036
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-600">
          Illustrative long-term targets across ten policy domains. These represent what effective
          reform could achieve by 2036, not official forecasts.
        </p>
      </div>

      {/* Warning banner */}
      <div className="mb-10 flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-5">
        <span className="mt-0.5 shrink-0 text-xl" aria-hidden="true">⚠️</span>
        <div>
          <p className="font-semibold text-yellow-900">Illustrative targets only</p>
          <p className="mt-0.5 text-sm leading-relaxed text-yellow-800">
            All figures are illustrative targets. They require evidence review and expert validation
            before any policy use. Do not cite these numbers as official projections or policy
            commitments.
          </p>
        </div>
      </div>

      {/* Domain cards */}
      <div className="grid gap-5 sm:grid-cols-2">
        {DOMAIN_OBJECTIVES.map((obj) => (
          <div
            key={obj.domain}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900">{obj.label}</h2>
                <p className="mt-0.5 text-xs text-slate-500">{obj.unit}</p>
              </div>
              <StatusBadge status={obj.status} />
            </div>

            {/* Current → 2030 → 2036 */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-16 shrink-0 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Current
                </span>
                <span className="text-sm font-medium text-slate-700">{obj.current}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-16 shrink-0 text-xs font-medium uppercase tracking-wide text-blue-400">
                  2030
                </span>
                <span className="text-sm text-slate-600">{obj.milestone2030}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-16 shrink-0 text-xs font-medium uppercase tracking-wide text-slate-900">
                  2036
                </span>
                <span className="text-sm font-semibold text-slate-900">{obj.target2036}</span>
              </div>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-3">
              <span className="text-xs italic text-slate-400">
                Confidence: illustrative — requires evidence review
              </span>
            </div>

            <div className="mt-3">
              <Link
                href={`/policies?domain=${obj.domain}`}
                className="text-xs font-medium text-blue-600 hover:text-blue-800"
              >
                View {obj.label} policies &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Methodology note */}
      <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="mb-2 text-sm font-semibold text-slate-900">About these targets</h3>
        <p className="text-sm leading-relaxed text-slate-600">
          Targets were constructed by reviewing international benchmarks, existing German government
          targets (where available), and independent research institution projections. They represent
          plausible outcomes under optimistic-but-achievable reform scenarios, not business-as-usual
          trajectories. See the{" "}
          <Link href="/methodology" className="text-blue-600 hover:underline">
            methodology page
          </Link>{" "}
          for how evidence is classified and confidence levels are derived.
        </p>
      </div>
    </div>
  )
}
