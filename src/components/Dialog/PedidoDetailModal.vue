<template>
    <div v-if="dialogOpen" class="modal modal-open">
        <div class="modal-box w-11/12 max-w-4xl">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-primary">Detalle del Pedido: {{ data?.codigo }}</h3>
                <BadgeEstadoPedido :estado="data?.estado" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-base-200 p-4 rounded-lg">
                <div>
                    <p class="text-xs uppercase opacity-60">Solicitante</p>
                    <p class="font-bold">{{ data?.persona?.nombres }} {{ data?.persona?.ap_paterno }}</p>
                    <p class="text-sm">{{ data?.persona?.email }}</p>
                </div>
                <div>
                    <p class="text-xs uppercase opacity-60">Destino</p>
                    <span
                        v-if="data?.tipo === 'I' && data?.tipo_suscripcion === 'F' && data?.id_persona === data?.destino?.id_persona">
                        <p class="font-bold">{{ data?.destino?.iglesia?.nombre }}</p>
                        <p class="text-sm">Iglesia</p>
                    </span>
                    <span v-else>
                        <p class="font-bold">{{ data?.destino?.nombres }} {{ data?.destino?.ap_paterno }}</p>
                        <p class="text-sm">{{ data?.destino?.direccion }}</p>
                    </span>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="table table-sm w-full border">
                    <thead>
                        <tr class="bg-base-300 text-base-content">
                            <th>Material</th>
                            <th class="text-center">Cant.</th>
                            <th class="text-right">Precio Unit.</th>
                            <th class="text-right">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="detalle in data?.detalles" :key="detalle.id_detalle">
                            <td>
                                <div class="font-bold">{{ detalle.material.nombre }}</div>
                                <div class="text-xs opacity-50">{{ detalle.material.descripcion }}</div>
                            </td>
                            <td class="text-center">{{ detalle.cantidad }}</td>
                            <td class="text-right">S/{{ detalle.precio_unit }}</td>
                            <td class="text-right font-semibold">S/{{ detalle.subtotal }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" class="text-right font-bold text-lg">Total:</td>
                            <td class="text-right font-bold text-lg text-primary">S/{{ data?.total_monto }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="mt-8">
                <h4 class="text-lg font-semibold mb-3 border-b pb-2 flex items-center gap-2">
                    Historial de Pagos
                    <span class="badge badge-sm badge-ghost">{{ data?.pagos?.length }}</span>
                </h4>

                <div class="overflow-x-auto">
                    <table class="table table-xs w-full">
                        <thead>
                            <tr class="bg-base-200">
                                <th>Código de transacción</th>
                                <th>Método</th>
                                <th>Fecha</th>
                                <th class="text-right">Monto</th>
                                <!-- <th class="text-center">Estado</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="pago in data?.pagos" :key="pago.id_pago">
                                <td class="font-mono text-xs">{{ pago.transaccion_id }}</td>
                                <td>
                                    <div class="flex flex-col">
                                        <span class="font-bold">{{ pago.metodo_pago }}</span>
                                        <span v-if="pago.raw_response?.card" class="text-[10px] opacity-70">
                                            {{ pago.raw_response.brand }}: {{ pago.raw_response.card }}
                                        </span>
                                    </div>
                                </td>
                                <td>{{ new Date(pago.fecha_pago).toLocaleString() }}</td>
                                <td class="text-right font-bold text-success">S/{{ pago.monto }}</td>
                                <!-- <td class="text-center">
                                    <span class="badge badge-outline badge-xs"
                                        :class="pago.estado_visanet === 'COMPLETADO' || pago.estado_visanet === 'AUTORIZADO' ? 'badge-success' : 'badge-error'">
                                        {{ pago.estado_visanet }}
                                    </span>
                                </td> -->
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="flex flex-col items-end mt-4 p-3 bg-base-200 rounded-lg">
                    <div class="flex justify-between w-full max-w-[200px] text-sm">
                        <span>Total Pagado:</span>
                        <span class="font-bold text-success">S/{{ data?.total_pagado }}</span>
                    </div>
                    <div class="flex justify-between w-full max-w-[200px] text-sm">
                        <span>Saldo Pendiente:</span>
                        <span class="font-bold" :class="data?.saldo_pendiente > 0 ? 'text-error' : 'text-success'">
                            S/{{ data?.saldo_pendiente }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="modal-action">
                <button class="btn btn-outline" @click="cerrarModal">Cerrar</button>
            </div>
        </div>
        <div class="modal-backdrop" @click="cerrarModal"></div>
    </div>
</template>

<script setup>
import BadgeEstadoPedido from '@/components/shared/BadgeEstadoPedido.vue';

const props = defineProps({
    dialogOpen: Boolean,
    data: Object
});

const emit = defineEmits(['close-modal']);
const cerrarModal = () => emit('close-modal', true);
</script>