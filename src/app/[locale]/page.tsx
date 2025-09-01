"use client"

import { RollingText } from "@/components/ui/rolling-text"
import { navigations } from "@/constants"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Home() {
  const t = useTranslations("Navigation")

  const getBrusselsTime = () =>
    new Date().toLocaleTimeString("en-GB", {
      timeZone: "Europe/Brussels",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })

  const [time, setTime] = useState(getBrusselsTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getBrusselsTime())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 h-full w-full object-cover"
        src="/home.mp4"
        autoPlay
        loop
        muted
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Image
          src="/logo-full.svg"
          alt="Fossil"
          className="mb-12 h-auto w-20 invert"
          width={80}
          height={80}
        />

        <nav className="flex flex-col items-center justify-center space-y-3 font-sans">
          {navigations.map((nav) => (
            <Link
              key={nav.href}
              href={nav.href}
              className="group relative flex items-center text-sm text-white"
            >
              <span className="absolute -left-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                •
              </span>
              <RollingText text={t(nav.label)} direction="up" speed="slow" />
            </Link>
          ))}
        </nav>
      </div>

      <div className="up fixed bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 font-mono text-xs text-white">
        Brussels · {time}
      </div>
    </div>
  )
}
