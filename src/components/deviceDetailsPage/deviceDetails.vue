<template>
  <main>
    <div class="details">
      <section class="details-image">
        <img :src="product.imgUrl" :alt="product.model" />
        <h3 class="details-price" v-if="product.price">
          {{ product.price }} {{ DEFAULT_CURRENCY }}
        </h3>
      </section>
      <section class="details-info">
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
          <select v-model="color" @change="color = $event.target.value">
            <option v-for="color in product?.options?.colors" :key="color.code" :value="color.code">
              {{ color.name }}
            </option>
          </select>
        </div>
        <div class="details-options">
          <span>Storage:</span>
          <select v-model="storage" data-testid="select-storage">
            <option
              v-for="storage in product?.options?.storages"
              :key="storage.code"
              :value="storage.code"
            >
              {{ storage.name }}
            </option>
          </select>
        </div>
        <div class="details-btn-cart">
          <button
            :disabled="!color || !storage || cartStore.loadingCart"
            @click="addToCart()"
            data-testid="add-cart-btn"
          >
            {{ cartStore.loadingCart ? 'Added...' : 'Add to cart' }}
          </button>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { DEFAULT_CURRENCY, DEFAULT_WEIGHT, UNKNOWN } from '@/utils/constants.js'
import { useCartStore } from '@/stores/cartStore.js'
const cartStore = useCartStore()
const props = defineProps({
  product: {
    type: Object,
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

watchEffect(() => {
  const colors = props.product?.options?.colors
  const storages = props.product?.options?.storages

  if (colors?.length === 1) color.value = colors[0].code
  if (storages?.length === 1) storage.value = storages[0].code
})

function addToCart() {
  cartStore.addItem(props.product.id, color.value, storage.value)
}
</script>

<style scoped lang="scss">
@use '../../style/mixins.scss' as *;
.details {
  @include d-flex(row, center, center, 10%);
  width: 100vw;
  height: 100%;
  flex-wrap: wrap;
  padding-top: 10px;

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
  &-btn-cart {
    @include d-flex(row, center, center, 12px);
  }
  @include respond(phone) {
    @include d-flex(column, flex-start, center, 1.5rem);
    height: auto;
    padding-top: 35rem;

    &-image {
      width: 90%;
      height: auto;
      text-align: center;
      margin-top: 0;

      img {
        height: auto;
        max-width: 100%;
      }
    }

    &-info {
      width: 95%;
      padding: 1rem 0.5rem;
    }
    &-btn-cart {
      margin-bottom: 2rem;
      & button {
        width: 50%;
        height: 40px;
      }
    }
  }
}
</style>
