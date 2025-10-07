import { createRouter, createWebHistory } from 'vue-router'
import devicePage from '@/pages/devicePage.vue'
import deviceDetail from '@/pages/deviceDetailsPage.vue'

const routes = [
  { path: '/', name: 'device', component: devicePage },
  { path: '/device/:id', name: 'deviceDetail', component: deviceDetail, props: true },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
