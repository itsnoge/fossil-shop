import { formatCurrency } from "@/lib/utils"
import { useLocale } from "next-intl"

type CartSummaryProps = {
  subtotal: number
  shipping: number
  total: number
  tLabels: any
}

export default function CartSummary({ subtotal, shipping, total, tLabels }: CartSummaryProps) {
  const locale = useLocale()
  const shippingFree = formatCurrency(0, locale)
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-medium">
        <div className="uppercase">{tLabels("subtotal")}</div>
        <div className="font-mono">{formatCurrency(subtotal, locale)}</div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs font-medium uppercase">{tLabels("shipping")}</div>
        <div className="font-mono text-xs font-medium">
          {shipping === 0 ? (
            <span>{shippingFree}</span>
          ) : (
            <span>{formatCurrency(shipping, locale)}</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-medium uppercase">
        <div>{tLabels("total")}</div>
        <div className="font-mono">{formatCurrency(total, locale)}</div>
      </div>
    </div>
  )
}
