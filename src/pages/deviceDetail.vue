<template>
  <main>
    <div v-if="loading" class="center">
      <img :src="loadingImg" alt="Loading" class="loading" />
    </div>
    <div v-else-if="error" class="center">
      <p>{{ error }}</p>
    </div>
    <div v-else class="details">
      <section>
        <img :src="product.imgUrl" :alt="product.model" />
        <h3 class="details-price" v-if="product.price">
          {{ product.price }} {{ DEFAULT_CURRENCY }}
        </h3>
      </section>
      <section>
        <table>
          <tr v-for="field in fields" :key="field.key">
            <td class="spec-label">{{ field.label }}</td>
            <td v-if="!product[field.key]">{{ UNKNOWN }}</td>
            <td v-else-if="Array.isArray(product[field.key])">
              {{ product[field.key].join(', ') }}
            </td>
            <td v-else-if="field.key === 'weight'">
              {{ product[field.key] }} {{ DEFAULT_WEIGHT }}
            </td>
            <td v-else>{{ product[field.key] }}</td>
          </tr>
        </table>
        <div class="details-options">
          <span>Color:</span>
          <select v-model="color">
            <option
              v-for="color in product?.options?.colors"
              :key="color.code"
              :value="color"
              :placeholder="PLACEHOLDER_OPTION"
            >
              {{ color.name }}
            </option>
          </select>
        </div>
        <div class="details-options">
          <span>Storage:</span>
          <select v-model="storage">
            <option
              v-for="storage in product?.options?.storages"
              :key="storage.code"
              :value="storage"
            >
              {{ storage.name }}
            </option>
          </select>
        </div>
      </section>
    </div>
  </main>
</template>
<script setup>
import { ref } from 'vue'
import loadingImg from '@/assets/loading.gif'
import { useDevicesDetails } from '@/composables/useDeviceDetails.js'
import { DEFAULT_CURRENCY, DEFAULT_WEIGHT, UNKNOWN } from '@/utils/constants.js'
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
const fields = [
  { label: 'Brand', key: 'brand' },
  { label: 'Model', key: 'model' },
  { label: 'CPU', key: 'cpu' },
  { label: 'RAM', key: 'ram' },
  { label: 'OS', key: 'os' },
  { label: 'Display Resolution', key: 'displayResolution' },
  { label: 'Battery', key: 'battery' },
  { label: 'Primary Camera', key: 'primaryCamera' },
  { label: 'Secondary Camera', key: 'secondaryCmera' },
  { label: 'Dimensions', key: 'dimentions' },
  { label: 'Weight', key: 'weight' },
]
const color = ref(null)
const storage = ref(null)
const { product, loading, error } = useDevicesDetails(props.id)
</script>
<style scoped lang="scss">
@use '../style/mixins.scss' as *;
.details {
  @include d-flex(row, center, center, 10%);
  width: 100%;
  height: 100%;

  td {
    padding: 8px;
    text-align: left;
  }
  td.spec-label {
    font-weight: bold;
  }
  tr:nth-child(odd) {
    background-color: var(--color-secondary);
  }
  img {
    height: 400px;
    width: auto;
  }
  &-price {
    color: var(--color-red);
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
  }
  &-options {
    @include d-flex(row, center, center, 12px);
    margin: 5%;
    width: 90%;
    span {
      font-weight: bold;
      min-width: 70px;
    }
    select {
      padding: 0.7em 2.5em 0.7em 1em;
      border-radius: 8px;
      border: 1.5px solid var(--color-secondary);
      font-size: 1rem;
      background: transparent;
      color: black;
      width: 100%;
      box-sizing: border-box;
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #3fa7ff33;
      }
      option {
        background: transparent;
        color: black;
      }
    }
  }
}
</style>
