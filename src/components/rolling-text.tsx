"use client"

import { cn } from "@/app/lib/utils"

interface RollingTextProps {
  text: string
  className?: string
  variant?: "slide" | "rotate" | "scale"
  direction?: "up" | "down" | "left" | "right"
  speed?: "fast" | "normal" | "slow"
}

export function RollingText({
  text,
  className,
  variant = "slide",
  direction = "down",
  speed = "normal",
}: RollingTextProps) {
  const speedClasses = {
    fast: "duration-200",
    normal: "duration-300",
    slow: "duration-500",
  }

  if (variant === "scale") {
    return (
      <div className={cn("relative inline-block cursor-pointer overflow-hidden", className)}>
        <div className="group relative">
          <span
            className={cn(
              "block transform-gpu transition-all ease-out",
              speedClasses[speed],
              "group-hover:scale-0 group-hover:rotate-180 group-hover:opacity-0",
            )}
          >
            {text}
          </span>
          <span
            className={cn(
              "absolute inset-0 transform-gpu transition-all ease-out",
              speedClasses[speed],
              "scale-0 rotate-180 opacity-0",
              "group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100",
            )}
          >
            {text}
          </span>
        </div>
      </div>
    )
  }

  if (variant === "rotate") {
    return (
      <div className={cn("relative inline-block cursor-pointer overflow-hidden", className)}>
        <div className="group relative">
          <span
            className={cn(
              "block transform-gpu transition-transform ease-out",
              speedClasses[speed],
              "group-hover:rotate-y-90",
            )}
            style={{ transformStyle: "preserve-3d" }}
          >
            {text}
          </span>
          <span
            className={cn(
              "absolute inset-0 transform-gpu transition-transform ease-out",
              speedClasses[speed],
              "rotate-y-90",
              "group-hover:rotate-y-0",
            )}
            style={{ transformStyle: "preserve-3d" }}
          >
            {text}
          </span>
        </div>
      </div>
    )
  }

  // Original slide variant
  const directionClasses = {
    up: "-translate-y-full",
    down: "translate-y-full",
    left: "-translate-x-full",
    right: "translate-x-full",
  }

  const initialPosition = {
    up: "translate-y-full",
    down: "-translate-y-full",
    left: "translate-x-full",
    right: "-translate-x-full",
  }

  return (
    <div className={cn("relative inline-block cursor-pointer overflow-hidden", className)}>
      <div className="group relative">
        <span
          className={cn(
            "block transition-transform ease-out",
            speedClasses[speed],
            "group-hover:" + directionClasses[direction],
          )}
        >
          {text}
        </span>
        <span
          className={cn(
            "absolute inset-0 transition-transform ease-out",
            speedClasses[speed],
            initialPosition[direction],
            "group-hover:translate-x-0 group-hover:translate-y-0",
          )}
        >
          {text}
        </span>
      </div>
    </div>
  )
}
