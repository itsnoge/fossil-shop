"use client"

import { Link } from "@/i18n/navigation"
import { RollingText } from "@/components/ui/rolling-text"
interface NavLinkProps {
  href: string
  label: string
  isActive?: boolean
  dotPosition?: "left" | "right" | "none"
  className?: string
  direction?: "up" | "down"
  speed?: "slow" | "normal" | "fast"
  external?: boolean
}

export function NavLink({
  href,
  label,
  isActive = false,
  dotPosition = "left",
  className = "",
  direction = "up",
  speed = "slow",
  external = false,
}: NavLinkProps) {
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {}

  return (
    <Link
      href={href}
      {...linkProps}
      className={`group flex w-fit items-center font-sans ${className} relative`}
    >
      {dotPosition === "left" && (
        <span
          className={`absolute -left-3 transition-opacity duration-500 ${
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          •
        </span>
      )}

      <RollingText text={label} direction={direction} speed={speed} />

      {dotPosition === "right" && (
        <span
          className={`absolute -right-4 transition-opacity duration-500 ${
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          •
        </span>
      )}
    </Link>
  )
}
