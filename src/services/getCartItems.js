const DEVICE_API_URL = import.meta.env.VITE_DEVICE_API_URL

export const addToCart = async ({ id, colorCode, storageCode }) => {
  const response = await fetch(`${DEVICE_API_URL}/api/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, colorCode, storageCode }),
  })
  if (!response.ok) throw new Error(`Error HTTP (${response.status})`)
  return await response.json()
}
