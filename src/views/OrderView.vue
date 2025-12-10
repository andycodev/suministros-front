<template>
  <!-- Hero Section -->
  <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
    <div class="max-w-6xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Sistema de Pedidos de Materiales</h1>
      <p class="text-xl text-blue-100 max-w-3xl mx-auto">Gestiona y realiza tus pedidos de materiales de manera rápida y
        sencilla</p>
    </div>
  </div>

  <!-- Main Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 p-6">
        <div class="col-span-1 space-y-5 p-6 bg-gray-50 border-r border-gray-100 md:border-gray-200">
          <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Filtros de Búsqueda</h2>

          <fieldset class="form-control w-full">
            <label class="label">
              <span class="label-text text-sm font-medium text-gray-600">Unión</span>
            </label>
            <select v-model="filters.id_union" class="select select-bordered w-full">
              <option disabled selected>Seleccione la Unión</option>
              <option v-for="iglesiaUnion in iglesiaUnions" :key="iglesiaUnion.id_union" :value="iglesiaUnion.id_union">
                {{ iglesiaUnion.nombre }}
              </option>
            </select>
          </fieldset>

          <fieldset class="form-control w-full">
            <label class="label">
              <span class="label-text text-sm font-medium text-gray-600">Campo</span>
            </label>
            <select v-model="filters.id_campo" class="select select-bordered w-full">
              <option disabled :value="null" :selected="filters.id_campo == null">Seleccione el Campo</option>
              <option v-for="iglesiaCampo in iglesiaCampos" :key="iglesiaCampo.id_campo" :value="iglesiaCampo.id_campo">
                {{ iglesiaCampo.nombre }}
              </option>
            </select>
          </fieldset>

          <fieldset class="form-control w-full">
            <label class="label">
              <span class="label-text text-sm font-medium text-gray-600">Distrito</span>
            </label>
            <select v-model="filters.id_distrito" class="select select-bordered w-full">
              <option disabled :value="null" :selected="filters.id_distrito == null">Seleccione el Distrito</option>
              <option v-for="iglesiaDistrito in iglesiaDistritos" :key="iglesiaDistrito.id_distrito"
                :value="iglesiaDistrito.id_distrito">
                {{ iglesiaDistrito.nombre }}
              </option>
            </select>
          </fieldset>

          <fieldset class="form-control w-full">
            <label class="label">
              <span class="label-text text-sm font-medium text-gray-600">Iglesia</span>
            </label>
            <select v-model="filters.id_iglesia" class="select select-bordered w-full">
              <option disabled :value="null" :selected="filters.id_iglesia == null">Seleccione la Iglesia</option>
              <option v-for="iglesiaIglesia in iglesiaIglesias" :key="iglesiaIglesia.id_iglesia"
                :value="iglesiaIglesia.id_iglesia">
                {{ iglesiaIglesia.nombre }}
              </option>
            </select>
          </fieldset>

          <fieldset class="form-control w-full">
            <label class="label">
              <span class="label-text text-sm font-medium text-gray-600">Documento (DNI)</span>
            </label>
            <input v-model="filters.documento" type="text" class="input input-bordered  w-full"
              placeholder="Escriba su número de documento" />
          </fieldset>

          <button class="btn btn-neutral btn-block mt-8" @click="refetchPersonas()">
            {{ isRefetchingPersonas ? 'Buscando persona ...' : 'Buscar persona' }}
          </button>

          <!-- Totalizador -->
          <div v-if="totalItems > 0" class="p-4 mb-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
            <div v-if="selectedPersona" class="text-xs text-gray-600 mb-2">
              Pedido para:
              <strong>{{ selectedPersona.nombres }} {{ selectedPersona.ap_paterno }}</strong>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-gray-700">
              Resumen del Pedido
            </h3>

            <p class="text-sm text-gray-600">
              <strong>Total de materiales:</strong> {{ totalItems }}
            </p>

            <p class="text-sm text-gray-600">
              <strong>Monto total:</strong> S/. {{ totalPrecio.toFixed(2) }}
            </p>

            <div class="mt-3">
              <button class="btn btn-sm btn-primary" @click="enviarPedido()">
                {{ isPendingCreatePedido ? 'Realizando pedido...' : 'Realizar pedido' }}
              </button>
            </div>
            <!-- <pre>
              {{ pedidoPayload }}
            </pre> -->
          </div>

        </div>

        <div class="col-span-1 md:col-span-2 space-y-6 p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold text-gray-800">Resultados de la Búsqueda</h2>
            <div v-if="totalItems > 0" class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {{ totalItems }} {{ totalItems === 1 ? 'ítem seleccionado' : 'ítems seleccionados' }}
            </div>
          </div>

          <div class="alert bg-gray-50 border border-gray-200 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              class="stroke-current flex-shrink-0 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 class="font-bold">Información</h3>
              <div class="text-xs">Los resultados aparecerán aquí tras realizar la búsqueda.</div>
            </div>
          </div>

          <span v-if="isRefetchingPersonas">Cargando...</span>
          <template v-else>
            <div v-for="persona in personas" :key="persona.id_persona"
              class="card w-full bg-base-100 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div class="card-body p-4">
                <h3 class="card-title text-base text-gray-800">
                  {{ `${persona.nombres} ${persona.ap_paterno} ${persona.ap_materno}` }}
                </h3>
                <p class="text-sm text-gray-500">DNI: {{ persona.documento }} | Iglesia: {{ persona.iglesia.nombre }}
                </p>
                <div class="card-actions justify-end">
                  <button class="btn btn-xs btn-outline btn-neutral" @click="selectPersona(persona)">
                    {{ isRefetchingMaterialesPersona ? 'Cargando materiales ...' : 'Seleccionar' }}
                  </button>
                </div>
              </div>
            </div>

            <div class="w-full max-w-3xl mx-auto space-y-3">
              <div v-if="isLoadingMaterialesPersona">Cargando materiales ...</div>
              <template v-else>
                <!-- Search Bar -->
                <div class="sticky top-0 z-10 bg-white pb-2">
                  <div class="relative">
                    <input type="text" v-model="searchQuery" placeholder="Buscar materiales..."
                      class="input input-bordered w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-3 top-3"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  <!-- Selected items counter -->
                  <div v-if="totalItems > 0" class="text-sm text-gray-500 mt-2 px-1">
                    {{ filteredMaterials.length }} materiales encontrados |
                    <span class="font-medium">{{ totalItems }} seleccionados</span>
                  </div>
                </div>

                <!-- Materials List with Scroll -->
                <div class="space-y-3 max-h-[60vh] overflow-y-auto pr-2 -mr-2">
                  <div v-for="item in filteredMaterials" :key="item.id_material"
                    class="card transition-all duration-200 border" :class="{
                      'bg-green-50 border-green-200': item.cantidad > 0,
                      'bg-base-100 border-base-200': item.cantidad === 0
                    }">
                    <div class="card-body p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <!-- Info -->
                      <div class="flex-1">
                        <div class="flex items-start justify-between">
                          <h2 class="font-semibold text-lg">{{ item.nombre }}</h2>
                          <span class="text-sm font-medium text-green-600" v-if="item.cantidad > 0">
                            {{ item.cantidad }} x S/. {{ item.precio }}
                          </span>
                        </div>
                        <p class="text-sm text-gray-600 mt-1">{{ item.descripcion }}</p>
                        <p class="font-bold text-primary mt-1">S/. {{ (item.precio * item.cantidad).toFixed(2) }}</p>
                      </div>

                      <!-- Controls -->
                      <div class="flex items-center gap-2">
                        <button class="btn btn-sm btn-ghost border border-gray-300 hover:bg-gray-100"
                          @click="decrementar(item)" :disabled="item.cantidad === 0">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                          </svg>
                        </button>

                        <input type="number" class="input input-sm input-bordered w-16 text-center"
                          v-model.number="item.cantidad" min="0" @input="handleQuantityInput($event, item)" />

                        <button class="btn btn-sm btn-primary" @click="incrementar(item)">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <!-- <pre>{{ materialesPersona }}</pre> -->
          </template>
        </div>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="bg-gray-50 py-16 px-4">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Características Principales</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div class="text-blue-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Fácil de Usar</h3>
          <p class="text-gray-600">Interfaz intuitiva para realizar pedidos en pocos pasos.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div class="text-blue-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Rápido</h3>
          <p class="text-gray-600">Procesamiento de pedidos en tiempo real.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div class="text-blue-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Seguro</h3>
          <p class="text-gray-600">Protección de datos y privacidad garantizada.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue';
