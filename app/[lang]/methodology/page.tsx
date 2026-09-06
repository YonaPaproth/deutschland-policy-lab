import Link from "next/link"
import { getLang, translations } from "@/lib/i18n/translations"

const EVIDENCE_TYPES = [
  {
    type: "FACT",
    color: "bg-green-100 text-green-800",
    description:
      "Empirically measured and independently verified. Examples: GDP growth rate, unemployment figures, PISA scores. Sourced from official statistics with known methodology.",
    descriptionDe:
      "Empirisch gemessen und unabhängig verifiziert. Beispiele: BIP-Wachstumsrate, Arbeitslosenzahlen, PISA-Ergebnisse. Aus offiziellen Statistiken mit bekannter Methodik.",
  },
  {
    type: "EVIDENCE",
    color: "bg-blue-100 text-blue-800",
    description:
      "Supported by peer-reviewed research or systematic review, but with some uncertainty about applicability to Germany. Includes causal estimates from natural experiments, RCTs, or meta-analyses.",
    descriptionDe:
      "Durch peer-reviewte Forschung oder systematische Übersichten gestützt, aber mit Unsicherheit über die Anwendbarkeit auf Deutschland. Umfasst kausale Schätzungen aus natürlichen Experimenten, RCTs oder Meta-Analysen.",
  },
  {
    type: "ASSUMPTION",
    color: "bg-yellow-100 text-yellow-800",
    description:
      "A working hypothesis based on partial evidence. Used when direct evidence is unavailable but the assumption is plausible given adjacent evidence. Explicitly flagged.",
    descriptionDe:
      "Eine Arbeitshypothese auf Basis partieller Evidenz. Wird verwendet, wenn direkte Evidenz fehlt, die Annahme aber plausibel ist. Explizit gekennzeichnet.",
  },
  {
    type: "PROPOSAL",
    color: "bg-slate-100 text-slate-800",
    description:
      "A policy intervention that has been proposed but not yet tested. May have supporting theory or analogy from other contexts. Requires validation.",
    descriptionDe:
      "Eine Politikintervention, die vorgeschlagen, aber noch nicht erprobt wurde. Kann durch Theorie oder Analogien aus anderen Kontexten gestützt sein. Erfordert Validierung.",
  },
  {
    type: "UNCERTAINTY",
    color: "bg-orange-100 text-orange-800",
    description:
      "An area where evidence is genuinely contested, insufficient, or absent. Does not represent ignorance but known unknowns.",
    descriptionDe:
      "Ein Bereich, in dem Evidenz tatsächlich umstritten, unzureichend oder nicht vorhanden ist. Kein Unwissen, sondern bekannte Unbekannte.",
  },
]

