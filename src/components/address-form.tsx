"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl"
import { useFormContext } from "react-hook-form"

export default function AddressForm({ step }: { step: number }) {
  const tLabels = useTranslations("Labels")
  const { register } = useFormContext()
  return (
    <div className="space-y-6 rounded-md bg-gray-50 p-5">
      <h2 className="text-xl font-medium">{`${step}. ${tLabels("delivery address")}`}</h2>

      <div className="space-y-2">
        <Label htmlFor="address.address">{tLabels("address")}</Label>
        <Input
          id="address.address"
          placeholder="123 Main St"
          {...register("address.address", { required: true })}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="address.city">{tLabels("city")}</Label>
          <Input
            id="address.city"
            placeholder="Paris"
            {...register("address.city", { required: true })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address.zip">{tLabels("zip code")}</Label>
          <Input
            id="address.zip"
            placeholder="75000"
            {...register("address.zip", { required: true })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address.country">{tLabels("country")}</Label>
        <Input
          id="address.country"
          placeholder="France"
          {...register("address.country", { required: true })}
        />
      </div>
    </div>
  )
}
