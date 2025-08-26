"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { HeartFilledIcon } from "@sanity/icons"
import { Heart, Minus, Plus } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useFavoritesStore } from "@/store/favorites-store"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

type ProductCardProps = {
  title: string
  slug: string
  price: number | null
  mainImage?: { url: string; alt?: string } | null
  hoverImage?: { url: string; alt?: string } | null
  discount?: { active: boolean; percentage: number } | null
  categories?: { _id: string; title: string; slug: string }[] | null
  sizes?: { size: string; stock: number }[] | null
}

export default function ProductCard({
  title,
  price,
  slug,
  mainImage,
  hoverImage,
  categories,
  discount,
  sizes,
}: ProductCardProps) {
  const tButtons = useTranslations("Buttons")
  const tLabels = useTranslations("Labels")

  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)

  const favorites = useFavoritesStore((state) => state.favorites)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  const isFavorite = favorites.includes(slug)

  const newCategory = categories?.find((c) => c.slug.toLowerCase() === "new")

  const hasDiscount = discount?.active && price != null
  const discountedPrice = hasDiscount ? price! * (1 - discount!.percentage / 100) : price
  const stockMax = selectedSize ? (sizes?.find((s) => s.size === selectedSize)?.stock ?? 1) : 1

  return (
    <div className="group relative">
      <Link href={`/shop/product/${slug}`} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
          <Image
            src={mainImage?.url || "/placeholder.png"}
            alt={mainImage?.alt || title}
            fill
            priority
            sizes="(max-width: 640px) 90vw, (max-width: 768px) 40vw, 25vw"
            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          {hoverImage && (
            <Image
              src={hoverImage.url || "/placeholder.png"}
              alt={hoverImage.alt || title}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 768px) 40vw, 25vw"
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
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={(e) => e.stopPropagation()}
            className="pointer-events-auto absolute right-3 bottom-10 flex w-36 items-center justify-between font-sans text-xs uppercase transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100"
          >
            <p>{tButtons("quick add")}</p>
            <Plus />
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-xl overflow-hidden p-0">
          <div className="flex flex-col md:flex-row">
            <div className="relative md:w-1/2">
              <Image
                src={mainImage?.url || "/placeholder.png"}
                alt={title}
                className="h-64 w-full object-cover md:h-full"
                width={400}
                height={400}
              />
            </div>

            <div className="p-6 md:w-1/2">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-start">
                  <p className="font-sans font-medium">{title}</p>
                </DialogTitle>
              </DialogHeader>

              <div className="mb-4 font-mono text-sm">
                {hasDiscount ? (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground line-through">${price!.toFixed(2)}</span>
                    <span className="font-medium">${discountedPrice!.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="font-medium">${price?.toFixed(2)}</span>
                )}
              </div>

              <div className="mb-4">
                <h4 className="mb-2 font-sans text-sm font-medium">{tLabels("size")}</h4>
                <div className="flex flex-wrap gap-2">
                  {sizes?.map((s) => (
                    <Button
                      key={s.size}
                      variant={selectedSize === s.size ? "default" : "outline"}
                      onClick={() => {
                        setSelectedSize(s.size)
                        setQuantity(1)
                      }}
                      size="sm"
                      className="size-7 font-sans text-xs uppercase"
                    >
                      {s.size}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h4 className="mb-2 font-sans text-sm font-medium">{tLabels("quantity")}</h4>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-7"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="size-3" />
                  </Button>
                  <span className="w-6 text-center font-mono text-sm font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-7"
                    onClick={() => setQuantity(Math.min(quantity + 1, stockMax))}
                  >
                    <Plus className="size-3" />
                  </Button>
                </div>
              </div>
              <div>
                <Button
                  className="mt-4 w-full font-sans"
                  onClick={() => {
                    if (!selectedSize) {
                      alert("Veuillez sélectionner une taille")
                      return
                    }
                    console.log(
                      `Produit ajouté: ${title}, taille: ${selectedSize}, quantité: ${quantity}`,
                    )
                  }}
                >
                  {tButtons("add to cart")}
                </Button>
                <DialogClose asChild>
                  <Button variant="secondary" className="mt-4 w-full font-sans">
                    {tButtons("cancel")}
                  </Button>
                </DialogClose>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
