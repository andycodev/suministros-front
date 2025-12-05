<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <!-- Main Content -->
    <div class="lg:pl-64 flex flex-col min-h-screen">
      <!-- <Navbar @toggle-sidebar="sidebarOpen = !sidebarOpen" /> -->

      <!-- Main content area with distinct container -->
      <main class="flex-1 p-4 md:p-6 lg:p-8 h-[calc(100vh-5rem)]">
        <div class="bg-white rounded-lg shadow-sm p-4 md:p-6 w-full h-full flex flex-col">
          <!-- Responsive container that works on all screen sizes -->
          <div class="max-w-full mx-auto flex-1 flex flex-col w-full">
            <slot />
          </div>
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