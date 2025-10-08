# 📱 SPA - Product shop

Este proyecto es una SPA desarrollada con Vue 3 + Vite, que consume un API de productos, mostrando un listado, su detalle, y un contador de productos añadidos al carrito de compras.

## 📜 Scripts disponibles

Ejecuta los siguientes comandos en el terminal:

```bash
npm install         # Instala las dependencias
npm run start       # Ejecuta la aplicación en modo desarrollo
npm run test        # Ejecuta los tests
npm run lint        # Lint del código
```

## 🚀 Tecnologías utilizadas

- Vue 3 + Vite
- Vue Router
- Fetch
- VueUse (useLocalStorage)
- Pinia
- ESLint + Prettier
- Testing Library + Vitest

## 🛠️ Estrategia de cache

- 📦 Se ha decidido usar `VueUse (useLocalStorage)` para cachear productos y detalles con expiración de 1h y aislar la lógica en `fetchWithCache`. Trascurrido este tiempo (que se comprueba comparando el timestamp) se vuelve a hacer las llamadas necesarias a la API.
- 🍍 Para manejar el contador del carrito que está visible en todas las páginas, se ha optado por `Pinia` ya que permite manejar un estado global compartido. Además, se hidrata desde la cache cuando arranca la aplicación en `App.vue`

## 📝 Funcionalidades

- 📑 Se han creado una página para cada vista (listado de productos y detalle del producto), y algunos componentes que ayudan a hacer que la lógica esté más encapsulada y sea más fácil de mantener y pueda reutilizarse en un futuro.
- ⚙️ Se ha aislado la lógica de llamadas a la API en composables + services lo que permite cambiar de fetch a cualquier otra tecnologia sin tener que hacer un gran refactor.
- 🎨 Para el diseño de la aplicación se ha utilizado SCSS así como mixins para definir los estilos globales.
- 🧪 Se ha hecho a modo representativo tests unitarios que comprueba que se renderice el contenido de los detalles del dispositivo y también tests de integración para la llamada de obtener el listado de productos.
