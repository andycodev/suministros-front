<template>
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="rounded-xl overflow-hidden border border-gray-100 max-w-6xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 p-6">
                <div class="col-span-1 space-y-5 p-6 border-r border-gray-100 md:border-gray-200">
                    <!-- <pre>{{ userData }}</pre> -->
                    <!-- <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Información del Pedido</h2> -->

                    <div v-if="userData" class="p-4 mb-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 class="font-semibold text-blue-800 mb-2">Director de Publicaciones</h3>
                        <p class="text-sm text-blue-600">
                            <strong>{{ userData.nombres }} {{ userData.ap_paterno }} {{ userData.ap_materno }}</strong>
                        </p>
                        <p class="text-xs text-blue-500 mt-1">Creando pedido para su cuenta</p>

                        <pre>{{ userData }}</pre>
                    </div>
                    <!--  <div class="flex justify-center my-8 -mt-12">
                        <fieldset class="form-control w-full max-w-sm">
                            <label class="label">
                                <span class="label-text text-sm font-medium text-gray-600">
                                    Periodo
                                </span>
                            </label>

                            <select v-model="periodoSeleccionado" class="select select-bordered w-full">
                                <option disabled selected>Seleccione el Periodo</option>
                                <option v-for="periodo in periodos" :key="periodo.id_periodo"
                                    :value="periodo.id_periodo">
                                    {{ periodo.id_periodo }} - {{ periodo.nombre }}
                                </option>
                            </select>
                        </fieldset>
                    </div> -->

                    <div v-if="idPeriodoSeleccionado">
                        <p>Periodo seleccionado: {{ idPeriodoSeleccionado }}</p>
                    </div>

                    <!-- Totalizador -->
                    <div v-if="totalItems > 0" class="p-4 mb-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
                        <div role="alert" class="alert alert-warning alert-soft">
                            <span>Guarda el pedido para conservar</span>
                        </div>
                        <div class="divider divider-neutral">Resumen del pedido</div>
                        <p class="text-sm text-gray-600">
                            <strong>Total de materiales:</strong> {{ totalItems }}
                        </p>

                        <p class="text-sm text-gray-600">
                            <strong>Monto total:</strong> S/. {{ totalPrecio.toFixed(2) }}
                        </p>

                        <div class="mt-3">
                            <button class="btn btn-sm btn-primary w-full" @click="enviarPedido()">
                                {{ isPendingCreatePedido ? 'Realizando pedido...' : 'Guardar y continuar' }}
                            </button>
                        </div>
                        <div v-if="messageSuccces" role="alert" class="alert alert-success alert-soft mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>¡Se ha realizado el pedido correctamente!</span>
                        </div>
                    </div>

                </div>

                <div class="col-span-1 md:col-span-2 space-y-6 p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-2xl font-bold text-gray-800">Materiales Disponibles</h2>
                    </div>

                    <div class="alert bg-gray-50 border border-gray-200 text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="stroke-current flex-shrink-0 w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                            <h3 class="font-bold">Información</h3>
                            <div class="text-xs">Seleccione los materiales que desea incluir en su pedido.</div>
                        </div>
                    </div>
                    <div class="w-full max-w-3xl mx-auto space-y-3">
                        <div v-if="isLoadingMaterialesIglesia || isLoadingPedidoDestino">Cargando ...</div>
                        <template v-if="pedidoTipoIglesia && (pedidoTipoIglesia?.id_destino === userData?.id_persona)">
                            <div class="max-w-4xl mx-auto p-6">
                                <!-- Header -->
                                <div class="card bg-base-100 shadow-xl mb-6 border border-base-300">
                                    <div class="card-body">
                                        <!-- ALERTA INFORMANDO -->
                                        <div role="alert" class="alert alert-warning alert-outline mb-4">
                                            <span>
                                                Tienes un pedido pendiente. Puedes revisar los detalles y continuar
                                                con el pago
                                                o eliminarlo.
                                            </span>
                                        </div>

                                        <!-- TÍTULO DEL PEDIDO -->
                                        <h2 class="card-title text-2xl font-bold">
                                            Pedido #{{ pedidoTipoIglesia.codigo }}
                                        </h2>

                                        <p class="text-sm opacity-70">
                                            Realizado el: {{ new Date(pedidoTipoIglesia.created_at).toLocaleString() }}
                                        </p>

                                        <!-- INFORMACIÓN -->
                                        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div class="p-4 bg-base-200 rounded-xl">
                                                <h3 class="font-semibold mb-2">Información del Solicitante</h3>
                                                <p>{{ pedidoTipoIglesia.persona?.nombres }} {{
                                                    pedidoTipoIglesia.persona?.ap_paterno }} {{
                                                        pedidoTipoIglesia.persona?.ap_materno }}</p>
                                                <p class="text-sm opacity-70">{{ pedidoTipoIglesia.persona?.email }}
                                                </p>
                                                <p class="text-sm opacity-70">{{ pedidoTipoIglesia.persona?.telefono }}
                                                </p>
                                                <div class="divider"></div>
                                                <h3 class="font-semibold mb-2">Información del Destinatario</h3>
                                                <p>{{ pedidoTipoIglesia.destino?.nombres }} {{
                                                    pedidoTipoIglesia.destino?.ap_paterno }} {{
                                                        pedidoTipoIglesia.destino?.ap_materno }}</p>
                                                <p class="text-sm opacity-70">{{ pedidoTipoIglesia.destino?.email }}
                                                </p>
                                                <p class="text-sm opacity-70">{{ pedidoTipoIglesia.destino?.telefono }}
                                                </p>
                                            </div>

                                            <div class="p-4 bg-base-200 rounded-xl">
                                                <h3 class="font-semibold mb-2">Estado del Pedido</h3>
                                                <BadgeEstadoPedido :estado="pedidoTipoIglesia.estado" />
                                                <h3 class="font-semibold mb-2">Tipo Suscripción</h3>
                                                <BadgeTiposuscripcionPedido
                                                    :tipo_suscripcion="pedidoTipoIglesia.tipo_suscripcion" />
                                                <h3 class="font-semibold mb-2">Tipo de Pedido</h3>
                                                <BadgeTipoPedido :tipo="pedidoTipoIglesia.tipo" />
                                                <p class="mt-2 text-sm">
                                                    Total Ítems: <strong>{{ pedidoTipoIglesia.total_cantidad }}</strong>
                                                </p>
                                                <p class="text-sm">
                                                    Total Monto:
                                                    <strong class="text-success text-lg">S/ {{
                                                        pedidoTipoIglesia.total_monto }}</strong>
                                                </p>
                                            </div>
                                        </div>

                                        <!-- ACCIONES -->
                                        <div class="mt-6 flex flex-col md:flex-row gap-4">
                                            <router-link :to="`/director/order/pay/${pedidoTipoIglesia.id_pedido}`"
                                                class="btn btn-primary flex-1">
                                                Ver detalle y continuar con el pago
                                            </router-link>
                                            <button class="btn btn-error btn-outline flex-1">
                                                Eliminar Pedido
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div v-if="totalItems > 0" class="sticky top-0 z-10 bg-white pb-2">
                                <!-- Search Bar -->
                                <div class="relative">
                                    <input type="text" v-model="searchQuery" placeholder="Buscar materiales..."
                                        class="input input-bordered w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 text-gray-400 absolute left-3 top-3" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <!-- Selected items counter -->
                                <div class="text-sm text-gray-500 mt-2 px-1">
                                    {{ filteredMaterials.length }} materiales encontrados
                                </div>
                            </div>
                            <!-- Materials List with Scroll -->
                            <div class="space-y-3 max-h-[60vh] overflow-y-auto pr-2 -mr-2">
                                <div v-for="item in filteredMaterials" :key="item.id_material"
                                    class="card transition-all duration-200 border" :class="{
                                        'bg-green-50 border-green-200': item.cantidad > 0,
                                        'bg-base-100 border-base-200': item.cantidad === 0
                                    }">
                                    <div
                                        class="card-body p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                        <!-- Info -->
                                        <div class="flex-1">
                                            <div class="flex items-start justify-between">
                                                <h2 class="font-semibold text-lg">{{ item.nombre }}</h2>
                                                <span class="text-sm font-medium text-green-600"
                                                    v-if="item.cantidad > 0">
                                                    {{ item.cantidad }} x S/. {{ item.precio }}
                                                </span>
                                            </div>
                                            <p class="text-sm text-gray-600 mt-1">{{ item.descripcion }}</p>
                                            <p class="font-bold text-primary mt-1">S/. {{ (item.precio *
                                                item.cantidad).toFixed(2) }}</p>
                                        </div>

                                        <!-- Controls -->
                                        <div class="flex items-center gap-2">
                                            <button
                                                class="btn btn-sm btn-ghost border border-gray-300 hover:bg-gray-100"
                                                @click="decrementar(item)" :disabled="item.cantidad === 0">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M20 12H4" />
                                                </svg>
                                            </button>

                                            <input type="number" class="input input-sm input-bordered w-16 text-center"
                                                v-model.number="item.cantidad" min="0"
                                                @input="handleQuantityInput($event, item)" />

                                            <button class="btn btn-sm btn-primary" @click="incrementar(item)">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M12 4v16m8-8H4" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <!-- <pre>{{ materialesIglesia }}</pre> -->
                </div>
            </div>
        </div>
    </div>

    <!-- Director Login Button -->
    <div v-if="!userData" class="fixed bottom-4 right-4 z-50">
        <router-link to="/login" class="btn btn-primary btn-lg shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Iniciar sesión como director de publicaciones
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, watch } from 'vue';
import usePersona from '@/composables/usePersona';
import usePedido from '@/composables/usePedido';
import BadgeEstadoPedido from '@/components/shared/BadgeEstadoPedido.vue';
import BadgeTiposuscripcionPedido from '@/components/shared/BadgeTiposuscripcionPedido.vue';
import BadgeTipoPedido from '@/components/shared/BadgeTipoPedido.vue';
import { usePeriodoStore } from '@/stores/periodoStore'
import { storeToRefs } from 'pinia'

