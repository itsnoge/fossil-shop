import { useTranslations, useLocale } from "next-intl"
import { formatCurrency } from "@/lib/utils"

export default function DeliveryBanner() {
  const t = useTranslations("Messages")
  const locale = useLocale()
  const amount = 200

  return (
    <div className="sticky top-0 z-50 w-full bg-black px-4 py-2 font-sans text-white">
      <div className="mx-auto flex items-center justify-center gap-2 text-xs font-medium">
        {t("free shipping", { amount: formatCurrency(amount, locale) })}
      </div>
    </div>
  )
}
