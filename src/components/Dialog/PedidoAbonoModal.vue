<template>
    <div v-if="dialogOpen" class="modal modal-open">
        <div class="modal-box w-11/12 max-w-lg">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-success flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Registrar Abono
                </h3>
                <button class="btn btn-sm btn-circle btn-ghost" @click="cerrarModal">✕</button>
            </div>

            <div class="bg-base-200 p-4 rounded-xl mb-6 flex justify-between items-center">
                <div>
                    <p class="text-xs uppercase opacity-60">Pedido</p>
                    <p class="font-mono font-bold text-primary">{{ data?.codigo }}</p>
                </div>
                <div class="text-right">
                    <p class="text-xs uppercase opacity-60">Saldo Pendiente</p>
                    <p class="text-lg font-bold text-error">S/ {{ data?.saldo_pendiente }}</p>
                </div>
            </div>

            <form @submit.prevent="handleSubmit">
                <div class="space-y-4">
                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text font-semibold">Monto a depositar</span>
                            <span class="label-text-alt text-primary cursor-pointer hover:underline"
                                @click="form.monto = data?.saldo_pendiente">
                                Cobrar todo
                            </span>
                        </label>
                        <div class="relative">
                            <span class="absolute left-4 top-3 font-bold opacity-50">S/</span>
                            <input type="number" step="0.01" v-model.number="form.monto" placeholder="0.00"
                                class="input input-bordered w-full pl-10 text-lg font-bold"
                                :class="{ 'input-error': errorMonto }" required />
                        </div>
                        <label v-if="errorMonto" class="label">
                            <span class="label-text-alt text-error font-medium">{{ errorMonto }}</span>
                        </label>
                    </div>

                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text font-semibold">Método de Pago</span>
                        </label>
                        <select v-model="form.metodo_pago" class="select select-bordered w-full" required>
                            <option value="EFECTIVO">💵 Efectivo</option>
                            <option value="YAPE">📱 Yape</option>
                            <option value="PLIN">🟣 Plin</option>
                            <option value="TRANSFERENCIA">🏦 Transferencia Bancaria</option>
                        </select>
                    </div>
                </div>

                <div class="modal-action mt-8">
                    <button type="button" class="btn btn-ghost" @click="cerrarModal" :disabled="loading">
                        Cancelar
                    </button>
                    <button type="submit" class="btn btn-success text-white px-8"
                        :disabled="loading || !!errorMonto || !form.monto">
                        <span v-if="loading" class="loading loading-spinner loading-xs"></span>
                        {{ loading ? 'Procesando...' : 'Confirmar Abono' }}
                    </button>
                </div>
            </form>
        </div>
        <div class="modal-backdrop" @click="cerrarModal"></div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';

const props = defineProps({
    dialogOpen: Boolean,
    data: Object, // Recibe el objeto pedido del array
    loading: Boolean // Para controlar el estado del botón desde el padre
});

const emit = defineEmits(['close-modal', 'submit-pago']);

// Estado del formulario
const form = reactive({
    id_pedido: null,
    monto: null,
    metodo_pago: 'EFECTIVO'
});

// Inicializar id cuando el modal abre
watch(() => props.dialogOpen, (newVal) => {
    if (newVal && props.data) {
        form.id_pedido = props.data.id_pedido;
        form.monto = null; // Limpiar monto previo
    }
});

// Validación reactiva del monto
const errorMonto = computed(() => {
    if (!form.monto) return null;
    if (form.monto <= 0) return 'El monto debe ser mayor a 0';
    if (form.monto > props.data?.saldo_pendiente) {
        return `No puede abonar más del saldo (Máx: S/ ${props.data.saldo_pendiente})`;
    }
    return null;
});

const cerrarModal = () => {
    if (!props.loading) emit('close-modal');
};

const handleSubmit = () => {
    if (errorMonto.value) return;

    // Emitimos el objeto tal cual lo necesitas para el backend
    emit('submit-pago', { ...form });
};
</script>