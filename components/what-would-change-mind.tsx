interface WhatWouldChangeMindProps {
  whatWouldChangeOurMind: {
    increaseConfidence: string[]
    decreaseConfidence: string[]
    abandonRecommendation: string[]
  }
  className?: string
  lang?: "de" | "en"
}

function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p className="text-sm italic text-slate-400">None specified.</p>
  }
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm leading-snug text-slate-700">
          <span className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true">
            –
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function WhatWouldChangeMind({ whatWouldChangeOurMind, className = "", lang = "en" }: WhatWouldChangeMindProps) {
  const { increaseConfidence, decreaseConfidence, abandonRecommendation } = whatWouldChangeOurMind
  const isDe = lang === "de"

  const heading = isDe ? "Was würde unsere Meinung ändern?" : "What would change our mind?"
  const subheading = isDe
    ? "Evidenz und Befunde, die diese Einschätzung aktualisieren würden."
    : "Evidence and findings that would update this assessment."
  const increaseLabel = isDe ? "Würde Konfidenz erhöhen" : "Would increase confidence"
  const decreaseLabel = isDe ? "Würde Konfidenz senken" : "Would decrease confidence"
  const abandonLabel = isDe ? "Würde Empfehlung aufgeben" : "Would abandon recommendation"

  return (
    <section
      className={`rounded-xl border border-slate-200 bg-slate-50 p-6 ${className}`}
      aria-labelledby="wcm-heading"
    >
      <div className="mb-5 flex items-start gap-3">
        <span className="mt-0.5 text-xl" aria-hidden="true">
          🔍
        </span>
        <div>
          <h2 id="wcm-heading" className="text-base font-semibold text-slate-900">
            {heading}
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">{subheading}</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {/* Increase confidence */}
        <div className="rounded-lg border border-green-100 bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
              ↑
            </span>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-green-700">
              {increaseLabel}
            </h3>
          </div>
          <BulletList items={increaseConfidence} />
        </div>

        {/* Decrease confidence */}
        <div className="rounded-lg border border-yellow-100 bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-700">
              ↓
            </span>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-yellow-700">
              {decreaseLabel}
            </h3>
          </div>
          <BulletList items={decreaseConfidence} />
        </div>

        {/* Abandon recommendation */}
        <div className="rounded-lg border border-red-100 bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
              ✕
            </span>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-red-700">
              {abandonLabel}
            </h3>
          </div>
          <BulletList items={abandonRecommendation} />
        </div>
      </div>
    </section>
  )
}
