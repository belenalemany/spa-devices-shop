import { createRouter, createWebHistory } from 'vue-router'
import devicePage from '@/pages/devicePage.vue'

const routes = [{ path: '/', name: 'device', component: devicePage }]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
