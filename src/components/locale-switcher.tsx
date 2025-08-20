"use client"

import { usePathname, useRouter } from "@/i18n/navigation"
import { useLocale } from "next-intl"
import { startTransition, useEffect, useMemo } from "react"

type Props = {
  className?: string
}

export default function LocaleSwitcher({ className = "" }: Props) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  // Définir toutes les langues disponibles
  const locales = useMemo(
    () => [
      { code: "en", label: "English" },
      { code: "fr", label: "Français" },
    ],
    [],
  )

  // Précharger toutes les routes pour éviter le flash blanc
  useEffect(() => {
    locales.forEach(({ code }) => {
      if (code !== locale && router.prefetch) {
        router.prefetch(pathname, { locale: code })
      }
    })
  }, [locale, pathname, locales, router])

  // Switch de langue fluide
  const switchLocale = (nextLocale: string) => {
    if (nextLocale === locale) return
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <div className={`inline-flex items-center gap-1 rounded-lg border p-1 ${className}`}>
      {locales.map(({ code, label }) => {
        const active = code === locale
        return (
          <button
            key={code}
            onClick={() => switchLocale(code)}
            className={`rounded-md px-3 py-1 text-sm transition ${
              active
                ? "bg-foreground text-background"
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
            aria-pressed={active}
            aria-label={`Changer la langue en ${label}`}
          >
            {label.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
