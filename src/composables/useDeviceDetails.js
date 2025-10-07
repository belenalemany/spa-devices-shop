import { ref, onMounted } from 'vue'
import { getDevicesDetail } from '@/services/getDeviceDetails'

export function useDevicesDetails(id) {
  const product = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchDeviceDetails = async () => {
    loading.value = true
    error.value = null
    try {
      product.value = await getDevicesDetail(id)
    } catch (err) {
      error.value = 'No se pudo cargar el detalle del dispositivo'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchDeviceDetails)

  return { product, loading, error, fetchDeviceDetails }
}
