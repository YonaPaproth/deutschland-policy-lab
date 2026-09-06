import Link from "next/link"

const PRINCIPLES = [
  {
    title: "Prosperity",
    description:
      "Broad-based economic growth that raises living standards for all, not just for those already well-off.",
  },
  {
    title: "Capability",
    description:
      "A state that can design, implement, and evaluate policy effectively — competent, fast, and trusted.",
  },
  {
    title: "Control",
    description:
      "Citizens and communities have meaningful say over the decisions that shape their lives.",
  },
  {
    title: "Opportunity",
    description:
      "Everyone can develop their potential regardless of background, region, or starting point.",
  },
  {
    title: "Security",
    description:
      "Protection from economic shocks, crime, and geopolitical risk — without trading away freedom.",
  },
  {
    title: "Resilience",
    description:
      "An economy and society that can absorb disruption and adapt to change without systemic breakdown.",
  },
]

const DOMAINS = [
  {
    id: "state-capacity",
    name: "State Capacity",
    description: "Digitalising and streamlining public administration to reduce bureaucratic burden.",
  },
  {
    id: "housing",
    name: "Housing",
    description: "Addressing supply shortfalls and planning delays in Germany's urban housing markets.",
  },
  {
    id: "labour",
    name: "Labour",
    description: "Removing tax and regulatory barriers that suppress labour supply and productivity.",
  },
  {
    id: "migration",
    name: "Migration",
    description: "Attracting and integrating skilled workers while managing asylum processes fairly.",
  },
  {
    id: "innovation",
    name: "Innovation",
    description: "Building a startup and research ecosystem that turns ideas into competitive companies.",
  },
  {
    id: "energy",
    name: "Energy",
    description: "Accelerating the energy transition while keeping industrial electricity costs competitive.",
  },
  {
    id: "education",
    name: "Education",
    description: "Raising learning outcomes and closing achievement gaps through evidence-based teaching.",
  },
  {
    id: "economic-growth",
    name: "Economic Growth",
    description: "Structural reforms to revive Germany's long-run growth potential.",
  },
  {
    id: "pensions",
    name: "Pensions",
    description: "Ensuring pension sustainability while unlocking the labour potential of older workers.",
  },
  {
    id: "defence",
    name: "Defence",
    description: "Meeting NATO commitments and rebuilding defence capability in a changed security environment.",
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Germany can work better.
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-slate-600">
            A public, evidence-driven policy intelligence platform for Germany.
          </p>

          {/* Quote block */}
          <blockquote className="mt-10 border-l-4 border-blue-600 pl-5">
            <p className="text-base leading-relaxed text-slate-700 italic">
              &ldquo;Instead of asking which party proposed an idea, ask: Did it work? Where? At what
              cost? Under what conditions?&rdquo;
            </p>
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/policies"
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              Explore policies
            </Link>
            <Link
              href="/ask"
              className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Ask a question
            </Link>
          </div>

          {/* Stats teaser */}
          <p className="mt-8 text-xs font-medium uppercase tracking-widest text-slate-400">
            18 policy interventions &middot; 10 domains &middot; Evidence-driven
          </p>
        </div>
      </section>

      {/* Six principles */}
      <section className="border-b border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Six principles
          </h2>
          <p className="mb-10 text-2xl font-bold text-slate-900">
            What good policy delivers
          </p>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="mb-2 text-base font-semibold text-slate-900">{p.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy domains */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Policy domains
          </h2>
          <p className="mb-10 text-2xl font-bold text-slate-900">
            Ten areas of reform
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DOMAINS.map((d) => (
              <Link
                key={d.id}
                href={`/policies?domain=${d.id}`}
                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="mb-1.5 text-base font-semibold text-slate-900 group-hover:text-blue-600">
                  {d.name}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">{d.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Germany 2036 teaser */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Long-term targets
          </p>
          <h2 className="mb-4 text-3xl font-bold text-white">Germany 2036</h2>
          <p className="mb-8 text-base leading-relaxed text-slate-300">
            Illustrative targets across all ten domains — where Germany could be in a decade with
            effective reform. All figures require expert validation.
          </p>
          <Link
            href="/2036"
            className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100"
          >
            View 2036 targets
          </Link>
        </div>
      </section>
    </div>
  )
}
