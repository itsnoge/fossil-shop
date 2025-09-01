"use client"

import { useEffect, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { useCartStore } from "@/store/cart-store"
import { useLocale, useTranslations } from "next-intl"

import AccountForm from "@/components/account-form"
import AddressForm from "@/components/address-form"
import PaymentForm from "@/components/payment-form"
import CheckoutSummary from "@/components/checkout-summary"
import { SHIPPING_COST, SHIPPING_THRESHOLD } from "@/constants"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export type OrderItem = {
  name: string
  quantity: number
  price: number
  discount?: {
    active: boolean
    percentage: number
  }
}

export type CustomerInfo = {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  postalCode: string
  country: string
}

export function generateInvoice(
  items: OrderItem[],
  customer: CustomerInfo,
  orderDate: string,
  t: (key: string) => string,
  locale: string,
) {
  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text(t("invoiceTitle"), 105, 20)

  doc.setFontSize(12)
  doc.text(t("customerInformation"), 14, 40)
  doc.text(`${customer.firstName} ${customer.lastName}`, 14, 48)
  doc.text(customer.address, 14, 54)
  doc.text(`${customer.postalCode} ${customer.city}, ${customer.country}`, 14, 60)
  doc.text(`${t("email")}: ${customer.email}`, 14, 66)
  doc.text(`${t("orderDate")}: ${orderDate}`, 14, 80)

  let subtotal = 0
  const tableData = items.map((item) => {
    const hasDiscount = item.discount?.active && item.discount.percentage
    const unitPrice = item.price
    const discountedTotal = hasDiscount
      ? unitPrice * item.quantity * (1 - (item.discount?.percentage ?? 0) / 100)
      : unitPrice * item.quantity

    subtotal += discountedTotal

    return [
      item.name,
      item.quantity.toString(),
      formatCurrency(unitPrice, locale),
      hasDiscount
        ? `${formatCurrency(discountedTotal, locale)} (${t("discount")} -${item.discount?.percentage}%)`
        : formatCurrency(discountedTotal, locale),
    ]
  })

  autoTable(doc, {
    head: [[t("item"), t("quantity"), t("unitPrice"), t("subtotalItem")]],
    body: tableData,
    startY: 90,
  })

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const finalY = (doc as any).lastAutoTable?.finalY || 120
  doc.setFontSize(12)
  doc.text(
    `${t("shipping")}: ${shipping === 0 ? t("free") : formatCurrency(shipping, locale)}`,
    14,
    finalY + 10,
  )

  doc.setFontSize(14)
  doc.text(`${t("total")}: ${formatCurrency(subtotal + shipping, locale)}`, 190, finalY + 20, {
    align: "right",
  })

  doc.save(`invoice-${Date.now()}.pdf`)
}

export default function CheckoutDisplay() {
  const locale = useLocale()
  const tCheckout = useTranslations("Metadata.checkout")
  const tLabels = useTranslations("Labels")
  const tMessages = useTranslations("Messages")

  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  const subtotal = items.reduce((acc, item) => {
    const hasDiscount = item.discount?.active && item.discount.percentage
    const unitPrice = item.price ?? 0
    const discountedPrice = hasDiscount
      ? unitPrice * (1 - (item.discount?.percentage ?? 0) / 100)
      : unitPrice
    return acc + discountedPrice * item.quantity
  }, 0)

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  const methods = useForm({
    defaultValues: {
      account: { fullName: "", email: "" },
      address: { address: "", city: "", zip: "", country: "" },
      payment: { type: "1", cardNumber: "", expiry: "", cvv: "" },
    },
  })

  const onSubmit = () => {
    setLoading(true)
    const newOrderId = `ORD-${Date.now()}`

    const currentItems: OrderItem[] = items.map((i) => ({
      name: i.selectedSize ? `${i.title} (${i.selectedSize})` : i.title,
      quantity: i.quantity,
      price: i.price ?? 0,
      discount: i.discount
        ? { active: i.discount.active, percentage: i.discount.percentage }
        : undefined,
    }))
    setOrderItems(currentItems)

    setTimeout(() => {
      clearCart()
      setOrderId(newOrderId)
      setLoading(false)
    }, 2500)
  }

  useEffect(() => {
    if (orderId) window.scrollTo({ top: 0, behavior: "smooth" })
  }, [orderId])

  if (items.length === 0 && !orderId) {
    return (
      <div className="p-10 text-center font-sans">
        <h1 className="mb-4 text-4xl font-semibold">{tCheckout("title")}</h1>
        <p>{tLabels("add some items before checkout")}</p>
      </div>
    )
  }

  if (orderId) {
    const fullName = methods.getValues("account.fullName") || ""
    const nameParts = fullName.split(" ")
    const customer: CustomerInfo = {
      firstName: nameParts[0] ?? "",
      lastName: nameParts[1] ?? "",
      email: methods.getValues("account.email"),
      address: methods.getValues("address.address"),
      city: methods.getValues("address.city"),
      postalCode: methods.getValues("address.zip"),
      country: methods.getValues("address.country"),
    }

    return (
      <div className="p-10 text-center font-sans">
        <h2 className="mb-4 text-2xl font-bold">{tLabels("thank you for your order")}</h2>
        <p>{tMessages("order placed")}</p>
        <p>
          {tLabels("order number")}: <strong className="font-mono">{orderId}</strong>
        </p>

        <div className="mt-4">
          <Button
            onClick={() =>
              generateInvoice(
                orderItems,
                customer,
                new Date().toLocaleDateString(),
                tLabels,
                locale,
              )
            }
          >
            {loading ? "Processing order..." : "Download Invoice PDF"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-10 font-sans lg:container lg:mx-auto">
      <h1 className="mb-4 text-4xl font-semibold">{tCheckout("title")}</h1>
      <p className="mb-10">{tCheckout("description")}</p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
            <div className="col-span-3 space-y-10">
              <AccountForm step={1} />
              <AddressForm step={2} />
              <PaymentForm step={3} />
            </div>

            <div className="col-span-2">
              <CheckoutSummary
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                onPlaceOrder={methods.handleSubmit(onSubmit)}
                loading={loading}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
