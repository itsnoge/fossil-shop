"use client"

import Image from "next/image"
import { useCartStore, CartItem as CartItemType } from "@/store/cart-store"
import { formatCurrency } from "@/lib/utils"
import { useLocale } from "next-intl"
import QuantitySelector from "@/components/quantity-selector"

type CartItemProps = {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { _id, title, price, mainImage, selectedSize, quantity, discount } = item
  const locale = useLocale()
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  const hasDiscount = discount?.active && discount?.percentage
  const unitPrice = hasDiscount ? (price ?? 0) * (1 - discount!.percentage / 100) : (price ?? 0)

  const subtotal = unitPrice * quantity

  return (
    <div className="flex w-full">
      <div className="relative mr-2 h-32 w-24 flex-shrink-0">
        <Image
          src={mainImage?.url || "/placeholder.png"}
          alt={mainImage?.alt || title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <p className="mr-2 font-sans text-sm font-medium">{title}</p>
              {selectedSize && (
                <p className="text-muted-foreground text-xs">
                  Size: <span className="uppercase">{selectedSize}</span>
                </p>
              )}
            </div>

            {hasDiscount ? (
              <div className="flex flex-col items-end font-mono text-xs">
                <span className="text-muted-foreground line-through">
                  {formatCurrency((price ?? 0) * quantity, locale)}
                </span>
                <span className="font-medium">{formatCurrency(subtotal, locale)}</span>
              </div>
            ) : (
              <span className="mt-0.5 ml-4 font-mono text-xs font-medium">
                {formatCurrency(subtotal, locale)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <QuantitySelector
            quantity={quantity}
            inCart
            onChange={(q) => updateQuantity(_id, q, selectedSize)}
            onRemove={() => removeItem(_id, selectedSize)}
          />
        </div>
      </div>
    </div>
  )
}
