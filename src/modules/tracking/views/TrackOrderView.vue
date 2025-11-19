<!-- src/modules/tracking/views/TrackOrderView.vue -->
<template>
    <div class="p-4">
        <h1 class="text-xl font-bold mb-4">Consultar pedido</h1>

        <div class="max-w-lg mx-auto space-y-3">
            <input v-model="query" placeholder="Código de pedido o DNI" class="input" />
            <div class="flex gap-2">
                <button class="btn-primary flex-1" @click="search">Buscar</button>
                <button class="border rounded flex-1" @click="clear">Limpiar</button>
                <button class="border rounded flex-1" @click="newOrder">Hacer nuevo pedido</button>
            </div>

            <OrderResult v-if="order" :order="order" />

            <div v-else-if="queried" class="text-sm text-red-600">No se encontró ese pedido.</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OrderResult from '../components/OrderResult.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')
const order = ref<any | null>(null)
const queried = ref(false)

// MOCK backend
const mockOrders: Record<string, any> = {
    'PED-111111': { person: 'Daniel', items: [{ name: 'Manual', qty: 1, price: 10 }], status: 'Confirmado' },
    '12345678': { person: 'Daniel', items: [{ name: 'Libro', qty: 2, price: 20 }], status: 'Enviado' }
}

function search() {
    queried.value = true
    order.value = mockOrders[query.value] ?? null
}

function clear() {
    query.value = ''
    order.value = null
    queried.value = false
}

function newOrder() {
    router.push('/order')
}
</script>

<style scoped>
.input {
    border: 1px solid #ddd;
    padding: 0.5rem;
    border-radius: 0.375rem;
}

.btn-primary {
    background: #2563eb;
    color: white;
    padding: 0.5rem;
    border-radius: 0.375rem;
}
</style>
