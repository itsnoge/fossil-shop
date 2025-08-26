"use client"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type FavoritesStore = {
  favorites: string[]
  toggleFavorite: (slug: string) => void
  isFavorite: (slug: string) => boolean
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (slug) => {
        if (!slug) return
        const favorites = get().favorites
        set({
          favorites: favorites.includes(slug)
            ? favorites.filter((s) => s !== slug)
            : [...favorites, slug],
        })
      },
      isFavorite: (slug) => get().favorites.includes(slug),
    }),
    { name: "favorites-storage" },
  ),
)
