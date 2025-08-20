import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Returns a localized version of an object (e.g., a Sanity document)
export const getLocalized = (item: any, lang = "en") => {
  const localized: any = { _id: item._id }

  Object.keys(item).forEach((key) => {
    const value = item[key]

    // If it's a localized string object, pick the requested language or fallback to English
    if (value && typeof value === "object" && "en" in value) {
      localized[key] = value[lang] || value.en

      // If it's a slug object, pick the slug for the requested language or fallback to English
    } else if (value && typeof value === "object" && value.slug && "en" in value.slug) {
      localized[key] = value.slug[lang]?.current || value.slug.en?.current

      // Otherwise, just copy the value
    } else {
      localized[key] = value
    }
  })

  return localized
}
