import { useLocalStorage } from '@vueuse/core'
import { EXPIRATION_TIME_MS } from './constants.js'

export async function fetchWithCache(key, url, ttlMs = EXPIRATION_TIME_MS) {
  // Reactive ref that sinchronizes with localStorage
  const cache = useLocalStorage(key, { value: null, timestamp: 0 })

  // If there is cache and it hasn't expired we return the data
  if (cache.value.value && Date.now() - cache.value.timestamp < ttlMs) {
    return cache.value.value
  }

  // If there is no cache or it has expired we call the API
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Error HTTP ${res.status}`)
  }

  const data = await res.json()

  // We store in the cache with timestamp
  cache.value = {
    value: data,
    timestamp: Date.now(),
  }

  return data
}
