"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const isDark = theme === "dark"

  return (
    <div className="flex items-center space-x-2">
      <span className="mr-2 text-sm font-medium">Theme: {isDark ? "Dark" : "Light"}</span>
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    </div>
  )
}
