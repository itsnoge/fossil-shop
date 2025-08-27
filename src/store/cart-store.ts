import { GET_PRODUCTS_RESULT } from "@/sanity/lib/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type CartItem = Omit<GET_PRODUCTS_RESULT, "publishedAt" | "hoverImage"> & {
  quantity: number
  selectedSize?: string
}

export type AddItemPayload = Omit<CartItem, "quantity" | "selectedSize">

export type CartState = {
  items: CartItem[]
  addItem: (product: AddItemPayload, quantity?: number, size?: string) => void
  removeItem: (productId: string, size?: string) => void
  updateQuantity: (productId: string, quantity: number, size?: string) => void
  clearCart: () => void
  total: () => number
  totalDistinctItems: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1, size) => {
        const items = get().items
        const existingIndex = items.findIndex(
          (item) => item._id === product._id && item.selectedSize === size,
        )

        if (existingIndex > -1) {
          const updatedItems = [...items]
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            quantity: updatedItems[existingIndex].quantity + quantity,
          }
          set({ items: updatedItems })
        } else {
          set({ items: [...items, { ...product, quantity, selectedSize: size }] })
        }
      },

      removeItem: (productId, size) => {
        set({
          items: get().items.filter(
            (item) => !(item._id === productId && item.selectedSize === size),
          ),
        })
      },

      updateQuantity: (productId, quantity, size) => {
        if (quantity <= 0) {
          get().removeItem(productId, size)
          return
        }

        set({
          items: get().items.map((item) =>
            item._id === productId && item.selectedSize === size ? { ...item, quantity } : item,
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce((acc, item) => {
          const hasDiscount = item.discount?.active && item.discount?.percentage
          const unitPrice = hasDiscount
            ? (item.price ?? 0) * (1 - item.discount!.percentage / 100)
            : (item.price ?? 0)
          return acc + unitPrice * item.quantity
        }, 0),

      totalDistinctItems: () => get().items.length,
    }),
    {
      name: "cart-storage",
    },
  ),
)