const store = usePeriodoStore()
const { idPeriodoSeleccionado } = storeToRefs(store)

const { userData } = usePersona()
const { selectedPersona, materiales, useShowPedidoByIdDestino, useGetMaterialesIglesia, useCreatePedido } = usePedido()
const { data: materialesIglesia, isLoading: isLoadingMaterialesIglesia, refetch: refetchMaterialesIglesia } = useGetMaterialesIglesia()
const { mutate: createPedido, isPending: isPendingCreatePedido, isSuccess: isSuccessCreatePedido } = useCreatePedido()
const { data: pedidoDestino, isLoading: isLoadingPedidoDestino, refetch: refetchPedidoDestino } = useShowPedidoByIdDestino()

const searchQuery = ref('')
const messageSuccces = ref(false)


const pedidoTipoIglesia = computed(() => {
    if (!pedidoDestino.value || !Array.isArray(pedidoDestino.value)) return null
    return pedidoDestino.value.find((p: any) => p.tipo === 'I' && p.id_periodo === idPeriodoSeleccionado.value) || null
})

const selectPersona = async () => {
    if (!userData.value?.id_persona) return;

    selectedPersona.value = userData.value;
    searchQuery.value = '';

    // RESETEA LOS ESTADOS PARA NO DEJAR LA DATA ANTERIOR
    pedidoDestino.value = null;
    materialesIglesia.value = [];

    // Vuelve a refetchear pasando el id de la persona seleccionada
    await refetchPedidoDestino();

    const tienePedidoPrevio =
        pedidoDestino.value &&
        Array.isArray(pedidoDestino.value) &&
        pedidoDestino.value.some((p: any) =>
            p.tipo === 'I' &&
            p.tipo_suscripcion === 'F' &&
            p.detalles &&
            Array.isArray(p.detalles) &&
            p.detalles.length > 0
        );

    // Si NO tiene pedido → cargamos materiales
    if (!tienePedidoPrevio) {
        await refetchMaterialesIglesia();
    }
};

