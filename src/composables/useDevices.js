import { ref, onMounted } from 'vue'
import { getDevices } from '@/services/getDevices.js'

export function useDevices() {
  const devices = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchDevices = async () => {
    loading.value = true
    error.value = null
    try {
      devices.value = await getDevices()
    } catch (err) {
      error.value = 'No se pudieron cargar los dispositivos'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchDevices)

  return { devices, loading, error, fetchDevices }
}
