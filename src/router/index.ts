import { createRouter, createWebHistory } from 'vue-router'
import OrderView from '@/views/OrderView.vue'
import PayView from '@/views/PayView.vue'
import TrackingView from '@/views/TrackingView.vue'
import ConfirmationView from '@/views/ConfirmationView.vue'

const routes = [
  { path: '/order', component: OrderView },
  { path: '/tracking', component: TrackingView },
  {
    path: '/',
    redirect: '/order',
  },
  {
    path: '/order/pay/:id_pedido',
    component: PayView,
  },
  {
    path: '/order/confirmation/:id_pedido',
    component: ConfirmationView,
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
