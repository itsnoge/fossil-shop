import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name?: string) {
  if (!name) return ""
  return name
    .split(" ")
    .filter((word) => word.length)
    .map((word) => word[0].toUpperCase())
    .join("")
}
