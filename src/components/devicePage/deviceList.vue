<template>
  <section class="devices-list">
    <deviceListItem v-for="device in devices" :key="device.id" :device="device" />
  </section>
</template>
<script setup>
import deviceListItem from './deviceListItem.vue'
defineProps({
  devices: {
    type: Array,
    required: true,
  },
})
</script>
<style scoped lang="scss">
@use '../../style/mixins.scss' as *;
.devices-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-auto-rows: auto;
  gap: 24px;
  padding: 20px;
  overflow-y: auto;
  height: 73vh;
  width: 97vw;
  justify-items: center;
}
</style>
