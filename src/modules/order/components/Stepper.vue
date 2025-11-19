<!-- src/modules/order/components/Stepper.vue -->
<template>
    <div class="flex justify-between mb-6 max-w-lg mx-auto">
        <div v-for="s in steps" :key="s.id" class="flex-1 text-center px-1">
            <div class="mx-auto h-8 w-8 rounded-full flex items-center justify-center"
                :class="store.step >= s.id ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'">
                {{ s.id }}
            </div>
            <p class="text-xs mt-1">{{ s.name }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/useOrderStore'
const store = useOrderStore()

const steps = [
    { id: 1, name: 'Buscar' },
    { id: 2, name: 'Materiales' },
    { id: 3, name: 'Pago' },
    { id: 4, name: 'Confirmación' },
]
</script>
