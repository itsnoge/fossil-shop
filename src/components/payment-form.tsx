"use client"

import { useEffect, useId, useState } from "react"
import { usePaymentInputs } from "react-payment-inputs"
import images, { type CardImages } from "react-payment-inputs/images"

import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"
import { Label } from "@/components/ui/label"
import { CheckCircle, CreditCardIcon, Loader2 } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"

export default function PaymentForm({ step }: { step: number }) {
  const tLabels = useTranslations("Labels")
  const [selectedPayment, setSelectedPayment] = useState("1")
  const [status, setStatus] = useState<"idle" | "loading" | "connected">("idle")

  const id = useId()
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps, getCardImageProps } =
    usePaymentInputs()

  const items = [
    { value: "1", label: "Credit/Debit Card" },
    { value: "2", label: "PayPal" },
    { value: "3", label: "Apple Pay" },
  ]

  useEffect(() => {
    if (selectedPayment === "1") {
      setStatus("idle")
      return
    }
    setStatus("loading")
    const timer = setTimeout(() => setStatus("connected"), 1500)
    return () => clearTimeout(timer)
  }, [selectedPayment])

  const renderPaymentStatus = (logo: string, label: string) => (
    <div className="flex items-center gap-4 rounded-md bg-gray-100 p-4">
      <div className="relative h-8 w-20 flex-shrink-0">
        <Image src={logo} alt={label} fill className="object-contain" />
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-gray-800">{label}</span>
        <div className="flex items-center gap-1 text-sm text-green-600">
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{tLabels("payment connecting")}</span>
            </>
          ) : status === "connected" ? (
            <>
              <CheckCircle size={16} />
              <span>{tLabels("payment ready")}</span>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6 rounded-md bg-gray-50 p-5">
      <h2 className="text-xl font-medium">{`${step}. ${tLabels("payment details")}`}</h2>
      <div>
        <fieldset className="space-y-4">
          <legend className="text-foreground text-sm leading-none font-medium">
            {tLabels("card type")}
          </legend>
          <RadioGroup
            value={selectedPayment}
            onValueChange={setSelectedPayment}
            className="flex flex-wrap gap-2"
          >
            {items.map((item) => (
              <div
                key={`${id}-${item.value}`}
                className="border-input has-data-[state=checked]:border-primary/50 relative flex flex-col items-start gap-4 rounded-md border p-3 shadow-xs outline-none"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    id={`${id}-${item.value}`}
                    value={item.value}
                    className="after:absolute after:inset-0"
                  />
                  <Label htmlFor={`${id}-${item.value}`}>{item.label}</Label>
                </div>
              </div>
            ))}
          </RadioGroup>
        </fieldset>
      </div>
      {selectedPayment === "1" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="cardNumber">{tLabels("card number")}</Label>
            <div className="relative">
              <Input
                {...getCardNumberProps()}
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                required
              />
              <div className="pointer-events-none absolute top-1/2 right-3 flex -translate-y-1/2 items-center">
                {meta.cardType ? (
                  <svg
                    className="h-5 w-5"
                    {...getCardImageProps({ images: images as unknown as CardImages })}
                  />
                ) : (
                  <CreditCardIcon className="text-muted-foreground h-5 w-5" aria-hidden="true" />
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="expiry">{tLabels("expiration date")}</Label>
              <Input
                {...getExpiryDateProps()}
                id="expiry"
                name="expiry"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">{tLabels("cvv")}</Label>
              <Input
                {...getCVCProps()}
                id="cvv"
                name="cvv"
                type="text"
                placeholder="123"
                required
              />
            </div>
          </div>
        </>
      )}

      {selectedPayment === "2" && renderPaymentStatus("/paypal-logo.webp", "PayPal")}
      {selectedPayment === "3" && renderPaymentStatus("/applepay-logo.png", "Apple Pay")}
    </div>
  )
}
