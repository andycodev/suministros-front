<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-6">Mis Pedidos</h1>

        <!-- Barra de acciones masivas -->
        <div v-if="selectedPedidos.length > 0" class="card bg-primary/5 border border-primary/20 mb-6">
            <div class="card-body p-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <span class="text-sm font-medium">
                            {{ selectedPedidos.length }} pedidos seleccionados
                        </span>
                        <span class="text-sm text-base-content/60">
                            Total a pagar: <span class="font-bold text-primary">S/ {{ totalSelected.toFixed(2) }}</span>
                        </span>
                    </div>
                    <button class="btn btn-primary btn-sm" @click="openMassivePaymentModal">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Pagar Masivo
                    </button>
                </div>
            </div>
        </div>
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
                                <th class="text-center w-10">
                                    <input type="checkbox" class="checkbox checkbox-xs" @change="toggleSelectAll"
                                        :checked="allSelected">
                                </th>
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
                                <td class="text-center">
                                    <input type="checkbox" class="checkbox checkbox-xs" :value="pedido.id_pedido"
                                        v-model="selectedPedidos"
                                        :disabled="pedido.estado === 'ANULADO' || pedido.estado === 'ENTREGADO' || pedido.saldo_pendiente <= 0">
                                </td>
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

    <!-- Modal de Pago Masivo -->
    <div v-if="massivePaymentModalOpen" class="modal modal-open">
        <div class="modal-box max-w-4xl">
            <h3 class="font-bold text-lg mb-4">Pago Masivo de Pedidos</h3>

            <!-- Formulario de pago -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-medium">Número de Operación</span>
                    </label>
                    <input type="text" v-model="paymentForm.nro_operacion" class="input input-bordered input-sm"
                        placeholder="Ej: 123456789">
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-medium">Monto Total del Voucher</span>
                    </label>
                    <input type="number" v-model="paymentForm.monto_total_voucher" class="input input-bordered input-sm"
                        placeholder="0.00" step="0.01">
                </div>

                <div class="form-control md:col-span-2">
                    <label class="label">
                        <span class="label-text font-medium">Comprobante de Pago (Opcional)</span>
                    </label>
                    <input type="file" @change="handleFileUpload" class="file-input file-input-bordered file-input-sm"
                        accept=".jpg,.jpeg,.png,.pdf">
                </div>
            </div>

            <!-- Lista de pedidos seleccionados con montos editables -->
            <div class="mb-6">
                <h4 class="font-semibold mb-3">Distribución de Pagos</h4>
                <div class="max-h-60 overflow-y-auto">
                    <div v-for="pedido in selectedPedidosData" :key="pedido.id_pedido"
                        class="flex items-center gap-4 p-3 bg-base-100 rounded-lg mb-2 border">

                        <div class="flex-1">
                            <div class="font-medium">{{ pedido.codigo }}</div>
                            <div class="text-sm text-base-content/60">
                                {{ pedido.persona.nombres }} {{ pedido.persona.ap_paterno }}
                            </div>
                            <div class="text-xs text-warning">
                                Saldo pendiente: S/ {{ pedido.saldo_pendiente.toFixed(2) }}
                            </div>
                        </div>

                        <div class="w-32">
                            <label class="label">
                                <span class="label-text-alt">Monto a pagar</span>
                            </label>
                            <input type="number" v-model="pedido.monto_a_pagar"
                                class="input input-bordered input-sm w-full" placeholder="0.00" step="0.01" min="0.01"
                                :max="pedido.saldo_pendiente">
                        </div>
                    </div>
                </div>

                <!-- Resumen -->
                <div class="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div class="flex justify-between items-center">
                        <span class="font-semibold">Total a distribuir:</span>
                        <span class="text-lg font-bold text-primary">
                            S/ {{ totalDistribuido.toFixed(2) }}
                        </span>
                    </div>
                    <div v-if="diferencia !== 0" class="mt-2 text-sm"
                        :class="diferencia > 0 ? 'text-error' : 'text-warning'">
                        {{ diferencia > 0 ? 'Falta repartir' : 'Excede' }}: S/ {{ Math.abs(diferencia).toFixed(2) }}
                    </div>
                </div>
            </div>

            <!-- Acciones -->
            <div class="modal-action">
                <button class="btn btn-ghost" @click="closeMassivePaymentModal">Cancelar</button>
                <button class="btn btn-primary" @click="processMassivePayment" :disabled="!isFormValid || isProcessing">
                    <span v-if="isProcessing" class="loading loading-spinner loading-sm"></span>
                    {{ isProcessing ? 'Procesando...' : 'Confirmar Pago' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BadgeTipoPedido from '@/components/shared/BadgeTipoPedido.vue';
import BadgeTiposuscripcionPedido from '@/components/shared/BadgeTiposuscripcionPedido.vue';
import BadgeEstadoPedido from '@/components/shared/BadgeEstadoPedido.vue';
import PedidoDetailModal from '@/components/Dialog/PedidoDetailModal.vue';
import useMassivePayments from '@/composables/useMassivePayments';
import { payMassiveFn } from '@/services/masssive-payments.service';

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
    saldo_pendiente: number;
    estado: string;
}

const { filters, useGetMisPedidosPagos } = useMassivePayments();

const { data: misPedidosPagos, isPending: isPendingMisPedidosPagos } = useGetMisPedidosPagos();

// Selección de pedidos
const selectedPedidos = ref<number[]>([]);

// Modal de pago masivo
const massivePaymentModalOpen = ref(false);
const paymentForm = ref({
    nro_operacion: '',
    monto_total_voucher: 0,
    comprobante_pago: null as File | null
});
const selectedPedidosData = ref<any[]>([]);
const isProcessing = ref(false);

// Computed properties
const allSelected = computed(() => {
    if (!misPedidosPagos.value) return false;
    const eligiblePedidos = misPedidosPagos.value.filter((p: Pedido) =>
        p.estado !== 'ANULADO' && p.estado !== 'ENTREGADO' && p.saldo_pendiente > 0
    );
    return eligiblePedidos.length > 0 && selectedPedidos.value.length === eligiblePedidos.length;
});

const totalSelected = computed(() => {
    return selectedPedidos.value.reduce((total, pedidoId) => {
        const pedido = misPedidosPagos.value?.find((p: Pedido) => p.id_pedido === pedidoId);
        return total + (pedido?.saldo_pendiente || 0);
    }, 0);
});

const totalDistribuido = computed(() => {
    return selectedPedidosData.value.reduce((total, pedido) => {
        return total + (Number(pedido.monto_a_pagar) || 0);
    }, 0);
});

const diferencia = computed(() => {
    return Number(paymentForm.value.monto_total_voucher) - totalDistribuido.value;
});

const isFormValid = computed(() => {
    return paymentForm.value.nro_operacion.trim() !== '' &&
        paymentForm.value.monto_total_voucher > 0 &&
        selectedPedidosData.value.length > 0 &&
        selectedPedidosData.value.every(p => p.monto_a_pagar > 0) &&
        diferencia.value === 0; // El total debe cuadrar exactamente
});

// Métodos
const toggleSelectAll = () => {
    if (!misPedidosPagos.value) return;

    const eligiblePedidos = misPedidosPagos.value.filter((p: Pedido) =>
        p.estado !== 'ANULADO' && p.estado !== 'ENTREGADO' && p.saldo_pendiente > 0
    );

    if (allSelected.value) {
        selectedPedidos.value = [];
    } else {
        selectedPedidos.value = eligiblePedidos.map((p: Pedido) => p.id_pedido);
    }
};

const openMassivePaymentModal = () => {
    massivePaymentModalOpen.value = true;
    // Inicializar formulario de pago
    paymentForm.value = {
        nro_operacion: '',
        monto_total_voucher: totalSelected.value,
        comprobante_pago: null
    };

    // Preparar datos de pedidos seleccionados con montos a pagar
    selectedPedidosData.value = selectedPedidos.value.map(pedidoId => {
        const pedido = misPedidosPagos.value?.find((p: Pedido) => p.id_pedido === pedidoId);
        return {
            ...pedido,
            monto_a_pagar: pedido?.saldo_pendiente || 0
        };
    });
};

const closeMassivePaymentModal = () => {
    massivePaymentModalOpen.value = false;
    paymentForm.value = {
        nro_operacion: '',
        monto_total_voucher: 0,
        comprobante_pago: null
    };
    selectedPedidosData.value = [];
};

const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        paymentForm.value.comprobante_pago = target.files[0];
    }
};

