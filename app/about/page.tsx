import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-4 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-700">Home</Link>
        <span>/</span>
        <span className="text-slate-900">About</span>
      </nav>

      <h1 className="mb-8 text-3xl font-bold text-slate-900">About Deutschland Policy Lab</h1>

      <div className="prose prose-slate max-w-none space-y-10">
        {/* What it is */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">What it is</h2>
          <p className="text-sm leading-relaxed text-slate-700">
            Deutschland Policy Lab is an open-source, non-partisan policy intelligence platform. It
            collects, structures, and evaluates evidence on the most important reform challenges
            facing Germany — from housing and state digitalisation to skilled migration, energy,
            and education.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Every policy profile asks the same questions: What is the problem? What intervention
            is proposed? What does the evidence say? What would it cost? Who benefits, who bears
            the cost? What would change our mind?
          </p>
        </section>

        {/* Why it exists */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Why it exists</h2>
          <p className="text-sm leading-relaxed text-slate-700">
            German public debate spends enormous energy on party positions, coalition arithmetic,
            and procedural questions. The empirical question — &ldquo;does this policy actually
            work?&rdquo; — is often secondary or absent.
          </p>
          <blockquote className="my-5 border-l-4 border-blue-600 pl-5">
            <p className="text-base leading-relaxed text-slate-700 italic">
              &ldquo;The goal is not to automate democracy. The goal is to make the empirical part
              of policymaking much better.&rdquo;
            </p>
          </blockquote>
          <p className="text-sm leading-relaxed text-slate-700">
            Better evidence does not produce better policy on its own. But the absence of good
            evidence infrastructure makes it very easy to ignore evidence when it is inconvenient.
            This project is a small attempt to build that infrastructure in public.
          </p>
        </section>

        {/* What it is NOT */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">What it is not</h2>
          <ul className="space-y-2 text-sm text-slate-700">
            {[
              "Not affiliated with any political party, government, or lobby group",
              "Not a replacement for democratic deliberation — this tool informs debate, it does not resolve it",
              "Not a source of authoritative data — all figures are illustrative unless explicitly cited and should be verified against primary sources",
              "Not professionally peer-reviewed — this is an open-source project in early development",
              "Not a policy recommendation engine — priority scores are experimental and should not be used as decision criteria",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Non-partisan principles */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Non-partisan principles</h2>
          <p className="mb-3 text-sm leading-relaxed text-slate-700">
            All analysis follows these rules:
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            {[
              "Never frame a policy question in terms of party positions or electoral outcomes",
              "Explicitly separate FACT, EVIDENCE, ASSUMPTION, PROPOSAL, and UNCERTAINTY",
              "Always present the strongest version of counterarguments",
              "Disclose the limitations of every source cited",
              "Show what would change our assessment — not just evidence that supports it",
              "Label all numbers with appropriate uncertainty",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* How to contribute */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">How to contribute</h2>
          <p className="text-sm leading-relaxed text-slate-700">
            The project is open source. You can contribute by:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {[
              "Adding new policy profiles (following the structured template)",
              "Improving evidence citations on existing profiles",
              "Identifying counterarguments or open questions we have missed",
              "Flagging factual errors or outdated information",
              "Improving the code, design, or methodology documentation",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              View on GitHub &rarr;
            </a>
          </div>
        </section>

        {/* Project status */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Project status</h2>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-200">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Experimental — Early Stage
            </span>
            <span className="text-xs text-slate-500">
              Data is illustrative. Not suitable for official policy use.
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            This is an early-stage research project. The policy database, evidence classifications,
            and scoring models are works in progress and should be treated accordingly. We welcome
            critical feedback.
          </p>
        </section>

        {/* Links */}
        <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-6">
          <Link href="/policies" className="text-sm font-medium text-blue-600 hover:underline">
            Policy Explorer
          </Link>
          <Link href="/methodology" className="text-sm font-medium text-blue-600 hover:underline">
            Methodology
          </Link>
          <Link href="/research" className="text-sm font-medium text-blue-600 hover:underline">
            Research Library
          </Link>
          <Link href="/2036" className="text-sm font-medium text-blue-600 hover:underline">
            Germany 2036
          </Link>
        </div>
      </div>
    </div>
  )
}
