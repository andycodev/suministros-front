<template>
  <div class="flex flex-col h-screen overflow-hidden bg-base-200">

    <template v-if="$route.path.startsWith('/director') || $route.path === '/login'">
      <div class="flex-1 overflow-auto">
        <router-view />
      </div>
    </template>

    <template v-else>
      <div class="navbar bg-base-100 shadow-sm">
        <div class="flex-1">
          <a class="btn btn-ghost text-xl">Maná</a>
        </div>
        <div class="flex-none">
          <!--   <ul class="menu menu-horizontal px-1">
            <li><a>Link</a></li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul class="bg-base-100 rounded-t-none p-2">
                  <li><a>Link 1</a></li>
                  <li><a>Link 2</a></li>
                </ul>
              </details>
            </li>
          </ul> -->
          <div class="badge badge-soft badge-primary mr-2">Periodo - {{ store.periodoPredeterminado?.nombre }}
          </div>


        </div>
        <!-- <div class="navbar-end">
          <a class="btn">Button</a>
        </div> -->
      </div>

      <main class="flex-1 overflow-auto">
        <router-view />
      </main>
    </template>

    <div class="fixed inset-0 pointer-events-none z-[999] flex items-center justify-center">
      <div class="pointer-events-auto">
        <Notification v-bind="notificationState" @close="notificationState.show = false" />
      </div>
    </div>

    <Loading />
  </div>
</template>

<script lang="ts" setup>
import Main from './layouts/Main.vue'
import Notification from './components/shared/Notification.vue'
import { notificationState } from './events/notificationEvents'
import { useLoadingTracker } from './composables/useLoadingTracker';
import { usePeriodoStore } from '@/stores/periodoStore';
import { computed } from 'vue';

const store = usePeriodoStore();

const isDirectorAuthenticated = computed(() => {
  return localStorage.getItem('isDirectorAuth') === 'true';
});

useLoadingTracker();
</script>
