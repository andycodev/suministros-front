<!-- src/modules/order/views/MaterialsView.vue -->
<template>
    <div class="p-4">
        <Stepper />

        <h1 class="text-xl font-bold mb-4">Materiales — {{ store.member?.name ?? '' }}</h1>

        <div class="max-w-lg mx-auto space-y-3">
            <div v-for="m in materialsCatalog" :key="m.id" class="border p-3 rounded flex items-center justify-between">
                <div>
                    <div class="font-semibold">{{ m.name }}</div>
                    <div class="text-sm text-gray-600">S/. {{ m.price }}</div>
                </div>

                <div class="flex items-center gap-2">
                    <button class="px-2 py-1 border rounded" @click="decrease(m.id)">-</button>
                    <input type="number" min="0" :value="qtyOf(m.id)" @input="onQtyChange($event, m.id)"
                        class="w-16 text-center border rounded px-1 py-1" />
                    <button class="px-2 py-1 bg-green-600 text-white rounded" @click="add(m)">Agregar</button>
                </div>
            </div>

            <div class="border p-3 rounded bg-gray-50">
                <div class="flex justify-between">
                    <div>Total items</div>
                    <div>{{store.materials.reduce((a, b) => a + b.qty, 0)}}</div>
                </div>
                <div class="flex justify-between mt-2 font-bold">
                    <div>Total S/.</div>
                    <div>{{ store.total }}</div>
                </div>
            </div>

            <div class="flex gap-2">
                <button class="flex-1 btn-primary" @click="goToPayment"
                    :disabled="store.materials.length === 0">Continuar al pago</button>
                <button class="flex-1 border rounded" @click="goBack">Volver</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useOrderStore } from '@/stores/useOrderStore'
import Stepper from '../components/Stepper.vue'
import { useRouter } from 'vue-router'

const store = useOrderStore()
const router = useRouter()

// Catalogo de ejemplo (20 materiales en producción)
const materialsCatalog = ref([
    { id: 1, name: 'Manual instructor', price: 10 },
    { id: 2, name: 'Libro básico', price: 20 },
    { id: 3, name: 'Guía rápida', price: 5 },
    // ... hasta 20
])

function add(mat: { id: number; name: string; price: number }) {
    store.addMaterial(mat)
}

function qtyOf(id: number) {
    const it = store.materials.find(m => m.id === id)
    return it ? it.qty : 0
}

function onQtyChange(e: Event, id: number) {
    const v = Number((e.target as HTMLInputElement).value || 0)
    store.setMaterialQty(id, v)
}

function decrease(id: number) {
    const current = qtyOf(id)
    store.setMaterialQty(id, Math.max(0, current - 1))
}

function goToPayment() {
    store.setStep(3)
    router.push('/order/payment')
}

function goBack() {
    store.setStep(1)
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
