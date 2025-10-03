import { useLocalStorage } from '@vueuse/core'

export async function fetchWithCache(key, url, ttlMs = 3600000) {
  console.log('hola')
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
  console.log('Cache actualizado:')
  console.log(cache.value)

  return data
}
