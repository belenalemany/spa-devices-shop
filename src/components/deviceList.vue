<template>
  <p v-for="device in devices" :key="device.id">{{ device.model }}</p>
</template>
<script setup>
import { useDevices } from '@/composables/useDevices.js'

const { devices, loading, error } = useDevices()
console.log(devices)
</script>
<style scoped></style>
