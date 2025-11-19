import { createRouter, createWebHistory } from 'vue-router'
import ShoppingView from '@/views/ShoppingView.vue'
import OrderView from '@/views/OrderView.vue'
import PaymentView from '@/views/PaymentView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ShoppingView
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView
  },
  {
    path: '/payment',
    name: 'payment',
    component: PaymentView
  },

  //Ruta para capturar TODO lo que no exista
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
