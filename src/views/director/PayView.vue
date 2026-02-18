<template>
    <div class="max-w-4xl mx-auto p-6 space-y-6">
        <!-- Modal para pago con tarjeta -->
        <div class="modal" :class="{ 'modal-open': showCardModal }">
            <div class="modal-box">
                <h3 class="font-bold text-lg mb-4">Pago con Tarjeta</h3>
                <div class="space-y-4">
                    <div>
                        <label class="label">
                            <span class="label-text">Número de tarjeta</span>
                        </label>
                        <input type="text" v-model="cardNumber" placeholder="1234 5678 9012 3456"
                            class="input input-bordered w-full" />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="label">
                                <span class="label-text">Fecha de vencimiento</span>
                            </label>
                            <input type="text" v-model="cardExpiry" placeholder="MM/YY"
                                class="input input-bordered w-full" />
                        </div>
                        <div>
                            <label class="label">
                                <span class="label-text">CVV</span>
                            </label>
                            <input type="text" v-model="cardCvv" placeholder="123"
                                class="input input-bordered w-full" />
                        </div>
                    </div>
                    <div>
                        <label class="label">
                            <span class="label-text">Nombre del titular</span>
                        </label>
                        <input type="text" v-model="cardName" placeholder="Como aparece en la tarjeta"
                            class="input input-bordered w-full" />
                    </div>
                </div>
                <div class="modal-action">
                    <button class="btn btn-ghost" @click="showCardModal = false">Cancelar</button>
                    <button class="btn btn-primary" @click="processCardPayment">Pagar S/ {{ pedidoDetail?.total_monto
                    }}</button>
                </div>
            </div>
        </div>

        <!-- Modal para pago en efectivo -->
        <div class="modal" :class="{ 'modal-open': showCashModal }">
            <div class="modal-box">
                <h3 class="font-bold text-lg mb-4">Pago en Efectivo</h3>
                <div class="space-y-4">
                    <div class="bg-yellow-50 p-4 rounded-lg">
                        <p class="text-yellow-800">Por favor, acércate a caja para realizar el pago en efectivo.</p>
                        <p class="text-yellow-800 mt-2">Código de pago:</p>
                        <div class="text-2xl font-bold text-center my-4 p-3 bg-yellow-100 rounded">
                            {{ paymentCode }}
                        </div>
                        <p class="text-sm text-yellow-700">Muestra este código al momento de pagar.</p>
                    </div>
                </div>
                <div class="modal-action">
                    <button class="btn btn-ghost" @click="showCashModal = false">Cerrar</button>
                    <button class="btn btn-primary" @click="confirmCashPayment">Confirmar Pago</button>
                </div>
            </div>
        </div>

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
                        <p>{{ pedidoDetail?.destino.nombres }} {{ pedidoDetail?.destino.ap_paterno }}</p>
                        <p class="text-sm opacity-70">{{ pedidoDetail?.destino.email }}</p>
                        <p class="text-sm opacity-70">{{ pedidoDetail?.destino.telefono }}</p>
                    </div>

                    <!-- INFO DEL PEDIDO -->
                    <div class="md:col-span-1 p-4 bg-base-200 rounded-xl space-y-1">
                        <h3 class="font-semibold mb-2">Estado del Pedido</h3>
                        <div class="badge badge-soft badge-success">
                            {{ pedidoDetail?.estado }}
                        </div>
                        <h3 class="font-semibold mb-2">Tipo de Pedido</h3>
                        <div class="badge badge-soft"
                            :class="pedidoDetail?.tipo == 'P' ? 'badge-primary' : 'badge-warning'">
                            {{
                                pedidoDetail?.tipo == 'P' ? 'PERSONAL' :
                                    'IGLESIA' }}
                        </div>
                        <h3 class="font-semibold mb-2">Tipo Suscripción</h3>
                        <div class="badge badge-soft"
                            :class="pedidoDetail?.tipo_suscripcion == 'P' ? 'badge-accent' : 'badge-secondary'">
                            {{
                                pedidoDetail?.tipo_suscripcion == 'F' ? 'FISICO' :
                                    'VIRTUAL' }}
                        </div>
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
                        <button @click="showCardModal = true" class="btn btn-primary w-full flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 10h18M3 14h18M7 6h10M7 18h10" />
                            </svg>
                            VisaNet
                        </button>

                        <!-- PAGO EFECTIVO -->
                        <button @click="initCashPayment" class="btn btn-warning w-full flex items-center gap-2">
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
                                    <td>{{ Number(i) + 1 }}</td>
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

                    <router-link to="/director/order" class="btn btn-outline flex items-center gap-2">
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import usePay from '@/composables/usePay';

const router = useRouter();
const { useShowPedidoByIdPedidoFn } = usePay()
const { data: pedidoDetail } = useShowPedidoByIdPedidoFn()

// Estados para el modal de tarjeta
const showCardModal = ref(false);
const cardNumber = ref('');
const cardExpiry = ref('');
const cardCvv = ref('');
const cardName = ref('');

// Estados para el modal de efectivo
const showCashModal = ref(false);
const paymentCode = ref('');

// Generar un código de pago aleatorio
const generatePaymentCode = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

// Iniciar pago en efectivo
const initCashPayment = () => {
    paymentCode.value = generatePaymentCode();
    showCashModal.value = true;
};

// Procesar pago con tarjeta
const processCardPayment = () => {
    // Simular validación de tarjeta
    if (!cardNumber.value || !cardExpiry.value || !cardCvv.value || !cardName.value) {
        alert('Por favor complete todos los campos');
        return;
    }

    // Simular procesamiento
    setTimeout(() => {
        showCardModal.value = false;
        // Redirigir a la página de confirmación
        if (pedidoDetail.value?.id_pedido) {
            router.push(`/order/confirmation/${pedidoDetail.value.id_pedido}`);
        }
    }, 1500);
};

// Confirmar pago en efectivo
const confirmCashPayment = () => {
    showCashModal.value = false;
    // Redirigir a la página de confirmación
    if (pedidoDetail.value?.id_pedido) {
        router.push(`/order/confirmation/${pedidoDetail.value.id_pedido}`);
    }
};
</script>
