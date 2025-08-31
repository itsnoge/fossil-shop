"use client"

import CartItem from "@/components/cart-item"
import CartSummary from "@/components/cart-summary"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Link } from "@/i18n/navigation"
import { useCartStore } from "@/store/cart-store"
import { ShoppingBag, X } from "lucide-react"
import { useTranslations } from "next-intl"

export default function Cart() {
  const tLabels = useTranslations("Labels")
  const tButtons = useTranslations("Buttons")

  const totalCartItems = useCartStore((state) => state.totalDistinctItems())
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

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
      <SheetContent className="flex h-full w-full flex-col overflow-hidden font-sans sm:w-[500px]">
        <SheetHeader className="p-0">
          <SheetTitle className="flex items-center justify-between border-b p-4">
            {totalCartItems === 0 ? (
              <p className="font-sans text-sm font-medium">{tLabels("cart empty")}</p>
            ) : (
              <p className="font-sans text-sm font-medium">
                <span className="font-mono">{totalCartItems}</span> {tLabels("cart items")}
              </p>
            )}

            <SheetClose asChild>
              <Button size="icon" variant="ghost">
                <X className="size-4" />
              </Button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <SheetDescription className="hidden"></SheetDescription>

        {totalCartItems === 0 ? null : (
          <>
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="space-y-2 px-4">
                  {items.map((item) => (
                    <CartItem key={`${item._id}-${item.selectedSize ?? "default"}`} item={item} />
                  ))}
                </div>
              </ScrollArea>
            </div>

            <SheetFooter className="border-t p-4">
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                tLabels={tLabels}
              />
              <div className="mt-2">
                <SheetClose asChild>
                  <Link href="/checkout">
                    <Button className="mb-2 w-full">{tButtons("check out")}</Button>
                  </Link>
                </SheetClose>
                <Button variant="secondary" className="w-full" onClick={clearCart}>
                  {tButtons("clear cart")}
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
