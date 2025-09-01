"use client"

import CartItem from "@/components/cart-item"
import CartSummary from "@/components/cart-summary"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface CheckoutSummaryProps {
  items: Array<any>
  subtotal: number
  shipping: number
  total: number
  onPlaceOrder: () => void
  loading: boolean
}

export default function CheckoutSummary({
  items,
  subtotal,
  shipping,
  total,
  onPlaceOrder,
  loading,
}: CheckoutSummaryProps) {
  const tLabels = useTranslations("Labels")
  const tButtons = useTranslations("Buttons")
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="sticky top-20 w-full space-y-5">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-medium">{tLabels("order summary")}</h2>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon">
              <ChevronsUpDown />
            </Button>
          </CollapsibleTrigger>
        </div>

        {items.length > 0 && <CartItem item={items[0]} />}
        <CollapsibleContent className="mt-2 flex flex-col gap-2">
          {items.slice(1).map((item) => (
            <CartItem key={`${item._id}-${item.selectedSize ?? "default"}`} item={item} />
          ))}
        </CollapsibleContent>
      </Collapsible>

      <CartSummary subtotal={subtotal} shipping={shipping} total={total} tLabels={tLabels} />

      <Button
        type="button"
        className="flex w-full items-center justify-center gap-2"
        onClick={onPlaceOrder}
        disabled={loading || items.length === 0}
      >
        {loading ? tButtons("processing order") : tButtons("place order")}
      </Button>
    </div>
  )
}
