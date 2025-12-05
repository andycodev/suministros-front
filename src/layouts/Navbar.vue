<template>
  <header class="w-full bg-white shadow-sm">
    <div class="flex justify-between h-16 px-4 lg:px-8">
      <!-- Botón hamburguesa -->
      <button type="button"
        class="lg:hidden text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        @click="$emit('toggle-sidebar')">
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>

      <!-- Perfil de usuario -->
      <div class="flex items-center ml-auto">
        <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
          {{ userInitials }}
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-700">{{ user.name }}</p>
          <p class="text-xs font-normal text-gray-500">{{ user.email }}</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { Bars3Icon } from '@heroicons/vue/24/outline'
import { ref, computed } from 'vue'

const user = ref({
  name: 'Administrador',
  email: '@laeskinitachongoyape'
})

const userInitials = computed(() => {
  return user.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
})
</script>
