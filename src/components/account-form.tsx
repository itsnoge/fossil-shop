"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl"

export default function AccountForm({ step }: { step: number }) {
  const tLabels = useTranslations("Labels")
  return (
    <form className="space-y-6 rounded-md bg-gray-50 p-5">
      <h2 className="text-xl font-medium">{`${step}. ${tLabels("account details")}`}</h2>
      <div className="space-y-2">
        <Label htmlFor="fullName">{tLabels("full name")}</Label>
        <Input id="fullName" name="fullName" placeholder="John Doe" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{tLabels("email")}</Label>
        <Input id="email" name="email" type="email" placeholder="john@example.com" required />
      </div>
    </form>
  )
}
