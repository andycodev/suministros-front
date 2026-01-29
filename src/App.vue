<template>
  <!-- Solo mostrar header para rutas que no sean del director -->
  <template v-if="$route.path.startsWith('/director') || $route.path === '/login'">
    <router-view />
  </template>
  <template v-else>
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Sistema de Pedidos de Materiales</h1>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto">Gestiona y realiza tus pedidos de materiales de manera rápida
          y
          sencilla</p>
      </div>
    </div>
    <Main>
      <router-view />
    </Main>
  </template>
</template>

<script lang="ts" setup>
import Main from './layouts/Main.vue'
</script>
