"use client"

import { usePathname } from "next/navigation"
import type { Lang } from "./translations"

export function useLang(): Lang {
  const pathname = usePathname()
  if (pathname?.startsWith("/en")) return "en"
  return "de"
}
