<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">

    <!-- 🔹 Stepper visible SOLO en rutas del módulo order -->
    <!--   <div v-if="showStepper" class="border-b bg-white">
      <Stepper />
    </div> -->

    <!-- 🔹 Transición de vistas -->
    <main class="max-w-3xl mx-auto p-4">
      <Transition name="fade" mode="out-in">
        <RouterView />
      </Transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
//import Stepper from '@/modules/order/components/Stepper.vue';

// Detectar ruta actual
const route = useRoute();

// Mostrar Stepper SOLO en rutas de /order/*
const showStepper = computed(() => route.path.startsWith('/order'));
</script>

<style>
/* Transición */
.fade-enter-active,
.fade-leave-active {
  transition: 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
