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

                    <!-- Modalidad -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Modalidad</span>
                        </label>
                        <select v-model="filters.modalidad" class="select select-bordered select-sm w-full"
                            @change="() => refetchMisPedidos()">
                            <option value="">Todos</option>
                            <!--  <option disabled :value="null" :selected="filters.modalidad == null">Seleccione el
                                modalidad</option> -->
                            <option v-for="modalidadPedido in modalidadPedidos" :key="modalidadPedido.id"
                                :value="modalidadPedido.value">
                                {{ modalidadPedido.nombre }}
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
        <div class="card bg-base-100 shadow-sm">
            <div class="card-body p-0">
                <div class="overflow-x-auto">
                    <table class="table table-zebra table-sm">
                        <thead>
                            <tr class="bg-base-200">
                                <th class="text-center">N°</th>
                                <th class="text-center">Código</th>
                                <th class="text-left">Solicitante</th>
                                <th class="text-left">Destinatario</th>
                                <th class="text-center">Total</th>
                                <th class="text-center">Tipo</th>
                                <th class="text-center">Modalidad</th>
                                <th class="text-center">Estado</th>
                                <th class="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="isPendingMisPedidos">
                                <td colspan="6" class="text-center py-8">
                                    <span class="loading loading-spinner loading-md"></span>
                                    <span class="ml-2">Cargando...</span>
                                </td>
                            </tr>
                            <tr v-else-if="!misPedidos?.length">
                                <td colspan="6" class="text-center py-8 text-base-content/60">
                                    No se encontraron pedidos
                                </td>
                            </tr>
                            <tr v-else v-for="(pedido, index) in misPedidos" :key="pedido.id_pedido" class="hover">
                                <th class="font-normal text-center">{{ Number(index) + 1 }}</th>
                                <td class="font-mono font-bold text-primary text-center">
                                    {{ pedido.codigo }}
                                </td>
                                <td>
                                    {{ pedido.persona.nombres }} {{ pedido.persona.ap_paterno }}
                                </td>
                                <td>
                                    <span
                                        v-if="pedido.tipo === 'I' && pedido.modalidad === 'V' && pedido.id_persona === pedido.destino?.id_persona">
                                        {{ pedido.destino?.iglesia?.nombre }}
                                    </span>
                                    <span v-else>
                                        {{ pedido.destino?.nombres }} {{ pedido.destino?.ap_paterno }}
                                    </span>
                                </td>
                                <td class="text-center font-semibold">
                                    ${{ pedido.total_monto }}
                                </td>
                                <td class="text-center">
                                    <BadgeTipoPedido :tipo="pedido.tipo" />
                                </td>
                                <td class="text-center">
                                    <BadgeModalidadPedido :modalidad="pedido.modalidad" />
                                </td>
                                <td class="text-center">
                                    <BadgeEstadoPedido :estado="pedido.estado" />
                                </td>
                                <td class="text-center">
                                    <button class="btn btn-primary btn-xs" @click.prevent="openModal(pedido, 'detail')">
                                        Detalles
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
import { ref, watch } from 'vue';
import useReport from '@/composables/useReport';
import BadgeTipoPedido from '@/components/shared/BadgeTipoPedido.vue';
import BadgeModalidadPedido from '@/components/shared/BadgeModalidadPedido.vue';
import BadgeEstadoPedido from '@/components/shared/BadgeEstadoPedido.vue';
import PedidoDetailModal from '@/components/Dialog/PedidoDetailModal.vue';

const { filters, useGetMisPedidos, tipoPedidos, modalidadPedidos, estadoPedidos } = useReport();

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
</script>