watchEffect(() => {
    if (materialesIglesia.value) {
        materiales.value = materialesIglesia.value.map((m: any) => ({
            ...m,
            cantidad: 0
        }));
    }
});

const incrementar = (item: any) => {
    item.cantidad++;
};

const decrementar = (item: any) => {
    if (item.cantidad > 0) item.cantidad--;
};

const handleQuantityInput = (event: Event, item: any) => {
    const input = event.target as HTMLInputElement;
    let value = parseInt(input.value);

    if (isNaN(value) || value < 0) {
        value = 0;
    }

    item.cantidad = value;
};

const filteredMaterials = computed(() => {
    if (!searchQuery.value) return materiales.value;
    const query = searchQuery.value?.toLowerCase() || '';
    return materiales.value.filter((item: any) => {
        const nombre = item.nombre?.toLowerCase() || '';
        const descripcion = item.descripcion?.toLowerCase() || '';
        return nombre.includes(query) || descripcion.includes(query);
    });
});

const totalItems = computed(() =>
    materiales.value.reduce((sum: number, item: any) => sum + item.cantidad, 0)
);

const totalPrecio = computed(() =>
    materiales.value.reduce(
        (sum: number, item: any) => sum + item.cantidad * item.precio,
        0
    )
);

const pedidoPayload: any = computed(() => ({
    id_persona: userData.value?.id_persona ?? null,
    id_destino: userData.value?.id_persona ?? null,
    id_periodo: idPeriodoSeleccionado.value,
    id_iglesia: userData.value?.id_iglesia ?? null,
    tipo: 'I',
    tipo_suscripcion: 'F',
    detalles: materiales.value
        .filter((item: any) => item.cantidad > 0)
        .map((item: any) => ({
            id_material: item.id_material,
            cantidad: item.cantidad
        }))
}));

const enviarPedido = async () => {
    try {
        await createPedido(pedidoPayload.value);
        messageSuccces.value = true;
        // Reset materials list after successful order
        materiales.value = [];
        materialesIglesia.value = [];
        selectedPersona.value = null;
        searchQuery.value = '';
        setTimeout(() => {
            messageSuccces.value = false;
        }, 3000);
    } catch (error) {
        console.error('Error al enviar el pedido:', error);
    }
};

watch(isSuccessCreatePedido, (isSuccess) => {
    if (isSuccess) {
        messageSuccces.value = true;
        // Reset materials list after successful order
        materiales.value = [];
        materialesIglesia.value = [];
        selectedPersona.value = null;
        searchQuery.value = '';
        setTimeout(() => {
            messageSuccces.value = false;
        }, 3000);
    }
});

// Auto-load materials for director on component mount
const initializeOrder = async () => {
    if (userData.value?.id_persona) {
        await selectPersona();
    }
};

// Call initializeOrder when component mounts
initializeOrder();

</script>