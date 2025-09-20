"use client"
import { useFormatter, useNow } from "next-intl"

type Props = {
  locale: string
}

export default function TimeDisplay({ locale }: Props) {
  const now = useNow({ updateInterval: 1000 })
  const format = useFormatter()

  const city = "Brussels"

  const formattedTime = format.dateTime(now, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: locale === "en",
    timeZone: "Europe/Brussels",
  })

  return (
    <div className="up fixed bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 font-mono text-xs text-white">
      {city} · {formattedTime}
    </div>
  )
}
