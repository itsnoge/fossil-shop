"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { HeartFilledIcon } from "@sanity/icons"
import { Heart, Plus } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useFavoritesStore } from "@/store/favorites-store"

type ProductCardProps = {
  title: string
  slug: string
  price: number | null
  mainImage?: { url: string; alt?: string } | null
  hoverImage?: { url: string; alt?: string } | null
  discount?: { active: boolean; percentage: number } | null
  categories?: { _id: string; title: string; slug: string }[] | null
}

export default function ProductCard({
  title,
  price,
  slug,
  mainImage,
  hoverImage,
  categories,
  discount,
}: ProductCardProps) {
  const t = useTranslations("Buttons")

  const favorites = useFavoritesStore((state) => state.favorites)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  const isFavorite = favorites.includes(slug)

  const newCategory = categories?.find((c) => c.slug.toLowerCase() === "new")

  const hasDiscount = discount?.active && price != null
  const discountedPrice = hasDiscount ? price! * (1 - discount!.percentage / 100) : price

  return (
    <div className="group relative">
      <Link href={`/shop/product/${slug}`} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
          <Image
            src={mainImage?.url || "/placeholder.png"}
            alt={mainImage?.alt || title}
            fill
            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          {hoverImage && (
            <Image
              src={hoverImage.url || "/placeholder.png"}
              alt={hoverImage.alt || title}
              fill
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}

          <div className="absolute top-5 left-3 z-10 flex flex-col gap-1">
            {newCategory && (
              <Badge className="px-2 py-1 font-sans text-white uppercase">
                {newCategory.title}
              </Badge>
            )}
            {hasDiscount && (
              <Badge className="bg-white px-2 py-1 font-mono text-red-500 uppercase">
                -{discount!.percentage}%
              </Badge>
            )}
          </div>

          <div className="absolute top-5 right-3 z-10">
            <Button
              size="icon"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault()
                toggleFavorite(slug)
              }}
            >
              {isFavorite ? (
                <HeartFilledIcon className="size-5 text-red-500" />
              ) : (
                <Heart className="size-4" strokeWidth={1} />
              )}
            </Button>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <h3
            className="max-w-[70%] truncate font-sans text-xs font-medium uppercase"
            title={title}
          >
            {title}
          </h3>
          {hasDiscount ? (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-mono text-xs line-through">
                ${price!.toFixed(2)}
              </span>
              <span className="font-mono text-xs font-medium">${discountedPrice!.toFixed(2)}</span>
            </div>
          ) : (
            <p className="font-mono text-xs font-medium">
              ${price != null ? price.toFixed(2) : "0.00"}
            </p>
          )}
        </div>
      </Link>

      <div className="pointer-events-auto absolute right-3 bottom-10 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
        <Button
          onClick={(e) => {
            e.stopPropagation()
            console.log("Ajouter au panier:", title)
          }}
          className="flex w-36 items-center justify-between font-sans text-xs uppercase"
        >
          <p>{t("quick add")}</p>
          <Plus />
        </Button>
      </div>
    </div>
  )
}
