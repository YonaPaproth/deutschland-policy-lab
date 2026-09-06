import Nav from "@/components/nav"
import { getLang } from "@/lib/i18n/translations"

export function generateStaticParams() {
  return [{ lang: "de" }, { lang: "en" }]
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: langStr } = await params
  const lang = getLang(langStr)

  const footerText =
    lang === "de"
      ? "Deutschland Policy Lab \u2014 \u00fcberparteilich, evidenzbasiert. Alle Daten illustrativ, sofern nicht zitiert."
      : "Deutschland Policy Lab \u2014 non-partisan, evidence-driven. All data illustrative unless cited."

  return (
    <>
      <Nav lang={lang} />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-slate-500">{footerText}</p>
        </div>
      </footer>
    </>
  )
}
