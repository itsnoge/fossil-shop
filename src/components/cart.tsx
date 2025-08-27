"use client"
import CartItem from "@/components/cart-item"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { formatCurrency } from "@/lib/utils"
import { useCartStore } from "@/store/cart-store"
import { ShoppingBag, X } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

export default function Cart() {
  const locale = useLocale()
  const tLabels = useTranslations("Labels")
  const tButtons = useTranslations("Buttons")

  const totalCartItems = useCartStore((state) => state.totalDistinctItems())
  const items = useCartStore((state) => state.items)

  const subtotal = items.reduce((acc, item) => {
    const hasDiscount = item.discount?.active && item.discount.percentage
    const unitPrice = hasDiscount
      ? (item.price ?? 0) * (1 - item.discount!.percentage / 100)
      : (item.price ?? 0)
    return acc + unitPrice * item.quantity
  }, 0)

  const SHIPPING_THRESHOLD = 200
  const SHIPPING_COST = 5.9
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST

  const total = subtotal + shipping

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="ghost">
          <ShoppingBag className="size-4" />
          <span className="font-mono">({totalCartItems})</span>
        </Button>
      </SheetTrigger>

      <SheetContent className="font-sans">
        <SheetHeader className="p-0">
          <SheetTitle className="flex items-center justify-between border-b p-4">
            <p className="font-sans text-sm font-medium">
              <span className="font-mono">{totalCartItems}</span> {tLabels("cart items")}
            </p>
            <SheetClose asChild>
              <Button size="icon" variant="ghost">
                <X className="size-4" />
              </Button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-76 px-4">
          {items.map((item) => (
            <div key={`${item._id}-${item.selectedSize ?? "default"}`} className="mb-5">
              <CartItem item={item} />
            </div>
          ))}
        </ScrollArea>

        <SheetFooter className="gap-y-2 border-t">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-medium">{tLabels("subtotal")}</div>
            <div className="font-mono text-xs font-medium">{formatCurrency(subtotal, locale)}</div>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-medium">{tLabels("shipping")}</div>
            <div className="font-sans text-xs">
              {shipping === 0 ? (
                <span className="font-sans text-xs font-medium">{tLabels("free")}</span>
              ) : (
                <span className="font-mono">{formatCurrency(shipping, locale)}</span>
              )}
            </div>
          </div>

          <div className="mb-2 flex items-center justify-between font-medium">
            <div className="text-sm font-medium">{tLabels("total")}</div>
            <div className="font-mono text-sm">{formatCurrency(total, locale)}</div>
          </div>

          <Button className="w-full">{tButtons("check out")}</Button>
          <Button variant="secondary" className="w-full">
            {tButtons("clear cart")}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
