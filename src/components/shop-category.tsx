"use client"

import { NavLink } from "@/components/nav-link"
import { GET_CATEGORIES_RESULT } from "@/sanity/lib/types"
import { usePathname } from "next/navigation"

type CategoryNavProps = {
  categories: GET_CATEGORIES_RESULT[]
}

const desiredSlugOrder = ["tops", "bottoms", "new", "summer-2025"]

export default function ShopCategory({ categories }: CategoryNavProps) {
  const pathname = usePathname() || "/"

  // Ex: "/en/shop/categories/new" -> segments = ["en","shop","categories","new"]
  const path = pathname.split("?")[0].split("#")[0]
  const segments = path.split("/").filter(Boolean)

  // Trouve l'index du segment "shop" indépendamment de la locale
  const shopIndex = segments.indexOf("shop")

  let activeCategory = "all"
  if (shopIndex !== -1) {
    const nextSeg = segments[shopIndex + 1] // "categories" ou undefined
    const maybeSlug = segments[shopIndex + 2] // le slug éventuel

    if (nextSeg === "categories" && maybeSlug) {
      activeCategory = decodeURIComponent(maybeSlug).toLowerCase()
    } else {
      activeCategory = "all"
    }
  }

  const sortedCategories = categories
    .map((c) => ({
      ...c,
      slug: c.slug.trim().toLowerCase(),
      title: c.title.trim(),
    }))
    .filter((c) => desiredSlugOrder.includes(c.slug))
    .sort((a, b) => desiredSlugOrder.indexOf(a.slug) - desiredSlugOrder.indexOf(b.slug))

  return (
    <ul className="flex gap-5 md:justify-end">
      {/* All */}
      <li>
        <NavLink
          href="/shop"
          label="All"
          dotPosition="none" // 👈 important: montre le dot quand isActive=true
          isActive={activeCategory === "all"}
          className={`font-sans font-medium ${
            activeCategory === "all" ? "" : "text-muted-foreground/70"
          }`}
        />
      </li>

      {/* Catégories */}
      {sortedCategories.map((category) => (
        <li key={category._id}>
          <NavLink
            href={`/shop/categories/${category.slug}`} // le Link i18n préfixera la locale automatiquement
            label={category.title}
            dotPosition="none"
            isActive={activeCategory === category.slug}
            className={`font-sans font-medium ${
              activeCategory === category.slug ? "" : "text-muted-foreground/70"
            }`}
          />
        </li>
      ))}
    </ul>
  )
}
