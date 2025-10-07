import { useLocalStorage } from '@vueuse/core'
import { EXPIRATION_TIME_MS } from './constants.js'

export async function fetchWithCache(key, url, ttlMs = EXPIRATION_TIME_MS) {
  // Creamos un ref reactivo que se sincroniza con localStorage
  const cache = useLocalStorage(key, { value: null, timestamp: 0 })

  // Si hay cache y no expiró → devolvemos los datos
  if (cache.value.value && Date.now() - cache.value.timestamp < ttlMs) {
    return cache.value.value
  }

  // Si no hay cache o expiró → llamamos a la API
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Error HTTP ${res.status}`)
  }

  const data = await res.json()

  // Guardamos en el cache con timestamp
  cache.value = {
    value: data,
    timestamp: Date.now(),
  }

  return data
}
