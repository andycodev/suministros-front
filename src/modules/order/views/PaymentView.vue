<!-- src/modules/order/views/PaymentView.vue -->
<template>
    <div class="p-4">
        <Stepper />

        <h1 class="text-xl font-bold mb-4">Pago - {{ store.member?.name ?? '' }}</h1>

        <div class="max-w-lg mx-auto space-y-3">
            <div v-if="!processing">
                <div v-for="m in store.materials" :key="m.id" class="flex justify-between">
                    <div>{{ m.name }} x {{ m.qty }}</div>
                    <div>S/. {{ m.price * m.qty }}</div>
                </div>

                <div class="mt-3 text-lg font-bold">Total: S/. {{ store.total }}</div>

                <!-- Simular método de pago -->
                <select v-model="method" class="input mt-3">
                    <option value="visanet">VisaNet</option>
                    <option value="efectivo">Efectivo</option>
                </select>

                <div class="flex gap-2 mt-4">
                    <button class="btn-primary flex-1" @click="pay">Pagar</button>
                    <button class="border rounded flex-1" @click="back">Volver</button>
                </div>
            </div>

            <div v-else class="text-center">
                <p>Procesando pago…</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Stepper from '../components/Stepper.vue'
import { useOrderStore } from '@/stores/useOrderStore'
import { useRouter } from 'vue-router'

const store = useOrderStore()
const router = useRouter()
const method = ref('visanet')
const processing = ref(false)

async function pay() {
    // Aquí integrarás VisaNet (SDK / redirect). Ejemplo: llamar tu backend para iniciar pago.
    processing.value = true

    try {
        // Simulación: llamar a backend para crear orden y procesar pago
        // const res = await api.post('/orders', { member: store.member, items: store.materials, paymentMethod: method.value })
        // const { orderCode } = res.data
        // store.makePayment(orderCode)

        // MOCK delay
        await new Promise(r => setTimeout(r, 1000))
        store.makePayment() // genera orderCode localmente
        router.push('/order/confirmation')
    } catch (e) {
        console.error(e)
        alert('Error en el pago')
    } finally {
        processing.value = false
    }
}

function back() {
    store.setStep(2)
    router.push('/order/materials')
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
