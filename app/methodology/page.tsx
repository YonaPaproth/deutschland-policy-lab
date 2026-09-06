import Link from "next/link"

const EVIDENCE_TYPES = [
  {
    type: "FACT",
    color: "bg-green-100 text-green-800",
    description:
      "Empirically measured and independently verified. Examples: GDP growth rate, unemployment figures, PISA scores. Sourced from official statistics with known methodology.",
  },
  {
    type: "EVIDENCE",
    color: "bg-blue-100 text-blue-800",
    description:
      "Supported by peer-reviewed research or systematic review, but with some uncertainty about applicability to Germany. Includes causal estimates from natural experiments, RCTs, or meta-analyses.",
  },
  {
    type: "ASSUMPTION",
    color: "bg-yellow-100 text-yellow-800",
    description:
      "A working hypothesis based on partial evidence. Used when direct evidence is unavailable but the assumption is plausible given adjacent evidence. Explicitly flagged.",
  },
  {
    type: "PROPOSAL",
    color: "bg-slate-100 text-slate-800",
    description:
      "A policy intervention that has been proposed but not yet tested. May have supporting theory or analogy from other contexts. Requires validation.",
  },
  {
    type: "UNCERTAINTY",
    color: "bg-orange-100 text-orange-800",
    description:
      "An area where evidence is genuinely contested, insufficient, or absent. Does not represent ignorance but known unknowns.",
  },
]

const EVIDENCE_STRENGTH_LEVELS = [
  {
    level: "High",
    dot: "bg-green-600",
    description:
      "Multiple high-quality studies with consistent findings; cross-country evidence supports transferability; mechanisms well understood. Example: interventions backed by multiple RCTs or large natural experiments.",
  },
  {
    level: "Medium",
    dot: "bg-blue-500",
    description:
      "Some rigorous evidence, but gaps in generalisability, sample size, or replication. Cross-country analogies exist but with meaningful contextual differences.",
  },
  {
    level: "Low",
    dot: "bg-yellow-500",
    description:
      "Limited rigorous evidence; primarily observational studies or single-country findings. Hypothesis is theoretically grounded but empirically weak.",
  },
  {
    level: "Very Low",
    dot: "bg-slate-400",
    description:
      "Largely speculative. Based on theoretical reasoning, expert opinion, or analogy from very different contexts. Treat as early-stage hypothesis only.",
  },
]

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-4 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-700">Home</Link>
        <span>/</span>
        <span className="text-slate-900">Methodology</span>
      </nav>

      <h1 className="mb-3 text-3xl font-bold text-slate-900">Evidence Framework</h1>
      <p className="mb-10 max-w-2xl text-base leading-relaxed text-slate-600">
        How we classify evidence, assess confidence, score policies, and decide what would change
        our minds.
      </p>

      {/* Evidence classification */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          1. Evidence classification
        </h2>
        <p className="mb-5 text-sm leading-relaxed text-slate-600">
          Every claim in a policy profile is assigned one of five types. This forces explicit
          distinction between verified facts and working hypotheses.
        </p>
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
              <p className="text-sm leading-relaxed text-slate-700">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Evidence strength */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          2. Evidence strength
        </h2>
        <p className="mb-5 text-sm leading-relaxed text-slate-600">
          Each policy is assigned an overall evidence strength rating based on the quality, quantity,
          and generalisability of relevant studies.
        </p>
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
                <span className="text-sm font-medium text-slate-700">{item.level}</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Confidence */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          3. Confidence percentage
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-slate-600">
          The confidence percentage (0–100%) is a synthetic judgment combining:
        </p>
        <ul className="mb-4 space-y-2 text-sm text-slate-700">
          {[
            "Quality and consistency of the underlying evidence base",
            "Transferability of international examples to the German context",
            "Degree of expert consensus on mechanism and effect size",
            "Remaining uncertainty about implementation and politics",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
              {item}
            </li>
          ))}
        </ul>
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm text-yellow-900">
            <span className="font-semibold">Important:</span> Confidence percentages are
            illustrative expert judgments, not probabilistic model outputs. They should be read
            as rough ordinal indicators (&ldquo;high / medium / low&rdquo;) rather than precise
            probabilities.
          </p>
        </div>
      </section>

      {/* Priority score formula */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          4. Priority score formula
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-slate-600">
          The priority score is an experimental ranking tool. It combines impact, evidence quality,
          confidence, and implementation difficulty into a single number (0–100). It is explicitly
          labelled as experimental and should not be used as a direct policy recommendation.
        </p>
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
        <p className="mt-3 text-xs italic text-slate-400">
          Experimental prioritisation model — not a policy recommendation
        </p>
      </section>

      {/* What Would Change Our Mind */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          5. &ldquo;What would change our mind?&rdquo;
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-slate-600">
          Each policy profile includes an explicit section on what evidence would update our
          assessment. This section has three parts:
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: "↑",
              color: "green",
              title: "Would increase confidence",
              desc: "Evidence that would make us more confident the intervention would work as hypothesised.",
            },
            {
              icon: "↓",
              color: "yellow",
              title: "Would decrease confidence",
              desc: "Findings that would weaken our assessment without necessarily abandoning the direction.",
            },
            {
              icon: "✕",
              color: "red",
              title: "Would abandon recommendation",
              desc: "Evidence or findings so contrary that the intervention should be dropped or fundamentally redesigned.",
            },
          ].map((item) => (
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
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          This structure reflects a Popperian commitment to falsifiability: good policy analysis
          should specify in advance what would constitute counter-evidence, not just accumulate
          supporting evidence. It also guards against motivated reasoning.
        </p>
      </section>

      {/* Research principles link */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="mb-2 text-sm font-semibold text-slate-900">Research Principles</h3>
        <p className="mb-3 text-sm leading-relaxed text-slate-600">
          All analysis follows a set of non-partisan research principles: separate evidence from
          opinion, disclose uncertainty, present counterarguments, avoid party framing, and cite
          sources.
        </p>
        <Link
          href="/about"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Read about the project &rarr;
        </Link>
      </div>
    </div>
  )
}
