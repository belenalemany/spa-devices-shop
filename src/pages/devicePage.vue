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
import DeviceList from '@/components/deviceList.vue'
import { useDevices } from '@/composables/useDevices.js'
import loadingImg from '@/assets/loading.gif'

const { devices, loading, error } = useDevices()
</script>

<style scoped lang="scss">
@use '../style/mixins.scss' as *;

.center {
  @include d-flex(column, center, center, 12px);
  @include d-flex(column, center, center, 12px);
  width: 100%;
  height: 100%;
}
.loading {
  width: 60px;
  height: auto;
}
</style>
