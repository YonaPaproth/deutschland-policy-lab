import Link from "next/link"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/policies", label: "Policies" },
  { href: "/compare", label: "Compare" },
  { href: "/2036", label: "2036" },
  { href: "/research", label: "Research" },
  { href: "/ask", label: "Ask AI" },
  { href: "/about", label: "About" },
]

export default function Nav() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center gap-1 overflow-x-auto scrollbar-none">
          <Link
            href="/"
            className="mr-4 shrink-0 text-sm font-semibold tracking-tight text-slate-900"
          >
            Deutschland Policy Lab
          </Link>
          <div className="flex items-center gap-1">
            {NAV_LINKS.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-md px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
