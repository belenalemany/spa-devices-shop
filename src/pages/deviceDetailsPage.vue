<template>
  <main>
    <div v-if="loading" class="center">
      <img :src="loadingImg" alt="Loading" class="loading" />
    </div>
    <div v-else-if="error" class="center">
      <p>{{ error }}</p>
    </div>
    <div v-else class="center">
      <DeviceDetails :product="product" />
    </div>
  </main>
</template>
<script setup>
import loadingImg from '@/assets/loading.gif'
import { useDevicesDetails } from '@/composables/useDeviceDetails.js'
import DeviceDetails from '@/components/deviceDetailsPage/deviceDetails.vue'
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
const { product, loading, error } = useDevicesDetails(props.id)
</script>
