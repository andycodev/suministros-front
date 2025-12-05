import { createRouter, createWebHistory } from 'vue-router'
import OrderView from '@/views/OrderView.vue'
import TrackingView from '@/views/TrackingView.vue'

const routes = [
  { path: '/order', component: OrderView },
  { path: '/tracking', component: TrackingView },
  {
    path: '/',
    redirect: '/order',
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/order',
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
