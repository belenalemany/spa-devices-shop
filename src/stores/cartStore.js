import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { addToCart } from '@/services/getCartItems.js'
import { EXPIRATION_TIME_MS } from '@/utils/constants.js'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: useLocalStorage('cart', { count: 0, timestamp: Date.now() }),
    loadingCart: false,
    error: null,
  }),

  getters: {
    itemsOnCart: (state) => state.cart.count,
  },

  actions: {
    async addItem(id, colorCode, storageCode) {
      this.checkExpiration()
      this.loadingCart = true
      this.error = null
      try {
        const response = await addToCart({ id, colorCode, storageCode })
        this.cart = {
          count: (this.cart.count || 0) + response.count,
          timestamp: Date.now(),
        }
      } catch (err) {
        this.error = err.message
      } finally {
        this.loadingCart = false
      }
    },
    checkExpiration() {
      if (Date.now() - this.cart.timestamp > EXPIRATION_TIME_MS) {
        this.resetCart()
      }
    },
    resetCart() {
      this.cart = { count: 0, timestamp: Date.now() }
    },
  },
})
