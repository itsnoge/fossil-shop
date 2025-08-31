import AccountForm from "@/components/account-form"
import AddressForm from "@/components/address-form"
import PaymentForm from "@/components/payment-form"
import CheckoutSummary from "@/components/checkout-summary"
import { getTranslations } from "next-intl/server"
import CheckoutDisplay from "@/components/checkout-display"

export default async function Checkout() {
  const tSection = await getTranslations("Sections")
  const tBrand = await getTranslations("Metadata.favorites")

  return (
    <div>
      <CheckoutDisplay />
    </div>
  )
}
