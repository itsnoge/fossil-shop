"use client"

import { cn } from "@/app/lib/utils"

interface RollingTextProps {
  text: string
  className?: string
  variant?: "slide"
  direction?: "up" | "down" | "left" | "right"
  speed?: "fast" | "normal" | "slow"
}

export function RollingText({
  text,
  className,
  direction = "up",
  speed = "normal",
}: RollingTextProps) {
  const speedClasses = {
    fast: "duration-200",
    normal: "duration-300",
    slow: "duration-500",
  }

  return (
    <div className={cn("relative inline-block cursor-pointer overflow-hidden", className)}>
      <div className="group relative">
        <span
          className={cn(
            "block transform transition-transform ease-out",
            speedClasses[speed],
            direction === "up" && "group-hover:-translate-y-full",
            direction === "down" && "group-hover:translate-y-full",
            direction === "left" && "group-hover:-translate-x-full",
            direction === "right" && "group-hover:translate-x-full",
          )}
        >
          {text}
        </span>
        <span
          className={cn(
            "absolute inset-0 block transform transition-transform ease-out",
            speedClasses[speed],
            direction === "up" && "translate-y-full group-hover:translate-y-0",
            direction === "down" && "-translate-y-full group-hover:translate-y-0",
            direction === "left" && "translate-x-full group-hover:translate-x-0",
            direction === "right" && "-translate-x-full group-hover:translate-x-0",
          )}
        >
          {text}
        </span>
      </div>
    </div>
  )
}
