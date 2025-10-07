import { ref, onMounted } from 'vue'
import { getDevicesDetail } from '@/services/getDeviceDetails'
import { useBreadcrumbStore } from '@/stores/breadcrumbStore'

export function useDevicesDetails(id) {
  const product = ref([])
  const loading = ref(false)
  const error = ref(null)

  const breadcrumbStore = useBreadcrumbStore()

  const fetchDeviceDetails = async () => {
    loading.value = true
    error.value = null
    try {
      product.value = await getDevicesDetail(id)
      breadcrumbStore.setBreadcrumbs(product.value.model)
    } catch (err) {
      console.log(err)
      error.value = 'No se pudo cargar el detalle del dispositivo'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchDeviceDetails)

  return { product, loading, error, fetchDeviceDetails }
}
