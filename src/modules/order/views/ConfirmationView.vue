<!-- src/modules/order/views/ConfirmationView.vue -->
<template>
    <div class="p-4 text-center">
        <Stepper />

        <div class="max-w-lg mx-auto">
            <h1 class="text-2xl font-bold text-green-600">¡Pedido confirmado!</h1>
            <p class="mt-3">Código de pedido:</p>
            <p class="text-2xl font-bold">{{ store.lastOrderCode }}</p>

            <div class="mt-4">
                <button class="btn-primary w-full" @click="newOrder">Hacer otro pedido</button>
                <router-link to="/tracking" class="block mt-3 text-sm text-blue-600">Consultar pedido</router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Stepper from '../components/Stepper.vue'
import { useOrderStore } from '@/stores/useOrderStore'
import { useRouter } from 'vue-router'

const store = useOrderStore()
const router = useRouter()

function newOrder() {
    store.resetAll()
    router.push('/order')
}
</script>

<style scoped>
.btn-primary {
    background: #2563eb;
    color: white;
    padding: 0.5rem;
    border-radius: 0.375rem;
}
</style>
