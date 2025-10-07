<template>
  <header class="header">
    <span class="header-title">
      <h3 @click="router.push('/')" class="header-title-breadcrumb">📱 SPA-DEVICES-SHOP</h3>
      <h3 v-if="breadcrumbStore.breadcrumbs">/ {{ breadcrumbStore.breadcrumbs }}</h3>
    </span>
    <div class="header-cart">
      <p class="header-cart-count" v-if="cartStore.itemsOnCart > 0">{{ cartStore.itemsOnCart }}</p>
      <img :src="cartImg" alt="cart" class="header-cart-icon" />
    </div>
  </header>
</template>

<script setup>
import cartImg from '@/assets/cart.png'
import router from '@/router'
import { useCartStore } from '@/stores/cartStore.js'
import { useBreadcrumbStore } from '@/stores/breadcrumbStore'

const cartStore = useCartStore()
const breadcrumbStore = useBreadcrumbStore()
</script>

<style scoped lang="scss">
@use '../style/mixins.scss' as *;

.header {
  @include d-flex(row, space-between, center, 0px);
  padding: 30px;
  &-title {
    display: inline-flex;
    &-breadcrumb {
      cursor: pointer;
    }
  }
  &-cart {
    &-count {
      display: inline-block;
      padding: 0px 6px;
      border: 1px solid var(--color-white);
      border-radius: 50%;
      text-align: center;
      position: absolute;
      top: 1%;
      right: 1%;
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
