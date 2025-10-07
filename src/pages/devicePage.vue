<template>
  <main>
    <div v-if="loading" class="center">
      <img :src="loadingImg" alt="Loading" class="loading" />
    </div>
    <div v-else-if="error" class="center">
      <p>{{ error }}</p>
    </div>
    <DeviceList v-else :devices="devices" />
  </main>
</template>

<script setup>
import DeviceList from '@/components/devicePage/deviceList.vue'
import { useDevices } from '@/composables/useDevices.js'
import loadingImg from '@/assets/loading.gif'

const { devices, loading, error } = useDevices()
</script>
