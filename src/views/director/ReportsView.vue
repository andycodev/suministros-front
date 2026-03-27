<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-6">Mis Pedidos</h1>
        <!-- Filtros -->
        <div class="card bg-base-100 shadow-sm mb-6">
            <div class="card-body">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <!-- Tipo -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Tipo</span>
                        </label>
                        <select v-model="filters.tipo" class="select select-bordered select-sm w-full"
                            @change="() => refetchMisPedidos()">
                            <option value="">Todos</option>
                            <!-- <option disabled :value="null" :selected="filters.tipo == null">Seleccione el
                                tipo</option> -->
                            <option v-for="tipoPedido in tipoPedidos" :key="tipoPedido.id" :value="tipoPedido.value">
                                {{ tipoPedido.nombre }}
                            </option>
                        </select>
                    </div>

                    <!-- Tiposuscripcion -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Tiposuscripcion</span>
                        </label>
                        <select v-model="filters.tipo_suscripcion" class="select select-bordered select-sm w-full"
                            @change="() => refetchMisPedidos()">
                            <option value="">Todos</option>
                            <!--  <option disabled :value="null" :selected="filters.tipo_suscripcion == null">Seleccione el
                                tipo_suscripcion</option> -->
                            <option v-for="tiposuscripcionPedido in tiposuscripcionPedidos"
                                :key="tiposuscripcionPedido.id" :value="tiposuscripcionPedido.value">
                                {{ tiposuscripcionPedido.nombre }}
                            </option>
                        </select>
                    </div>

                    <!-- Estado -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Estado</span>
                        </label>
                        <select v-model="filters.estado" class="select select-bordered select-sm w-full"
                            @change="() => refetchMisPedidos()">
                            <option value="">Todos</option>
                            <!--  <option disabled :value="null" :selected="filters.estado == null">Seleccione el
                                estado</option> -->
                            <option v-for="estadoPedido in estadoPedidos" :key="estadoPedido.id"
                                :value="estadoPedido.value">
                                {{ estadoPedido.nombre }}
                            </option>
                        </select>
                    </div>

                    <!-- Código -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Código</span>
                        </label>
                        <input v-model="filters.codigo" type="text" placeholder="Buscar código..."
                            class="input input-bordered input-sm w-full" @input="debouncedRefetch" />
                    </div>
                    <!-- 
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">&nbsp;</span>
                        </label>
                        <button class="btn btn-neutral btn-sm w-full">
                            Filtrar
                        </button>
                    </div> -->
                </div>
            </div>
        </div>
        <!-- Tabla -->
        <div class="card bg-base-100 shadow-sm border border-base-200">
            <div class="card-body p-0">
                <div class="overflow-x-auto">
                    <table class="table table-zebra table-sm">
                        <thead>
                            <tr class="bg-base-200 text-base-content/70">
                                <th class="text-center w-10">N°</th>
                                <th class="text-center">Código</th>
                                <th class="text-left">Solicitante / Destinatario</th>
                                <th class="text-center">Periodo</th>
                                <th class="text-right">Resumen Financiero</th>
                                <th class="text-center">Tipo / Suscripción</th>
                                <th class="text-center">Estado</th>
                                <th class="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="isPendingMisPedidos">
                                <td colspan="8" class="text-center py-12">
                                    <span class="loading loading-spinner loading-md text-primary"></span>
                                    <div class="text-xs mt-2 text-base-content/50 uppercase tracking-widest">Cargando
                                        pedidos...</div>
                                </td>
                            </tr>

                            <tr v-else-if="!misPedidos?.length">
                                <td colspan="8" class="text-center py-12 text-base-content/60">
                                    <div class="flex flex-col items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 opacity-20" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                        <span>No se encontraron pedidos registrados</span>
                                    </div>
                                </td>
                            </tr>

                            <tr v-else v-for="(pedido, index) in misPedidos" :key="pedido.id_pedido"
                                class="hover transition-colors">
                                <th class="font-normal text-center text-base-content/50">{{ Number(index) + 1 }}</th>

                                <td class="text-center">
                                    <span
                                        class="font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded text-xs">
                                        {{ pedido.codigo }}
                                    </span>
                                </td>

                                <td class="py-3">
                                    <div class="flex flex-col">
                                        <span class="font-medium">{{ pedido.persona.nombres }} {{
                                            pedido.persona.ap_paterno }}</span>
                                        <span class="text-[10px] text-base-content/50 flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                            </svg>
                                            <template
                                                v-if="pedido.tipo === 'I' && pedido.tipo_suscripcion === 'F' && pedido.id_persona === pedido.destino?.id_persona">
                                                Para: {{ pedido.destino?.iglesia?.nombre }}
                                            </template>
                                            <template v-else>
                                                Para: {{ pedido.destino?.nombres }} {{ pedido.destino?.ap_paterno }}
                                            </template>
                                        </span>
                                    </div>
                                </td>

                                <td class="text-center font-medium">{{ pedido.id_periodo }}</td>

                                <td class="text-right">
                                    <div class="flex flex-col items-end gap-0.5">
                                        <div class="flex items-baseline gap-1">
                                            <span
                                                class="text-[10px] text-base-content/40 font-bold uppercase">Total</span>
                                            <span class="font-bold text-sm">S/ {{ Number(pedido.total_monto).toFixed(2)
                                                }}</span>
                                        </div>

                                        <div v-if="pedido.total_pagado > 0"
                                            class="flex flex-col items-end border-t border-base-200 mt-1 pt-1 w-24">
                                            <div class="flex justify-between w-full text-[10px]">
                                                <span class="text-success font-medium">Pagado:</span>
                                                <span class="text-success font-bold">S/ {{
                                                    Number(pedido.total_pagado).toFixed(2) }}</span>
                                            </div>
                                            <div v-if="pedido.saldo_pendiente > 0"
                                                class="flex justify-between w-full text-[10px]">
                                                <span class="text-error font-medium">Saldo:</span>
                                                <span class="text-error font-bold font-mono text-[11px]">S/ {{
                                                    Number(pedido.saldo_pendiente).toFixed(2)
                                                    }}</span>
                                            </div>
                                            <span class="text-[9px] text-base-content/40 italic">
                                                {{ pedido.pagos.length }} {{ pedido.pagos.length === 1 ? 'abono' :
                                                    'abonos' }}
                                            </span>
                                        </div>

                                        <div v-else
                                            class="text-[10px] text-warning bg-warning/5 px-2 rounded mt-1 border border-warning/20">
                                            Pendiente de pago
                                        </div>
                                    </div>
                                </td>

                                <td class="text-center">
                                    <div class="flex flex-col items-center gap-1">
                                        <BadgeTipoPedido :tipo="pedido.tipo" />
                                        <BadgeTiposuscripcionPedido :tipo_suscripcion="pedido.tipo_suscripcion" />
                                    </div>
                                </td>

                                <td class="text-center">
                                    <div class="flex flex-col items-center gap-2">
                                        <BadgeEstadoPedido :estado="pedido.estado" />

                                        <div class="w-16 bg-base-200 rounded-full h-1.5 overflow-hidden border border-base-300 shadow-inner"
                                            title="Progreso de pago">
                                            <div class="h-full transition-all duration-500"
                                                :class="pedido.saldo_pendiente <= 0 ? 'bg-success' : 'bg-primary'"
                                                :style="{ width: (pedido.total_pagado / pedido.total_monto * 100) + '%' }">
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td class="text-center">
                                    <div class="flex flex-col gap-1 items-center">
                                        <button class="btn btn-ghost btn-xs text-primary w-24 flex justify-start gap-2"
                                            @click.prevent="openModal(pedido, 'detail')">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Ver más
                                        </button>

                                        <button
                                            v-if="pedido.saldo_pendiente > 0 && !['ANULADO', 'ENTREGADO'].includes(pedido.estado)"
                                            class="btn btn-success btn-xs text-white w-24 flex justify-start gap-2 shadow-sm"
                                            @click.prevent="openModal(pedido, 'abono')">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Abonar
                                        </button>

                                        <div v-else-if="pedido.estado === 'PAGADO'"
                                            class="text-[9px] text-success font-bold flex items-center gap-1 opacity-70">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path fill-rule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                            COMPLETO
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <PedidoDetailModal v-if="dialogOpen && modalType == 'detail'" :dialogOpen="dialogOpen" :data="data" :key="modalType"
        @close-modal="closeModal"></PedidoDetailModal>
    <PedidoAbonoModal v-if="dialogOpen && modalType == 'abono'" :dialogOpen="dialogOpen" :data="data" :key="modalType"
        @close-modal="closeModal" @pago-exitoso="handlePagoExitoso"></PedidoAbonoModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import useReport from '@/composables/useReport';
