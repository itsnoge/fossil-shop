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

  const path = pathname.split("?")[0].split("#")[0]
  const segments = path.split("/").filter(Boolean)

  const shopIndex = segments.indexOf("shop")

  let activeCategory = "all"
  if (shopIndex !== -1) {
    const nextSeg = segments[shopIndex + 1]
    const maybeSlug = segments[shopIndex + 2]

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
    <ul className="flex flex-wrap gap-5 md:justify-end">
      <li>
        <NavLink
          href="/shop"
          label="All"
          dotPosition="none"
          isActive={activeCategory === "all"}
          className={`font-sans font-medium ${
            activeCategory === "all" ? "" : "text-muted-foreground/70"
          }`}
        />
      </li>

      {sortedCategories.map((category) => (
        <li key={category._id}>
          <NavLink
            href={`/shop/categories/${category.slug}`}
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
