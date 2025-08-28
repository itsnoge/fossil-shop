"use client"

import { Button } from "@/components/ui/button"

type SizeSelectorProps = {
  sizes: { size: string }[]
  selectedSize?: string
  onChange: (size: string) => void
}

export default function SizeSelector({ sizes, selectedSize, onChange }: SizeSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => (
          <Button
            key={s.size}
            variant={selectedSize === s.size ? "default" : "outline"}
            size="sm"
            className="size-7 font-sans text-xs uppercase"
            onClick={() => onChange(s.size)}
          >
            {s.size}
          </Button>
        ))}
      </div>
    </div>
  )
}
