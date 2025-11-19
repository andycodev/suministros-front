// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    // ORDER FLOW
    {
      path: '/order',
      name: 'order-search',
      component: () => import('@/modules/order/views/SearchMemberView.vue'),
    },
    {
      path: '/order/materials',
      name: 'order-materials',
      component: () => import('@/modules/order/views/MaterialsView.vue'),
    },
    {
      path: '/order/payment',
      name: 'order-payment',
      component: () => import('@/modules/order/views/PaymentView.vue'),
    },
    {
      path: '/order/confirmation',
      name: 'order-confirmation',
      component: () => import('@/modules/order/views/ConfirmationView.vue'),
    },

    // TRACKING
    {
      path: '/tracking',
      name: 'tracking',
      component: () => import('@/modules/tracking/views/TrackOrderView.vue'),
    },

    // redirect base to order
    {
      path: '/',
      redirect: '/order',
    },

    {
      path: '/:pathMatch(.*)*',
      redirect: '/order',
    }
  ],
})
