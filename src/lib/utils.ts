import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name?: string) {
  if (!name) return ""
  return name
    .split(" ")
    .filter((word) => word.length)
    .map((word) => word[0].toUpperCase())
    .join("")
}

export function formatCurrency(amount: number, locale: string): string {
  const localeMap: Record<string, string> = {
    fr: "fr-FR",
    en: "en-US",
  }

  const currencyMap: Record<string, string> = {
    fr: "EUR",
    en: "USD",
  }

  const fullLocale = localeMap[locale] || "en-US"
  const currency = currencyMap[locale] || "USD"

  return new Intl.NumberFormat(fullLocale, {
    style: "currency",
    currency,
  }).format(amount)
}