const EVIDENCE_STRENGTH_LEVELS = [
  {
    level: "High",
    levelDe: "Hoch",
    dot: "bg-green-600",
    description:
      "Multiple high-quality studies with consistent findings; cross-country evidence supports transferability; mechanisms well understood.",
    descriptionDe:
      "Mehrere hochwertige Studien mit konsistenten Befunden; länderübergreifende Evidenz stützt die Übertragbarkeit; Mechanismen gut verstanden.",
  },
  {
    level: "Medium",
    levelDe: "Mittel",
    dot: "bg-blue-500",
    description:
      "Some rigorous evidence, but gaps in generalisability, sample size, or replication. Cross-country analogies exist but with meaningful contextual differences.",
    descriptionDe:
      "Einige rigorose Evidenz, aber Lücken bei Generalisierbarkeit, Stichprobengröße oder Replikation. Länderübergreifende Analogien bestehen, aber mit wesentlichen Kontextunterschieden.",
  },
  {
    level: "Low",
    levelDe: "Gering",
    dot: "bg-yellow-500",
    description:
      "Limited rigorous evidence; primarily observational studies or single-country findings. Hypothesis is theoretically grounded but empirically weak.",
    descriptionDe:
      "Begrenzte rigorose Evidenz; primär Beobachtungsstudien oder Einzelländerbefunde. Hypothese ist theoretisch fundiert, aber empirisch schwach.",
  },
  {
    level: "Very Low",
    levelDe: "Sehr gering",
    dot: "bg-slate-400",
    description:
      "Largely speculative. Based on theoretical reasoning, expert opinion, or analogy from very different contexts. Treat as early-stage hypothesis only.",
    descriptionDe:
      "Überwiegend spekulativ. Basiert auf theoretischen Überlegungen, Expertenmeinungen oder Analogien aus sehr unterschiedlichen Kontexten. Nur als Frühphasenhypothese behandeln.",
  },
]

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: langStr } = await params
  const lang = getLang(langStr)
  const T = translations[lang]
  const M = T.methodology
  const isDe = lang === "de"

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-4 flex items-center gap-2 text-sm text-slate-500">
        <Link href={`/${lang}`} className="hover:text-slate-700">{T.common.home}</Link>
        <span>/</span>
        <span className="text-slate-900">{T.nav.methodology}</span>
      </nav>

      <h1 className="mb-3 text-3xl font-bold text-slate-900">{M.title}</h1>
      <p className="mb-10 max-w-2xl text-base leading-relaxed text-slate-600">{M.subtitle}</p>

      {/* Evidence classification */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">{M.evidenceClassTitle}</h2>
        <p className="mb-5 text-sm leading-relaxed text-slate-600">{M.evidenceClassDesc}</p>
        <div className="space-y-3">
          {EVIDENCE_TYPES.map((item) => (
            <div
              key={item.type}
              className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4"
            >
              <span
                className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${item.color}`}
              >
                {item.type}
              </span>
              <p className="text-sm leading-relaxed text-slate-700">
                {isDe ? item.descriptionDe : item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Evidence strength */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">{M.evidenceStrengthTitle}</h2>
        <p className="mb-5 text-sm leading-relaxed text-slate-600">{M.evidenceStrengthDesc}</p>
        <div className="space-y-3">
          {EVIDENCE_STRENGTH_LEVELS.map((item) => (
            <div
              key={item.level}
              className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4"
            >
              <div className="mt-1.5 flex shrink-0 items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${item.dot}`}
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-slate-700">
                  {isDe ? item.levelDe : item.level}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                {isDe ? item.descriptionDe : item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Confidence */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">{M.confidenceTitle}</h2>
        <p className="mb-4 text-sm leading-relaxed text-slate-600">{M.confidenceDesc}</p>
        <ul className="mb-4 space-y-2 text-sm text-slate-700">
          {M.confidenceItems.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
              {item}
            </li>
          ))}
        </ul>
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm text-yellow-900">
            <span className="font-semibold">{isDe ? "Wichtig:" : "Important:"}</span>{" "}
            {M.confidenceNote}
          </p>
        </div>
      </section>

      {/* Priority score formula */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">{M.priorityTitle}</h2>
        <p className="mb-4 text-sm leading-relaxed text-slate-600">{M.priorityDesc}</p>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-sm">
          <p className="mb-2 text-slate-700">
            <span className="font-semibold text-slate-900">raw</span> = (expectedImpact &times; evidenceWeight &times; confidence) / implementationDifficulty
          </p>
          <p className="mb-4 text-slate-700">
            <span className="font-semibold text-slate-900">score</span> = round((raw / 5) &times; 100)
          </p>
          <div className="space-y-1 text-xs text-slate-500">
            <p>expectedImpact: 1–5 (researcher judgment)</p>
            <p>evidenceWeight: very-low=0.2 | low=0.4 | medium=0.7 | high=1.0</p>
            <p>confidence: 0–100% &rarr; normalised to 0–1 (or 30 if unknown)</p>
            <p>implementationDifficulty: 1–5 (1 = easiest)</p>
            <p>max raw = (5 &times; 1.0 &times; 1.0) / 1 = 5 &rarr; normalised to 100</p>
          </div>
        </div>
        <p className="mt-3 text-xs italic text-slate-400">{M.priorityNote}</p>
      </section>

      {/* What Would Change Our Mind */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">{M.whatTitle}</h2>
        <p className="mb-4 text-sm leading-relaxed text-slate-600">{M.whatDesc}</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {M.whatItems.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-slate-200 bg-white p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full bg-${item.color}-100 text-xs font-bold text-${item.color}-700`}
                >
                  {item.icon}
                </span>
                <span className="text-xs font-semibold text-slate-700">{item.title}</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{M.whatNote}</p>
      </section>

      {/* Research principles link */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="mb-2 text-sm font-semibold text-slate-900">{M.researchTitle}</h3>
        <p className="mb-3 text-sm leading-relaxed text-slate-600">{M.researchDesc}</p>
        <Link
          href={`/${lang}/about`}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          {M.researchLink}
        </Link>
      </div>
    </div>
  )
}
