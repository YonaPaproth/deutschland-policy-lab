import Link from "next/link"
import { getLang, translations } from "@/lib/i18n/translations"

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: langStr } = await params
  const lang = getLang(langStr)
  const T = translations[lang]

  const principles = T.home.principles.items
  const domains = [
    "state-capacity",
    "housing",
    "labour",
    "migration",
    "innovation",
    "energy",
    "education",
    "economic-growth",
    "pensions",
    "defence",
  ] as const

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            {T.home.hero}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-slate-600">
            {T.home.subtitle}
          </p>

          <blockquote className="mt-10 border-l-4 border-blue-600 pl-5">
            <p className="text-base leading-relaxed text-slate-700 italic">
              &ldquo;{T.home.quote}&rdquo;
            </p>
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${lang}/policies`}
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              {T.home.exploreBtn}
            </Link>
            <Link
              href={`/${lang}/ask`}
              className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              {T.home.askBtn}
            </Link>
          </div>

          <p className="mt-8 text-xs font-medium uppercase tracking-widest text-slate-400">
            18 {T.home.statsLabel}
          </p>
        </div>
      </section>

      {/* Six principles */}
      <section className="border-b border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            {T.home.principles.title}
          </h2>
          <p className="mb-10 text-2xl font-bold text-slate-900">
            {T.home.principles.subtitle}
          </p>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
            {principles.map((p) => (
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
            {T.home.domains.title}
          </h2>
          <p className="mb-10 text-2xl font-bold text-slate-900">
            {T.home.domains.subtitle}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((id) => (
              <Link
                key={id}
                href={`/${lang}/policies?domain=${id}`}
                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="mb-1.5 text-base font-semibold text-slate-900 group-hover:text-blue-600">
                  {T.domains[id]}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {T.domainDescriptions[id]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Germany 2036 teaser */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
            {T.home.dashboardLabel}
          </p>
          <h2 className="mb-4 text-3xl font-bold text-white">{T.home.dashboardTitle}</h2>
          <p className="mb-8 text-base leading-relaxed text-slate-300">
            {T.home.dashboardSubtitle}
          </p>
          <Link
            href={`/${lang}/2036`}
            className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100"
          >
            {T.home.dashboardCta}
          </Link>
        </div>
      </section>
    </div>
  )
}
