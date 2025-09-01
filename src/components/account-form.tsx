"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl"
import { useFormContext } from "react-hook-form"

export default function AccountForm({ step }: { step: number }) {
  const tLabels = useTranslations("Labels")
  const { register } = useFormContext()
  return (
    <div className="space-y-6 rounded-md bg-gray-50 p-5">
      <h2 className="text-xl font-medium">{`${step}. ${tLabels("account details")}`}</h2>

      <div className="space-y-2">
        <Label htmlFor="account.fullName">{tLabels("full name")}</Label>
        <Input
          id="account.fullName"
          placeholder="John Doe"
          {...register("account.fullName", { required: true })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="account.email">{tLabels("email")}</Label>
        <Input
          id="account.email"
          type="email"
          placeholder="john@example.com"
          {...register("account.email", { required: true })}
        />
      </div>
    </div>
  )
}
