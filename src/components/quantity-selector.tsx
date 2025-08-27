"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash } from "lucide-react"

type QuantitySelectorProps = {
  quantity: number
  onChange: (quantity: number) => void
  onRemove?: () => void
  inCart?: boolean
}

export default function QuantitySelector({
  quantity,
  onChange,
  onRemove,
  inCart = false,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (inCart && quantity === 1 && onRemove) {
      onRemove()
    } else {
      onChange(Math.max(1, quantity - 1))
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" className="size-7" onClick={handleDecrement}>
        {inCart && quantity === 1 ? (
          <Trash className="size-3 text-red-700" />
        ) : (
          <Minus className="size-3" />
        )}
      </Button>

      <span className="w-6 text-center font-mono text-xs font-medium">{quantity}</span>

      <Button
        variant="outline"
        size="icon"
        className="size-7"
        onClick={() => onChange(quantity + 1)}
      >
        <Plus className="size-3" />
      </Button>
    </div>
  )
}
