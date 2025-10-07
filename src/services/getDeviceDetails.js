const DEVICE_API_URL = import.meta.env.VITE_DEVICE_API_URL
import { fetchWithCache } from '@/utils/fetchWithCache.js'

export const getDevicesDetail = (id) =>
  fetchWithCache(`deviceDetails-${id}`, `${DEVICE_API_URL}/api/product/${id}`)
