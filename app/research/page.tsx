import Link from "next/link"
import { getAllSources } from "@/lib/sources"
import type { Source } from "@/data/sources"

const TYPE_LABELS: Record<Source["type"], string> = {
  academic: "Academic",
  government: "Government",
  ngo: "NGO",
  "think-tank": "Think Tank",
  "international-org": "International Organisation",
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

function SourceCard({ source }: { source: Source }) {
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
            Source &rarr;
          </a>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{source.summary}</p>
      {source.relevantPolicies.length > 0 && (
        <div className="mt-4 border-t border-slate-100 pt-3">
          <span className="mr-2 text-xs font-medium text-slate-500">Related policies:</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {source.relevantPolicies.map((id) => (
              <Link
                key={id}
                href={`/policies/${id}`}
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

export default function ResearchPage() {
  const allSources = getAllSources()

  const grouped = TYPE_ORDER.reduce<Record<string, Source[]>>((acc, type) => {
    const items = allSources.filter((s) => s.type === type)
    if (items.length > 0) acc[type] = items
    return acc
  }, {})

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-700">Home</Link>
        <span>/</span>
        <span className="text-slate-900">Research</span>
      </nav>
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Research Library</h1>
      <p className="mb-8 max-w-2xl text-base leading-relaxed text-slate-600">
        All sources cited in the policy database, grouped by type. {allSources.length} sources across{" "}
        {Object.keys(grouped).length} categories.
      </p>

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
                <SourceCard key={source.id} source={source} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="mb-2 text-sm font-semibold text-slate-900">About this library</h3>
        <p className="text-sm leading-relaxed text-slate-600">
          Sources were selected to represent the strongest available evidence on each policy domain.
          Inclusion does not imply endorsement of all conclusions. See the{" "}
          <Link href="/methodology" className="text-blue-600 hover:underline">
            methodology page
          </Link>{" "}
          for how sources inform evidence classification.
        </p>
      </div>
    </div>
  )
}
