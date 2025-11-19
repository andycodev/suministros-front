<!-- src/modules/tracking/components/OrderResult.vue -->
<template>
    <div class="border rounded p-4 mt-4 max-w-lg mx-auto bg-white">
        <h2 class="font-bold">Pedido: {{ order.person }}</h2>

        <ul class="mt-2">
            <li v-for="i in order.items" :key="i.name" class="flex justify-between py-1">
                <span>{{ i.name }} x {{ i.qty }}</span>
                <span>S/. {{ i.price }}</span>
            </li>
        </ul>

        <div class="mt-3 font-bold">Total: S/. {{order.items.reduce((a, b) => a + b.qty * b.price, 0)}}</div>
        <div class="mt-2 text-sm text-gray-600">Estado: {{ order.status ?? 'Pendiente' }}</div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ order: any }>()
</script>
