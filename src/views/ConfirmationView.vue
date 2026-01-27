<template>
    <div class="min-h-screen bg-base-200 p-4 md:p-8">
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-10">
                <div class="inline-block p-3 mb-4 rounded-full bg-success/20">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-success" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 class="text-3xl font-bold mb-2">¡Pedido Confirmado!</h1>
                <p class="text-lg text-gray-600">Gracias por tu compra, {{ pedidoDetail?.persona?.nombres }}</p>
                <div class="mt-4 p-3 bg-base-100 rounded-lg shadow-sm inline-block">
                    <p class="text-sm text-gray-500">Código de pedido:</p>
                    <p class="text-xl font-mono font-bold">{{ pedidoDetail?.codigo }}</p>
                </div>
            </div>

            <!-- Order Summary -->
            <div class="bg-base-100 rounded-xl shadow-sm p-6 mb-8">
                <h2 class="text-xl font-semibold mb-6 pb-2 border-b">Resumen del Pedido</h2>

                <!-- Order Items -->
                <div class="mb-6">
                    <h3 class="font-medium mb-3">Productos</h3>
                    <div v-for="(item, index) in pedidoDetail?.detalles" :key="index"
                        class="mb-4 pb-4 border-b last:border-0 last:pb-0">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-medium">{{ item.cantidad }}x {{ item.material.nombre }}</p>
                                <p class="text-sm text-gray-500">{{ item.material.descripcion }}</p>
                            </div>
                            <p class="font-medium">S/ {{ item.subtotal }}</p>
                        </div>
                    </div>
                </div>

                <!-- Order Totals -->
                <div class="bg-base-200 p-4 rounded-lg">
                    <div class="flex justify-between mb-2">
                        <span class="text-gray-600">Subtotal:</span>
                        <span class="font-medium">S/ {{ pedidoDetail?.total_monto }}</span>
                    </div>
                    <div class="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span class="text-primary">S/ {{ pedidoDetail?.total_monto }}</span>
                    </div>
                </div>
            </div>

            <!-- Order Details -->
            <div class="grid md:grid-cols-2 gap-6 mb-8">
                <!-- Shipping Address -->
                <div class="bg-base-100 p-6 rounded-xl shadow-sm">
                    <h3 class="font-semibold mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Dirección de envío
                    </h3>
                    <p class="text-gray-700">{{ pedidoDetail?.persona?.direccion }}</p>
                </div>

                <!-- Contact Info -->
                <div class="bg-base-100 p-6 rounded-xl shadow-sm">
                    <h3 class="font-semibold mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Información de contacto
                    </h3>
                    <p class="text-gray-700 mb-2">{{ pedidoDetail?.persona?.nombres }} {{
                        pedidoDetail?.persona?.ap_paterno }}</p>
                    <p class="text-gray-700 mb-2">{{ pedidoDetail?.persona?.email }}</p>
                    <p class="text-gray-700">{{ pedidoDetail?.persona?.telefono }}</p>
                </div>
            </div>

            <!-- Next Steps -->
            <div class="text-center">
                <p class="text-gray-600 mb-6">Hemos enviado los detalles de tu pedido a tu correo electrónico.</p>
                <router-link to="/" class="btn btn-primary">Volver al inicio</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import usePay from '@/composables/usePay';

const { useShowPedidoByIdPedidoFn } = usePay()
const { data: pedidoDetail } = useShowPedidoByIdPedidoFn()

// Scroll to top when component mounts
onMounted(() => {
    window.scrollTo(0, 0);
});
</script>
