import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItemType = 'product' | 'full-set' | 'custom-set'

export interface CustomSetItem {
  productId: string
  quantity: number
}

export interface CustomSet {
  id: string
  name: string
  items: CustomSetItem[]
  createdAt: string
}

export interface CartItem {
  id: string
  type: CartItemType
  productId?: string
  setId?: string
  customSet?: CustomSet
  quantity: number
}

interface StoreState {
  cart: CartItem[]
  wishlist: string[]
  customSet: CustomSetItem[]
  savedSets: CustomSet[]
  recentlyViewed: string[]
  searchHistory: string[]
  toast: string
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>, quantity?: number) => void
  removeFromCart: (id: string) => void
  updateCartQuantity: (id: string, quantity: number) => void
  toggleWishlist: (productId: string) => void
  addToCustomSet: (productId: string) => void
  addManyToCustomSet: (productIds: string[]) => void
  updateCustomSetQuantity: (productId: string, quantity: number) => void
  removeFromCustomSet: (productId: string) => void
  saveCustomSet: (name: string) => void
  clearCustomSet: () => void
  addRecentlyViewed: (productId: string) => void
  addSearch: (term: string) => void
  clearToast: () => void
}

const key = () => Math.random().toString(36).slice(2)

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      customSet: [],
      savedSets: [],
      recentlyViewed: [],
      searchHistory: [],
      toast: '',
      addToCart: (item, quantity = 1) =>
        set((state) => ({
          cart: [...state.cart, { ...item, id: key(), quantity }],
          toast: 'تمت إضافة المنتج إلى السلة.',
        })),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
          toast: 'تمت إزالة القطعة.',
        })),
      updateCartQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
          ),
        })),
      toggleWishlist: (productId) =>
        set((state) => {
          const exists = state.wishlist.includes(productId)
          return {
            wishlist: exists
              ? state.wishlist.filter((id) => id !== productId)
              : [...state.wishlist, productId],
            toast: exists ? 'تمت إزالة القطعة من المفضلة.' : 'تمت إضافة المنتج إلى المفضلة.',
          }
        }),
      addToCustomSet: (productId) =>
        set((state) => {
          if (state.customSet.some((item) => item.productId === productId)) {
            return { toast: 'هذه القطعة موجودة بالفعل.' }
          }
          return {
            customSet: [...state.customSet, { productId, quantity: 1 }],
            toast: 'تمت إضافة القطعة إلى طقمك.',
          }
        }),
      addManyToCustomSet: (productIds) =>
        set((state) => {
          const nextIds = productIds.filter(
            (productId) => !state.customSet.some((item) => item.productId === productId),
          )
          if (!nextIds.length) return { toast: 'هذه القطع موجودة بالفعل.' }
          return {
            customSet: [
              ...state.customSet,
              ...nextIds.map((productId) => ({ productId, quantity: 1 })),
            ],
            toast: 'تمت إضافة القطع إلى طقمك بنجاح.',
          }
        }),
      updateCustomSetQuantity: (productId, quantity) =>
        set((state) => ({
          customSet: state.customSet.map((item) =>
            item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
          ),
        })),
      removeFromCustomSet: (productId) =>
        set((state) => ({
          customSet: state.customSet.filter((item) => item.productId !== productId),
          toast: 'تمت إزالة القطعة.',
        })),
      saveCustomSet: (name) =>
        set((state) => {
          if (!state.customSet.length) return { toast: 'يرجى اختيار قطعة واحدة على الأقل.' }
          const savedSet: CustomSet = {
            id: key(),
            name,
            items: state.customSet,
            createdAt: new Date().toISOString(),
          }
          return {
            savedSets: [savedSet, ...state.savedSets],
            cart: [
              ...state.cart,
              { id: key(), type: 'custom-set', customSet: savedSet, quantity: 1 },
            ],
            customSet: [],
            toast: 'تم حفظ الطقم بنجاح.',
          }
        }),
      clearCustomSet: () => set({ customSet: [], toast: 'تم تفريغ الطقم.' }),
      addRecentlyViewed: (productId) =>
        set((state) => ({
          recentlyViewed: [productId, ...state.recentlyViewed.filter((id) => id !== productId)].slice(
            0,
            8,
          ),
        })),
      addSearch: (term) => {
        const clean = term.trim()
        if (!clean) return
        set((state) => ({
          searchHistory: [clean, ...state.searchHistory.filter((entry) => entry !== clean)].slice(
            0,
            6,
          ),
        }))
      },
      clearToast: () => set({ toast: '' }),
    }),
    {
      name: 'alsayegh-store-demo',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        customSet: state.customSet,
        savedSets: state.savedSets,
        recentlyViewed: state.recentlyViewed,
        searchHistory: state.searchHistory,
      }),
    },
  ),
)
