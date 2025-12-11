<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Sidebar -->
    <!-- <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" /> -->

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- <Navbar @toggle-sidebar="sidebarOpen = !sidebarOpen" /> -->

      <!-- Main content area -->
      <main class="flex-1">
        <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 w-full">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
//import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'

const sidebarOpen = ref(false)
</script>