import BadgeTipoPedido from '@/components/shared/BadgeTipoPedido.vue';
import BadgeTiposuscripcionPedido from '@/components/shared/BadgeTiposuscripcionPedido.vue';
import BadgeEstadoPedido from '@/components/shared/BadgeEstadoPedido.vue';
import PedidoDetailModal from '@/components/Dialog/PedidoDetailModal.vue';
import PedidoAbonoModal from '@/components/Dialog/PedidoAbonoModal.vue';

const { filters, useGetMisPedidos, tipoPedidos, tiposuscripcionPedidos, estadoPedidos } = useReport();

const { data: misPedidos, isPending: isPendingMisPedidos, refetch: refetchMisPedidos, isRefetching: isRefetchingMisPedidos } = useGetMisPedidos();


// Debounce para el campo de código
let timeoutId: NodeJS.Timeout;
const debouncedRefetch = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        refetchMisPedidos();
    }, 500);
};

/* Modal */
const dialogOpen = ref(false);
const modalType = ref('');
const data = ref({});

const openModal = (datos: any, action: any) => {
    dialogOpen.value = true;
    modalType.value = action;
    data.value = datos;
    console.log('dataModal: ', data.value);
    console.log('typeModal: ', modalType.value);
};

const closeModal = (cancel: any) => {
    dialogOpen.value = false;
    modalType.value = '';
    data.value = {};
    console.log('cancelar', cancel);
};

const handlePagoExitoso = async () => {
    // Refrescar los datos de la tabla
    await refetchMisPedidos();

    // Forzar actualización de estado reactivo
    setTimeout(() => {
        refetchMisPedidos();
    }, 500);
};
</script>