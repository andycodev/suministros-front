import { createRouter, createWebHistory } from 'vue-router'
import OrderView from '@/views/OrderView.vue'
import PayView from '@/views/PayView.vue'
import TrackingView from '@/views/TrackingView.vue'
import ConfirmationView from '@/views/ConfirmationView.vue'
import LoginView from '@/views/LoginView.vue'
import DirectorLayout from '@/layouts/DirectorLayout.vue'
import DashboardView from '@/views/director/DashboardView.vue'
import MyOrderView from '@/views/director/MyOrderView.vue'
import DirectorOrderView from '@/views/director/OrderView.vue'
import DirectorPayView from '@/views/director/PayView.vue'
import MaterialsView from '@/views/director/MaterialsView.vue'
import ReportsView from '@/views/director/ReportsView.vue'
import SettingsView from '@/views/director/SettingsView.vue'

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
    path: '/login',
    component: LoginView,
  },
  {
    path: '/director',
    component: DirectorLayout,
    meta: { requiresAuth: true },
    redirect: '/director/dashboard',
    children: [
      {
        path: 'dashboard',
        component: DashboardView,
      },
      {
        path: 'my-order',
        component: MyOrderView,
      },
      {
        path: 'order',
        component: DirectorOrderView,
      },
      {
        path: 'order/pay/:id_pedido',
        component: DirectorPayView,
      },
      {
        path: 'materials',
        component: MaterialsView,
      },
      {
        path: 'reports',
        component: ReportsView,
      },
      {
        path: 'settings',
        component: SettingsView,
      },
    ],
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

// Guard de autenticación para rutas protegidas
router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth) {
    const isAuthenticated = localStorage.getItem('isDirectorAuth') === 'true';
    if (!isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
