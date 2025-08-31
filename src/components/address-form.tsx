"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl"

export default function AddressForm({ step }: { step: number }) {
  const tLabels = useTranslations("Labels")

  return (
    <form className="space-y-6 rounded-md bg-gray-50 p-5">
      <h2 className="text-xl font-medium">{`${step}. ${tLabels("delivery address")}`}</h2>
      <div className="space-y-2">
        <Label htmlFor="address">{tLabels("address")}</Label>
        <Input id="address" name="address" placeholder="123 Main St" required />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="city">{tLabels("city")}</Label>
          <Input id="city" name="city" placeholder="Paris" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip">{tLabels("zip code")}</Label>
          <Input id="zip" name="zip" type="text" placeholder="75000" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="country">{tLabels("country")}</Label>
        <Input id="country" name="country" placeholder="France" required />
      </div>
    </form>
  )
}
