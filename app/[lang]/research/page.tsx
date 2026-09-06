import Link from "next/link"
import { getLang, translations } from "@/lib/i18n/translations"
import { getAllSources } from "@/lib/sources"
import type { Source } from "@/data/sources"

const TYPE_LABELS_EN: Record<Source["type"], string> = {
  academic: "Academic",
  government: "Government",
  ngo: "NGO",
  "think-tank": "Think Tank",
  "international-org": "International Organisation",
}

const TYPE_LABELS_DE: Record<Source["type"], string> = {
  academic: "Akademisch",
  government: "Regierung",
  ngo: "NGO",
  "think-tank": "Denkfabrik",
  "international-org": "Internationale Organisation",
}

const TYPE_ORDER: Source["type"][] = [
  "academic",
  "government",
  "ngo",
  "think-tank",
  "international-org",
]

const TYPE_BADGE_STYLES: Record<Source["type"], string> = {
  academic: "bg-blue-50 text-blue-700 ring-blue-200",
  government: "bg-green-50 text-green-700 ring-green-200",
  ngo: "bg-orange-50 text-orange-700 ring-orange-200",
  "think-tank": "bg-purple-50 text-purple-700 ring-purple-200",
  "international-org": "bg-slate-100 text-slate-700 ring-slate-200",
}

function SourceCard({ source, lang, relatedLabel, sourceLabel }: {
  source: Source
  lang: string
  relatedLabel: string
  sourceLabel: string
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-1 flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-sm font-semibold leading-snug text-slate-900">
            {source.title}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {source.authors.join(", ")} &middot; {source.institution} &middot; {source.year}
          </p>
        </div>
        {source.url && (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs font-medium text-blue-600 hover:underline"
          >
            {sourceLabel}
          </a>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{source.summary}</p>
      {source.relevantPolicies.length > 0 && (
        <div className="mt-4 border-t border-slate-100 pt-3">
          <span className="mr-2 text-xs font-medium text-slate-500">{relatedLabel}</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {source.relevantPolicies.map((id) => (
              <Link
                key={id}
                href={`/${lang}/policies/${id}`}
                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-700"
              >
                {id}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: langStr } = await params
  const lang = getLang(langStr)
  const T = translations[lang]
  const R = T.research
  const isDe = lang === "de"

  const allSources = getAllSources()
  const TYPE_LABELS = isDe ? TYPE_LABELS_DE : TYPE_LABELS_EN

  const grouped = TYPE_ORDER.reduce<Record<string, Source[]>>((acc, type) => {
    const items = allSources.filter((s) => s.type === type)
    if (items.length > 0) acc[type] = items
    return acc
  }, {})

  const subtitle = R.subtitle
    .replace("{{count}}", String(allSources.length))
    .replace("{{cats}}", String(Object.keys(grouped).length))

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-4 flex items-center gap-2 text-sm text-slate-500">
        <Link href={`/${lang}`} className="hover:text-slate-700">{T.common.home}</Link>
        <span>/</span>
        <span className="text-slate-900">{T.nav.research}</span>
      </nav>
      <h1 className="mb-2 text-3xl font-bold text-slate-900">{R.title}</h1>
      <p className="mb-8 max-w-2xl text-base leading-relaxed text-slate-600">{subtitle}</p>

      <div className="space-y-12">
        {TYPE_ORDER.filter((t) => grouped[t]).map((type) => (
          <section key={type}>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-lg font-semibold text-slate-900">
                {TYPE_LABELS[type]}
              </h2>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${TYPE_BADGE_STYLES[type]}`}
              >
                {grouped[type].length}
              </span>
            </div>
            <div className="space-y-4">
              {grouped[type].map((source) => (
                <SourceCard
                  key={source.id}
                  source={source}
                  lang={lang}
                  relatedLabel={R.relatedPolicies}
                  sourceLabel={R.sourceLink}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="mb-2 text-sm font-semibold text-slate-900">{R.aboutTitle}</h3>
        <p className="text-sm leading-relaxed text-slate-600">
          {R.aboutDesc}{" "}
          <Link href={`/${lang}/methodology`} className="text-blue-600 hover:underline">
            {R.aboutLink}
          </Link>
          {isDe ? "." : " for how sources inform evidence classification."}
        </p>
      </div>
    </div>
  )
}
