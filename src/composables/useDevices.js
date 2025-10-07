import { ref, onMounted } from 'vue'
import { getDevices } from '@/services/getDevices.js'
import { useBreadcrumbStore } from '@/stores/breadcrumbStore'

export function useDevices() {
  const devices = ref([])
  const allDevices = ref([])
  const loading = ref(false)
  const error = ref(null)
  const breadcrumbStore = useBreadcrumbStore()

  const fetchDevices = async () => {
    loading.value = true
    error.value = null
    try {
      devices.value = await getDevices()
      allDevices.value = devices.value
      breadcrumbStore.clearBreadcrumbs()
    } catch (err) {
      console.log(err)
      error.value = 'No se pudieron cargar los dispositivos'
    } finally {
      loading.value = false
    }
  }

  const filterDevices = (searchName) => {
    if (!searchName) {
      devices.value = allDevices.value
      return
    }
    const filteredDevices = allDevices.value.filter((device) => {
      return (
        device.brand.toLowerCase().includes(searchName.toLowerCase()) ||
        device.model.toLowerCase().includes(searchName.toLowerCase())
      )
    })
    devices.value = filteredDevices
  }

  onMounted(fetchDevices)

  return { devices, loading, error, fetchDevices, filterDevices }
}
