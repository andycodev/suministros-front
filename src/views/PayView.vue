<template>
    <div class="max-w-4xl mx-auto p-6 space-y-6">

        <!-- CARD PRINCIPAL -->
        <div class="card bg-base-100 shadow-md border border-base-300">
            <div class="card-body space-y-6">

                <!-- ALERTA -->
                <div role="alert" class="alert alert-info alert-outline">
                    <span>
                        Te encuentras en el proceso de finalizar tu pedido. Revisa la información y elige tu método de
                        pago.
                    </span>
                </div>

                <!-- HEADER DEL PEDIDO -->
                <div class="flex flex-col gap-1">
                    <h2 class="text-2xl font-bold">
                        Pedido #{{ pedidoDetail?.codigo }}
                    </h2>
                    <p class="text-sm opacity-70">
                        Realizado el: {{ new Date(pedidoDetail?.created_at).toLocaleString() }}
                    </p>
                </div>

                <!-- GRID INFO + MÉTODOS DE PAGO -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <!-- INFO DEL CLIENTE -->
                    <div class="md:col-span-1 p-4 bg-base-200 rounded-xl space-y-1">
                        <h3 class="font-semibold">Cliente</h3>
                        <p>{{ pedidoDetail?.persona.nombres }} {{ pedidoDetail?.persona.ap_paterno }}</p>
                        <p class="text-sm opacity-70">{{ pedidoDetail?.persona.email }}</p>
                        <p class="text-sm opacity-70">{{ pedidoDetail?.persona.telefono }}</p>
                    </div>

                    <!-- INFO DEL PEDIDO -->
                    <div class="md:col-span-1 p-4 bg-base-200 rounded-xl space-y-1">
                        <h3 class="font-semibold">Resumen</h3>
                        <span class="badge badge-primary badge-lg">{{ pedidoDetail?.estado }}</span>
                        <p class="text-sm mt-2">
                            Ítems: <strong>{{ pedidoDetail?.total_cantidad }}</strong>
                        </p>
                        <p class="text-sm">
                            Total:
                            <strong class="text-success text-lg">S/ {{ pedidoDetail?.total_monto }}</strong>
                        </p>
                    </div>

                    <!-- MÉTODOS DE PAGO -->
                    <div class="md:col-span-1 p-4 bg-base-200 rounded-xl space-y-3">
                        <h3 class="font-semibold">Método de Pago</h3>

                        <!-- VISA -->
                        <button class="btn btn-primary w-full flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 10h18M3 14h18M7 6h10M7 18h10" />
                            </svg>
                            VisaNet
                        </button>

                        <!-- PAGO EFECTIVO -->
                        <button class="btn btn-warning w-full flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2" />
                            </svg>
                            PagoEfectivo
                        </button>
                    </div>

                </div>

                <!-- TABLA DETALLE -->
                <div>
                    <h3 class="text-xl font-bold mb-4">Detalle del Pedido</h3>

                    <div class="overflow-x-auto">
                        <table class="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Material</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unit.</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(d, i) in pedidoDetail?.detalles" :key="d.id_detalle">
                                    <td>{{ i + 1 }}</td>
                                    <td>
                                        <div class="font-semibold">{{ d.material.nombre }}</div>
                                        <div class="text-xs opacity-70">{{ d.material.descripcion }}</div>
                                    </td>
                                    <td>{{ d.cantidad }}</td>
                                    <td>S/ {{ d.precio_unit }}</td>
                                    <td class="font-semibold">S/ {{ d.subtotal }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- TOTAL -->
                <div class="text-right">
                    <p class="text-lg font-semibold">
                        Total:
                        <span class="text-success text-xl">S/ {{ pedidoDetail?.total_monto }}</span>
                    </p>
                </div>

                <!-- BOTONES -->
                <div class="flex flex-col md:flex-row justify-between gap-4 pt-4">

                    <router-link to="/order" class="btn btn-outline flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Realizar otro pedido
                    </router-link>

                    <button class="btn btn-error btn-outline flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Eliminar pedido
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import usePay from '@/composables/usePay';
const { useShowPedidoByIdPedidoFn } = usePay()
const { data: pedidoDetail } = useShowPedidoByIdPedidoFn()
</script>
