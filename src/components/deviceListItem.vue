<template>
  <section class="device-card">
    <img :src="device.imgUrl" :alt="device.model" class="device-card-image" />
    <div class="device-card-info">
      <p class="device-card-name">{{ device.brand }} {{ device.model }}</p>
      <p class="device-card-info-price" v-if="device.price">
        {{ device.price }} {{ DEFAULT_CURRENCY }}
      </p>
    </div>
  </section>
</template>
<script setup>
import { DEFAULT_CURRENCY } from '@/utils/constants.js'
defineProps({
  device: {
    type: Object,
    required: true,
  },
})
</script>
<style scoped lang="scss">
@use '../style/mixins.scss' as *;
.device-card {
  @include d-flex(column, initial, initial, 12px);
  padding: 1.5vh;
  min-height: 40vh;
  width: 400px;
  cursor: pointer;
  border-radius: 15px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &-info {
    @include d-flex(column, center, initial, 7px);
    &-price {
      color: var(--color-red);
      text-align: center;
      font-weight: bold;
    }
  }
  &-name {
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: auto;
    text-align: center;
    width: 80%;
  }
  &-image {
    width: 50%;
    height: auto;
    align-self: center;
    object-fit: contain;
  }
}
</style>
