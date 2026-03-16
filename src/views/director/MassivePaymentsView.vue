<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-6">Mis Pedidos</h1>
        <!-- Filtros -->
        <!-- <div class="card bg-base-100 shadow-sm mb-6">
            <div class="card-body">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Estado</span>
                        </label>
                        <select v-model="filters.estado" class="select select-bordered select-sm w-full"
                            @change="() => refetchMisPedidosPagos()">
                            <option value="">Todos</option>
                            <option v-for="estadoPedido in estadoPedidos" :key="estadoPedido.id"
                                :value="estadoPedido.value">
                                {{ estadoPedido.nombre }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div> -->
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
                                <th class="text-center">Resumen</th>
                                <th class="text-center">Tipo / Suscripción</th>
                                <th class="text-center">Estado</th>
                                <th class="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="isPendingMisPedidosPagos">
                                <td colspan="8" class="text-center py-12">
                                    <span class="loading loading-spinner loading-md text-primary"></span>
                                    <div class="text-xs mt-2 text-base-content/50 uppercase tracking-widest">Cargando
                                        pedidos...</div>
                                </td>
                            </tr>

                            <tr v-else-if="!misPedidosPagos?.length">
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

                            <tr v-else v-for="(pedido, index) in misPedidosPagos" :key="pedido.id_pedido"
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

                                <td class="text-center">
                                    <div class="flex flex-col items-center gap-0.5">
                                        <div class="flex items-baseline gap-1">
                                            <span
                                                class="text-[10px] text-base-content/40 font-bold uppercase">Total</span>
                                            <span class="font-bold text-sm">S/ {{ Number(pedido.total_monto).toFixed(2)
                                                }}</span>
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
                                    </div>
                                </td>

                                <td class="text-center">
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BadgeTipoPedido from '@/components/shared/BadgeTipoPedido.vue';
import BadgeTiposuscripcionPedido from '@/components/shared/BadgeTiposuscripcionPedido.vue';
import BadgeEstadoPedido from '@/components/shared/BadgeEstadoPedido.vue';
import PedidoDetailModal from '@/components/Dialog/PedidoDetailModal.vue';
import useMassivePayments from '@/composables/useMassivePayments';

// Type definitions
interface Persona {
    nombres: string;
    ap_paterno: string;
}

interface Destino {
    id_persona: number;
    nombres?: string;
    ap_paterno?: string;
    iglesia?: {
        nombre: string;
    };
}

interface Pedido {
    id_pedido: number;
    codigo: string;
    persona: Persona;
    destino: Destino;
    tipo: string;
    tipo_suscripcion: string;
    id_persona: number;
    id_periodo: string;
    total_monto: number;
    estado: string;
}

const { filters, useGetMisPedidosPagos } = useMassivePayments();

const { data: misPedidosPagos, isPending: isPendingMisPedidosPagos } = useGetMisPedidosPagos();

/* Modal */
const dialogOpen = ref(false);
const modalType = ref('');
const data = ref<Pedido | {}>({});

const openModal = (datos: Pedido, action: string) => {
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
</script>