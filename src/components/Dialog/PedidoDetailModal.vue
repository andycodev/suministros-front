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
                                <th>Transacción / Voucher</th>
                                <th>Método</th>
                                <th>Fecha</th>
                                <!-- <th class="text-center">Estado</th> -->
                                <th class="text-right">Monto</th>
                                <!-- <th class="text-center">Acciones</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="pago in data?.pagos" :key="pago.id_pago">
                                <td>
                                    <div class="flex flex-col">
                                        <span class="font-mono text-[10px] opacity-50">{{ pago.transaccion_id }}</span>

                                        <div v-if="pago.raw_response?.nro_voucher_original">
                                            <template v-if="pago.url_completa_comprobante">
                                                <a :href="pago.url_completa_comprobante" target="_blank"
                                                    class="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.823a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.101-1.101" />
                                                    </svg>
                                                    Voucher: {{ pago.raw_response.nro_voucher_original }}
                                                </a>
                                            </template>
                                            <template v-else>
                                                <span class="text-xs font-bold opacity-70">
                                                    Voucher: {{ pago.raw_response.nro_voucher_original }}
                                                </span>
                                            </template>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="flex flex-col">
                                        <span class="font-bold">{{ pago.metodo_pago }}</span>
                                        <span v-if="pago.raw_response?.card" class="text-[10px] opacity-70">
                                            {{ pago.raw_response.brand }}: {{ pago.raw_response.card }}
                                        </span>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap">{{ new Date(pago.fecha_pago).toLocaleString() }}</td>

                                <!-- <td class="text-center">
                                    <span class="badge badge-xs font-bold" :class="{
                                        'badge-success': pago.estado_visanet === 'COMPLETADO',
                                        'badge-warning': pago.estado_visanet === 'PENDIENTE',
                                        'badge-error': pago.estado_visanet === 'RECHAZADO'
                                    }">
                                        {{ pago.estado_visanet }}
                                    </span>
                                </td> -->

                                <td class="text-right font-bold text-success">S/{{ pago.monto }}</td>

                                <!-- <td class="text-center">
                                    <a v-if="pago.url_completa_comprobante" :href="pago.url_completa_comprobante"
                                        target="_blank" class="btn btn-ghost btn-xs text-info tooltip"
                                        data-tip="Ver Comprobante">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </a>
                                    <span v-else class="opacity-20">-</span>
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