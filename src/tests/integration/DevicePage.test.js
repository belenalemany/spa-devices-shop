import { render, screen, waitFor, fireEvent } from '@testing-library/vue'
import DevicePage from '@/pages/devicePage.vue'
import * as devicesService from '@/services/getDevices.js'
import { createTestingPinia } from '@pinia/testing'
import '@testing-library/jest-dom'
import { devicesMock } from '../mocks/devicesMock'

describe('DevicePage.vue Integration Tests', () => {
  test('should get devices from API and display them', async () => {
    const getDevicesSpy = vi.spyOn(devicesService, 'getDevices').mockResolvedValue(devicesMock)

    render(DevicePage, {
      plugins: [createTestingPinia()],
    })

    await waitFor(async () => {
      expect(await screen.findByTestId('search-input')).toBeInTheDocument()
    })

    devicesMock.forEach(async (device) => {
      expect(await screen.findByText(`${device.brand} ${device.model}`)).toBeInTheDocument()
    })

    expect(getDevicesSpy).toHaveBeenCalledTimes(1)
  })

  test('should display error message if fetch fails', async () => {
    vi.spyOn(devicesService, 'getDevices').mockRejectedValueOnce(new Error('API error'))

    render(DevicePage, {
      plugins: [createTestingPinia()],
    })
    await waitFor(() => {
      expect(screen.getByText('No se pudieron cargar los dispositivos')).toBeInTheDocument()
    })
  })

  test('should filter devices based on search input', async () => {
    vi.spyOn(devicesService, 'getDevices').mockResolvedValue(devicesMock)
    render(DevicePage, {
      plugins: [createTestingPinia()],
    })
    const searchInput = await screen.findByTestId('search-input')
    await fireEvent.update(searchInput, 'Apple')

    expect(screen.getByText('Apple Liquid Z6')).toBeInTheDocument()
    expect(screen.queryByText('Acer Iconia Talk S')).not.toBeInTheDocument()
  })
})
