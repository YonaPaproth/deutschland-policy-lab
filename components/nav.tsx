"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { Lang } from "@/lib/i18n/translations"
import { translations } from "@/lib/i18n/translations"

interface NavProps {
  lang: Lang
}

export default function Nav({ lang }: NavProps) {
  const pathname = usePathname()
  const T = translations[lang]

  function switchLang(newLang: Lang): string {
    // Replace /{lang} prefix with /{newLang}
    return pathname?.replace(/^\/(de|en)/, `/${newLang}`) ?? `/${newLang}`
  }

  const NAV_LINKS = [
    { href: `/${lang}/policies`, label: T.nav.policies },
    { href: `/${lang}/compare`, label: T.nav.compare },
    { href: `/${lang}/2036`, label: T.nav.dashboard },
    { href: `/${lang}/research`, label: T.nav.research },
    { href: `/${lang}/ask`, label: T.nav.ask },
    { href: `/${lang}/about`, label: T.nav.about },
  ]

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center gap-1 overflow-x-auto scrollbar-none">
          <Link
            href={`/${lang}`}
            className="mr-4 shrink-0 text-sm font-semibold tracking-tight text-slate-900"
          >
            Deutschland Policy Lab
          </Link>
          <div className="flex flex-1 items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-md px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language switcher */}
          <div className="ml-2 flex shrink-0 items-center gap-0.5 rounded-lg border border-slate-200 p-0.5">
            <Link
              href={switchLang("de")}
              className={`rounded px-2 py-1 text-xs font-semibold transition-colors ${
                lang === "de"
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              DE
            </Link>
            <Link
              href={switchLang("en")}
              className={`rounded px-2 py-1 text-xs font-semibold transition-colors ${
                lang === "en"
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              EN
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
