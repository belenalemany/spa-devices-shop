<template>
  <headerBar />
  <router-view />
</template>
<script setup>
import headerBar from '@/components/headerBar.vue'
import './style/theme.scss'
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore.js'
const cartStore = useCartStore()

onMounted(() => {
  cartStore.checkExpiration()
})
</script>

<style scoped></style>
