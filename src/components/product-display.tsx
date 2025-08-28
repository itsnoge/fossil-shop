"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import SizeSelector from "@/components/size-selector"
import QuantitySelector from "@/components/quantity-selector"
import { useCartStore } from "@/store/cart-store"
import { useFavoritesStore } from "@/store/favorites-store"
import { formatCurrency } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useTranslations } from "next-intl"
import { HeartFilledIcon } from "@sanity/icons"
import { Heart } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type Product = {
  _id: string
  title: string
  slug: string
  price: number | null
  mainImage?: { url: string; alt?: string } | null
  hoverImage?: { url: string; alt?: string } | null
  gallery?: { url: string; alt?: string }[] | null
  sizes?: { size: string; stock?: number }[] | null
  discount?: { active: boolean; percentage: number } | null
}

type Props = {
  product: Product
  locale: string
}

export default function ProductDisplay({ product, locale }: Props) {
  const tLabels = useTranslations("Labels")
  const tButtons = useTranslations("Buttons")
  const tAccordion = useTranslations("ProductAccordion")

  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)

  const addItem = useCartStore((state) => state.addItem)
  const favorites = useFavoritesStore((state) => state.favorites)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const isFavorite = favorites.includes(product.slug)

  const hasDiscount = product.discount?.active && product.price != null
  const discountedPrice = hasDiscount
    ? product.price! * (1 - product.discount!.percentage / 100)
    : product.price

  const mainImage = product.mainImage ?? { url: "/placeholder.png", alt: product.title }
  const hoverImage = product.hoverImage
  const gallery = product.gallery ?? []
  const sizes = product.sizes ?? []

  return (
    <div>
      <div className="grid min-h-screen grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-2">
          <div className="hidden grid-cols-1 gap-1 md:grid md:grid-cols-2">
            <div className="relative aspect-[4/5] w-full bg-gray-100">
              <Image src={mainImage.url} alt={mainImage.alt || ""} fill className="object-cover" />
            </div>

            {hoverImage && (
              <div className="relative aspect-[4/5] w-full bg-gray-100">
                <Image
                  src={hoverImage.url}
                  alt={hoverImage.alt || ""}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {gallery.map((img) => (
              <div
                key={`${img.url}-${crypto.randomUUID()}`}
                className="relative aspect-[4/5] w-full bg-gray-100"
              >
                <Image src={img.url} alt={img.alt || ""} fill className="object-cover" />
              </div>
            ))}
          </div>

          <div className="md:hidden">
            <Carousel>
              <CarouselContent className="space-x-2">
                <CarouselItem key="main">
                  <div className="relative aspect-[4/5] w-full bg-gray-100">
                    <Image
                      src={mainImage.url}
                      alt={mainImage.alt || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>

                {hoverImage && (
                  <CarouselItem key="hover">
                    <div className="relative aspect-[4/5] w-full bg-gray-100">
                      <Image
                        src={hoverImage.url}
                        alt={hoverImage.alt || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                )}

                {gallery.map((img) => (
                  <CarouselItem key={`${img.url}-${crypto.randomUUID()}`}>
                    <div className="relative aspect-[4/5] w-full bg-gray-100">
                      <Image src={img.url} alt={img.alt || ""} fill className="object-cover" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2" />
              <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2" />
            </Carousel>
          </div>
        </div>

        <div className="relative font-sans">
          <div className="sticky top-20 flex flex-col">
            <div className="flex items-start justify-between space-x-5">
              <h1 className="mb-1 text-2xl font-medium">{product.title}</h1>
              <Button
                size="icon"
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault()
                  toggleFavorite(product.slug)
                }}
                className="mt-1"
              >
                {isFavorite ? (
                  <HeartFilledIcon className="size-5 text-red-500" />
                ) : (
                  <Heart className="size-4" strokeWidth={1} />
                )}
              </Button>
            </div>

            {product.price !== null && (
              <p className="font-mono text-sm">
                {hasDiscount ? (
                  <span className="flex items-center gap-2">
                    <span className="text-muted-foreground line-through">
                      {formatCurrency(product.price, locale)}
                    </span>
                    <span className="font-medium">{formatCurrency(discountedPrice!, locale)}</span>
                  </span>
                ) : (
                  <span className="font-medium">{formatCurrency(product.price, locale)}</span>
                )}
              </p>
            )}

            <div className="mt-6 flex flex-col gap-4">
              {sizes.length > 0 && (
                <div>
                  <h4 className="mb-2 font-sans text-sm font-medium">{tLabels("size")}</h4>
                  <SizeSelector
                    sizes={sizes}
                    selectedSize={selectedSize}
                    onChange={setSelectedSize}
                  />
                </div>
              )}

              <div className="mb-4">
                <h4 className="mb-2 font-sans text-sm font-medium">{tLabels("quantity")}</h4>
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
              </div>
            </div>

            <Button
              className="mt-2 w-full font-sans"
              disabled={!selectedSize}
              onClick={() => addItem(product, quantity, selectedSize)}
            >
              {!selectedSize ? tButtons("select size") : tButtons("add to cart")}
            </Button>

            <Accordion
              type="single"
              collapsible
              className="mt-8 w-full font-sans"
              defaultValue="item-1"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>{tAccordion("productInfo.title")}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>{tAccordion("productInfo.text")}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>{tAccordion("shipping.title")}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>{tAccordion("shipping.text1")}</p>
                  <p>{tAccordion("shipping.text2")}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>{tAccordion("returns.title")}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>{tAccordion("returns.text1")}</p>
                  <p>{tAccordion("returns.text2")}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
