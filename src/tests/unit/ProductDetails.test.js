import { fireEvent, render, screen } from '@testing-library/vue'
import '@testing-library/jest-dom'
import { createTestingPinia } from '@pinia/testing'
import ProductDetails from '@/components/deviceDetailsPage/deviceDetails.vue'
import { productMock } from '../mocks/productDetailsMock'
import { useCartStore } from '@/stores/cartStore'

describe('ProductDetails.vue Unit Tests', () => {
  test('shows main info', () => {
    render(ProductDetails, {
      global: {
        plugins: [createTestingPinia()],
      },
      props: { product: productMock },
    })

    const img = screen.getByRole('img')
    expect(img).toBeVisible()
    expect(img).toHaveAttribute('src', productMock.imgUrl)
    expect(screen.getByText(`${productMock.price} €`)).toBeVisible()
  })
  test.each([
    ['Brand', 'brand', productMock.brand],
    ['Model', 'model', productMock.model],
    ['CPU', 'cpu', productMock.cpu],
    ['RAM', 'ram', productMock.ram],
    ['OS', 'os', productMock.os],
    ['Display Resolution', 'displayResolution', productMock.displayResolution],
    ['Battery', 'battery', productMock.battery],
    ['Primary Camera', 'primaryCamera', productMock.primaryCamera.join(', ')],
    ['Secondary Camera', 'secondaryCmera', productMock.secondaryCmera.join(', ')],
    ['Dimensions', 'dimentions', productMock.dimentions],
    ['Weight', 'weight', `${productMock.weight} g`],
  ])('correctly shows the %s field', (label, key, expectedText) => {
    render(ProductDetails, {
      global: { plugins: [createTestingPinia()] },
      props: { product: productMock },
    })

    expect(screen.getByText(label)).toBeVisible()
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })
  test('shows btn add to cart disabled when color or storage is not selected', async () => {
    render(ProductDetails, {
      global: { plugins: [createTestingPinia()] },
      props: { product: productMock },
    })
    const btn = screen.getByTestId('add-cart-btn')
    // Initially disabled because the mock has only one color(so it's selected) but two storage options so none is selected
    expect(btn).toBeDisabled()

    const selectStorage = screen.getByTestId('select-storage')
    await fireEvent.update(selectStorage, productMock.options.storages[0].code)

    expect(btn).toBeEnabled()
  })
  test('calls addItem with correct arguments when clicking Add to Cart', async () => {
    const pinia = createTestingPinia()
    const cartStore = useCartStore()
    const addItemSpy = vi.spyOn(cartStore, 'addItem')

    render(ProductDetails, {
      global: { plugins: [pinia] },
      props: { product: productMock },
    })
    const selectStorage = screen.getByTestId('select-storage')
    await fireEvent.update(selectStorage, productMock.options.storages[0].code)

    const btn = screen.getByTestId('add-cart-btn')
    await fireEvent.click(btn)

    expect(addItemSpy).toHaveBeenCalledWith(
      productMock.id,
      productMock.options.colors[0].code,
      productMock.options.storages[0].code,
    )
  })
})