const processMassivePayment = async () => {
    if (!isFormValid.value) return;

    isProcessing.value = true;

    try {
        const distribucion = selectedPedidosData.value.map(pedido => ({
            id_pedido: pedido.id_pedido,
            monto: pedido.monto_a_pagar
        }));

        const formData = new FormData();
        formData.append('nro_operacion', paymentForm.value.nro_operacion);
        formData.append('monto_total_voucher', paymentForm.value.monto_total_voucher.toString());

        if (paymentForm.value.comprobante_pago) {
            formData.append('comprobante_pago', paymentForm.value.comprobante_pago);
        }

        distribucion.forEach((item, index) => {
            formData.append(`distribucion[${index}][id_pedido]`, item.id_pedido.toString());
            formData.append(`distribucion[${index}][monto]`, item.monto.toString());
        });

        const result = await payMassiveFn(formData);

        // Éxito
        console.log('Pago masivo exitoso:', result);

        // Limpiar selección y cerrar modal
        selectedPedidos.value = [];
        closeMassivePaymentModal();

        // Refrescar datos
        // Aquí podrías agregar una notificación de éxito

    } catch (error) {
        console.error('Error en pago masivo:', error);
        // Aquí podrías agregar una notificación de error
    } finally {
        isProcessing.value = false;
    }
};

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