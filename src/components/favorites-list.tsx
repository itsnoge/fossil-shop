"use client"

import { useEffect, useState } from "react"
import { useFavoritesStore } from "@/store/favorites-store"
import ProductCard from "@/components/product-card"
import { GET_PRODUCTS_RESULT } from "@/sanity/lib/types"
import { client } from "@/sanity/lib/client"
import { GET_PRODUCTS } from "@/sanity/lib/queries"
import { useTranslations } from "next-intl"
import LoadingCircle from "@/components/ui/loading-circle"

type Props = {
  locale: string
}

export default function FavoritesList({ locale }: Props) {
  const t = useTranslations("Messages")
  const favorites = useFavoritesStore((state) => state.favorites)
  const [favoritesProducts, setFavoritesProducts] = useState<GET_PRODUCTS_RESULT[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!favorites.length) {
        setFavoritesProducts([])
        setLoading(false)
        return
      }

      try {
        const allProducts = await client.fetch<GET_PRODUCTS_RESULT[]>(GET_PRODUCTS, { locale })

        const filteredAndSorted = allProducts
          .filter((product) => {
            const productSlug = typeof product.slug === "string" ? product.slug : product.slug
            return favorites.includes(productSlug)
          })
          .sort((a, b) => {
            const aIndex = favorites.indexOf(typeof a.slug === "string" ? a.slug : a.slug)
            const bIndex = favorites.indexOf(typeof b.slug === "string" ? b.slug : b.slug)
            return bIndex - aIndex
          })

        setFavoritesProducts(filteredAndSorted)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [favorites, locale])

  if (loading)
    return (
      <div className="h-64">
        <LoadingCircle />
      </div>
    )

  if (!favoritesProducts.length)
    return <p className="text-center font-sans text-xs">{t("no favorites")}</p>

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {favoritesProducts.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  )
}
