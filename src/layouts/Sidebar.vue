<template>
  <div>
    <!-- Mobile overlay -->
    <div v-if="isOpen"
      class="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden transition-opacity duration-300 ease-in-out"
      @click="handleClose" aria-hidden="true" />

    <!-- Sidebar -->
    <div :class="[
      'fixed z-30 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">
      <div class="flex flex-col h-full">
        <!-- Logo -->
        <div class="flex flex-col items-center justify-center h-16 px-6 border-b border-gray-200">
          <h2 class="text-lg font-bold text-gray-800">Suministros</h2>
          <!-- <p class="text-xs font-medium text-gray-700">Sistema de pedidos</p> -->
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-4">
          <ul class="space-y-1">
            <NavItem to="/order" icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              :on-close="handleClose">
              Pedidos
            </NavItem>
            <NavItem to="/tracking" icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              :on-close="handleClose">
              Seguimiento
            </NavItem>
          </ul>
        </nav>

        <!-- User info -->
        <!--    <div class="p-4 border-t border-gray-200">
          <div class="flex items-center">
            <div
              class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
              {{ userInitials }}
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-700">{{ user.name }}</p>
              <p class="text-xs font-normal text-gray-500">{{ user.email }}</p>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import NavItem from '@/components/NavItem.vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleClose = () => {
  emit('close')
}

const user = {
  name: 'Administrador',
  email: '@laeskinitachongoyape'
}

const userInitials = computed(() => {
  return user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
})

const isOpen = computed(() => props.open)
</script>