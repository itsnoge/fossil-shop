"use client"

import { usePathname, useRouter } from "@/i18n/navigation"
import { useLocale } from "next-intl"
import { startTransition, useEffect, useMemo } from "react"
import { Globe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const locales = useMemo(
    () => [
      { code: "en", label: "English" },
      { code: "fr", label: "Français" },
    ],
    [],
  )

  useEffect(() => {
    locales.forEach(({ code }) => {
      if (code !== locale && router.prefetch) {
        router.prefetch(pathname, { locale: code })
      }
    })
  }, [locale, pathname, locales, router])

  const switchLocale = (nextLocale: string) => {
    if (nextLocale === locale) return
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Select language">
          <Globe className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map(({ code, label }) => {
          const isActive = code === locale
          return (
            <DropdownMenuItem
              key={code}
              onClick={() => switchLocale(code)}
              className={`flex items-center ${
                isActive ? "bg-accent text-accent-foreground font-sans font-medium" : ""
              }`}
            >
              {label}
              {isActive && <span className="bg-primary ml-auto size-1 rounded-full" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
