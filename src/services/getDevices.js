const DEVICE_API_URL = import.meta.env.VITE_DEVICE_API_URL
import { fetchWithCache } from '@/utils/fetchWithCache.js'

export const getDevices = () => fetchWithCache('devices', `${DEVICE_API_URL}/api/product`)
