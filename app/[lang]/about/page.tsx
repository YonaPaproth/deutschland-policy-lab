import Link from "next/link"
import { getLang, translations } from "@/lib/i18n/translations"

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: langStr } = await params
  const lang = getLang(langStr)
  const T = translations[lang]
  const A = T.about

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-4 flex items-center gap-2 text-sm text-slate-500">
        <Link href={`/${lang}`} className="hover:text-slate-700">{T.common.home}</Link>
        <span>/</span>
        <span className="text-slate-900">{T.nav.about}</span>
      </nav>

      <h1 className="mb-8 text-3xl font-bold text-slate-900">{A.title}</h1>

      <div className="prose prose-slate max-w-none space-y-10">
        {/* What it is */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">{A.what}</h2>
          <p className="text-sm leading-relaxed text-slate-700">{A.whatText1}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{A.whatText2}</p>
        </section>

        {/* Why it exists */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">{A.why}</h2>
          <p className="text-sm leading-relaxed text-slate-700">{A.whyText1}</p>
          <blockquote className="my-5 border-l-4 border-blue-600 pl-5">
            <p className="text-base leading-relaxed text-slate-700 italic">
              &ldquo;{A.quote}&rdquo;
            </p>
          </blockquote>
          <p className="text-sm leading-relaxed text-slate-700">{A.whyText2}</p>
        </section>

        {/* What it is not */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">{A.notWhat}</h2>
          <ul className="space-y-2 text-sm text-slate-700">
            {A.notWhatItems.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Non-partisan principles */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">{A.principles}</h2>
          <p className="mb-3 text-sm leading-relaxed text-slate-700">{A.principlesIntro}</p>
          <ul className="space-y-2 text-sm text-slate-700">
            {A.principlesItems.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* How to contribute */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">{A.contribute}</h2>
          <p className="text-sm leading-relaxed text-slate-700">{A.contributeText}</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {A.contributeItems.map((item) => (
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
              {A.contributeBtn}
            </a>
          </div>
        </section>

        {/* Project status */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">{A.status}</h2>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-200">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              {A.statusBadge}
            </span>
            <span className="text-xs text-slate-500">{A.statusNote}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{A.statusDesc}</p>
        </section>

        {/* Links */}
        <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-6">
          <Link href={`/${lang}/policies`} className="text-sm font-medium text-blue-600 hover:underline">
            {T.nav.policies}
          </Link>
          <Link href={`/${lang}/methodology`} className="text-sm font-medium text-blue-600 hover:underline">
            {T.nav.methodology}
          </Link>
          <Link href={`/${lang}/research`} className="text-sm font-medium text-blue-600 hover:underline">
            {T.nav.research}
          </Link>
          <Link href={`/${lang}/2036`} className="text-sm font-medium text-blue-600 hover:underline">
            {T.nav.dashboard}
          </Link>
        </div>
      </div>
    </div>
  )
}