import usePersona from '@/composables/usePersona';
import usePedido from '@/composables/usePedido';

const { filters, useGetIglesiaUnions, useGetIglesiaCamposByUnion, useGetIglesiaDistritosByCampo, useGetIglesiaIglesiasByDistrito, useSearchPersona } = usePersona()
const { data: iglesiaUnions } = useGetIglesiaUnions()
const { data: iglesiaCampos } = useGetIglesiaCamposByUnion()
const { data: iglesiaDistritos } = useGetIglesiaDistritosByCampo()
const { data: iglesiaIglesias } = useGetIglesiaIglesiasByDistrito()
const { data: personas, refetch: refetchPersonas, isRefetching: isRefetchingPersonas } = useSearchPersona()

const { selectedPersona, materiales, useGetMaterialesPersona, useCreatePedido } = usePedido()
const { data: materialesPersona, isLoading: isLoadingMaterialesPersona, isPending: isPendingMaterialesPersona, refetch: refetchMaterialesPersona, isRefetching: isRefetchingMaterialesPersona } = useGetMaterialesPersona()
const { mutate: createPedido, isPending: isPendingCreatePedido } = useCreatePedido()

const searchQuery = ref('')

const selectPersona = (persona: any) => {
  selectedPersona.value = persona;
  searchQuery.value = ''; // Reset search when selecting a new person
  refetchMaterialesPersona();
};

watchEffect(() => {
  if (materialesPersona.value) {
    materiales.value = materialesPersona.value.map((m: any) => ({
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

/* const verMateriales = () => {
  refetchMaterialesPersona();
}; */

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
  id_persona: selectedPersona.value?.id_persona ?? null,
  detalles: materiales.value
    .filter((item: any) => item.cantidad > 0)
    .map((item: any) => ({
      id_material: item.id_material,
      cantidad: item.cantidad
    }))
}));

const enviarPedido = () => {
  console.log('pedidoPayload', pedidoPayload.value)
  createPedido(pedidoPayload.value)
};

</script>