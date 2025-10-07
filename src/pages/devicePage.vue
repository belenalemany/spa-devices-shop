<template>
  <main>
    <div v-if="loading" class="center">
      <img :src="loadingImg" alt="Loading" class="loading" />
    </div>
    <div v-else-if="error" class="center">
      <p>{{ error }}</p>
    </div>
    <div v-else class="device-page">
      <div class="device-page-header">
        <input
          type="text"
          placeholder="Search devices..."
          class="device-page-search"
          @input="filterDevices($event.target.value)"
        />
      </div>
      <DeviceList :devices="devices" />
    </div>
  </main>
</template>

<script setup>
import DeviceList from '@/components/devicePage/deviceList.vue'
import { useDevices } from '@/composables/useDevices.js'
import loadingImg from '@/assets/loading.gif'

const { devices, loading, error, filterDevices } = useDevices()
</script>
<style scoped lang="scss">
@use '../style/mixins.scss' as *;
.device-page {
  overflow-y: hidden;
  &-header {
    @include d-flex(row, flex-end, center, 0px);
    padding: 30px;
  }
  &-search {
    background-color: var(--color-secondary);
    height: 30px;
    border-radius: 5px;
    color: var(--color-black);
  }
}
</style>
