<template>
  <header class="header">
    <h3>📱 SPA-DEVICES-SHOP</h3>
    <div class="header-cart">
      <p class="header-cart-count" v-if="store.itemsOnCart > 0">{{ store.itemsOnCart }}</p>
      <img :src="cartImg" alt="cart" class="header-cart-icon" />
    </div>
  </header>
</template>

<script setup>
import cartImg from '@/assets/cart.png'
import { useCartStore } from '@/stores/cartStore.js'
const store = useCartStore()
</script>

<style scoped lang="scss">
@use '../style/mixins.scss' as *;

.header {
  @include d-flex(row, space-between, center, 0px);
  padding: 30px;
  &-cart {
    &-count {
      display: inline-block;
      padding: 0px 6px;
      border: 1px solid var(--color-white);
      border-radius: 50%;
      text-align: center;
      position: absolute;
      top: 1%;
      right: 2%;
      z-index: 1;
      background: var(--color-red);
      color: var(--color-white);
      font-size: 12px;
    }
    &-icon {
      width: 40px;
      height: auto;
    }
  }
}
</style>
