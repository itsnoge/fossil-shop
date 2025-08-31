"use client"

import AccountForm from "@/components/account-form"
import AddressForm from "@/components/address-form"
import PaymentForm from "@/components/payment-form"
import CheckoutSummary from "@/components/checkout-summary"
import { useCartStore } from "@/store/cart-store"
import { useTranslations } from "next-intl"

export default function CheckoutDisplay() {
  const tCheckout = useTranslations("Metadata.checkout")

  const tLabels = useTranslations("Labels")
  const items = useCartStore((state) => state.items)

  const subtotal = items.reduce((acc, item) => {
    const hasDiscount = item.discount?.active && item.discount.percentage
    const unitPrice = hasDiscount
      ? (item.price ?? 0) * (1 - (item.discount?.percentage ?? 0) / 100)
      : (item.price ?? 0)
    return acc + unitPrice * item.quantity
  }, 0)

  const SHIPPING_THRESHOLD = 200
  const SHIPPING_COST = 5.9
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="font-sans lg:container lg:mx-auto">
        <div className="mb-20">
          <h1 className="font-figtree mb-10 text-4xl font-semibold md:text-7xl">
            {tCheckout("title")}
          </h1>
          <p className="max-w-md font-sans font-medium">
            {tLabels("add some items before checkout")}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="font-sans lg:container lg:mx-auto">
      <div className="mb-20">
        <h1 className="font-figtree mb-10 text-4xl font-semibold md:text-7xl">
          {tCheckout("title")}
        </h1>
        <p className="max-w-md font-sans font-medium">{tCheckout("description")}</p>
      </div>

      <div className="grid min-h-screen grid-cols-1 gap-10 md:grid-cols-5">
        <div className="col-span-3 flex-1 space-y-10 rounded-md">
          <AccountForm step={1} />
          <AddressForm step={2} />
          <PaymentForm step={3} />
        </div>

        <div className="relative col-span-2">
          <CheckoutSummary items={items} subtotal={subtotal} shipping={shipping} total={total} />
        </div>
      </div>
    </div>
  )
}
