<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 p-6">

        <div class="col-span-1 space-y-5 p-6 bg-gray-50 border-r border-gray-100 md:border-gray-200">
          <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Filtros de Búsqueda</h2>

          <!--     <div class="mb-4">
            <span class="label-text text-sm font-medium text-gray-600">Periodo: </span>
            <span class="font-bold text-primary">{{ isLoadingPeriodos ? 'Cargando periodo ...' :
              store.periodoPredeterminado?.nombre }}</span>
          </div>
 -->
          <fieldset class="form-control w-full">
            <label class="label"><span class="label-text text-sm font-medium text-gray-600">Unión</span></label>
            <select v-model="filters.id_union" @change="setUnion(filters.id_union)"
              class="select select-bordered w-full">
              <option disabled selected>{{ isFetchingIglesiaUnions ? 'Cargando uniones ...' : 'Seleccione la Unión' }}
              </option>
              <option v-for="u in iglesiaUnions" :key="u.id_union" :value="u.id_union">{{ u.nombre }}</option>
            </select>
          </fieldset>

          <fieldset class="form-control w-full">
            <label class="label"><span class="label-text text-sm font-medium text-gray-600">Campo</span></label>
            <select v-model="filters.id_campo" @change="setCampo(filters.id_campo)"
              class="select select-bordered w-full" :disabled="isFetchingIglesiaCampos">
              <option :value="null">{{ isFetchingIglesiaCampos ? 'Cargando campos ...' : 'Seleccione el Campo' }}
              </option>
              <option v-for="c in iglesiaCampos" :key="c.id_campo" :value="c.id_campo">{{ c.nombre }}</option>
            </select>
          </fieldset>

          <fieldset class="form-control w-full">
            <label class="label"><span class="label-text text-sm font-medium text-gray-600">Distrito</span></label>
            <select v-model="filters.id_distrito" @change="setDistrito(filters.id_distrito)"
              class="select select-bordered w-full" :disabled="isFetchingIglesiaDistritos">
              <option :value="null">{{ isFetchingIglesiaDistritos ? 'Cargando distritos ...' : 'Seleccione el Distrito'
              }}</option>
              <option v-for="d in iglesiaDistritos" :key="d.id_distrito" :value="d.id_distrito">{{ d.nombre }}</option>
            </select>
          </fieldset>

          <fieldset class="form-control w-full">
            <label class="label"><span class="label-text text-sm font-medium text-gray-600">Iglesia</span></label>
            <select v-model="filters.id_iglesia" class="select select-bordered w-full"
              :disabled="isFetchingIglesiaIglesias">
              <option :value="null">{{ isFetchingIglesiaIglesias ? 'Cargando iglesias ...' : 'Seleccione la Iglesia' }}
              </option>
              <option v-for="i in iglesiaIglesias" :key="i.id_iglesia" :value="i.id_iglesia">{{ i.nombre }}</option>
            </select>
          </fieldset>

          <fieldset class="form-control w-full">
            <label class="label"><span class="label-text text-sm font-medium text-gray-600">Documento
                (DNI)</span></label>
            <input v-model="filters.documento" type="text" class="input input-bordered w-full" placeholder="DNI"
              @keyup.enter="searchPerson" />
          </fieldset>

          <button class="btn btn-neutral btn-block mt-8" @click="searchPerson" :disabled="isFetchingPersonas">
            <span v-if="isFetchingPersonas" class="loading loading-spinner"></span>
            {{ isFetchingPersonas ? 'Buscando...' : 'Buscar personas' }}
          </button>

          <div v-if="totalItems > 0" class="p-4 mt-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div class="text-center mb-4">
              <span class="badge badge-warning badge-soft mb-2">Pedido Pendiente</span>
              <p class="font-bold text-sm">{{ selectedPersona?.nombres }} {{ selectedPersona?.ap_paterno }}</p>
            </div>
            <div class="divider text-xs opacity-50 uppercase tracking-tighter">Resumen</div>
            <p class="text-sm">Items: <strong>{{ totalItems }}</strong></p>
            <p class="text-sm">Total: <strong class="text-success">S/. {{ totalPrecio.toFixed(2) }}</strong></p>

            <button class="btn btn-primary w-full mt-4" @click="enviarPedido" :disabled="isPendingCreatePedido">
              {{ isPendingCreatePedido ? 'Guardando...' : 'Guardar y continuar' }}
            </button>

            <div v-if="messageSuccces" class="alert alert-success mt-3 text-xs">¡Pedido realizado con éxito!</div>
          </div>
        </div>

        <div class="col-span-1 md:col-span-2 space-y-6 p-6">
          <h2 class="text-2xl font-bold text-gray-800">Resultados</h2>

          <div v-if="!selectedPersona" class="space-y-4">
            <div v-for="persona in personas" :key="persona.id_persona"
              class="card border border-gray-200 bg-white hover:shadow-md transition-shadow">
              <div class="card-body p-4 flex flex-row items-center justify-between">
                <div>
                  <h3 class="font-bold text-gray-800">{{ persona.nombres }} {{ persona.ap_paterno }} {{
                    persona.ap_materno }}</h3>
                  <p class="text-xs text-gray-500">DNI: {{ persona.documento }} | {{ persona.iglesia.nombre }}</p>
                </div>
                <button class="btn btn-sm btn-outline btn-neutral" @click="selectPersona(persona)"
                  :disabled="isRefetchingMaterialesPersona">
                  Seleccionar
                </button>
              </div>
            </div>
          </div>

          <div v-if="selectedPersona" class="space-y-4">
            <div class="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
              <span class="text-sm">Editando pedido para: <strong>{{ selectedPersona.nombres }}</strong></span>
              <button class="btn btn-xs btn-ghost text-error" @click="selectedPersona = null">Cancelar</button>
            </div>

            <template v-if="pedidoTipoPersonal">
              <div class="card border-2 border-warning bg-base-100 shadow-xl">
                <div class="card-body">
                  <h2 class="card-title text-xl font-bold">Pedido Existente #{{ pedidoTipoPersonal.codigo }}</h2>
                  <p class="text-sm">Este usuario ya tiene un pedido para el periodo actual.</p>
                  <div class="mt-4 flex gap-2">
                    <router-link :to="`order/pay/${pedidoTipoPersonal.id_pedido}`"
                      class="btn btn-primary btn-sm flex-1">Ver/Pagar Pedido</router-link>
                  </div>
                </div>
              </div>
            </template>

            <template v-else>
              <div class="sticky top-0 bg-white z-10 py-2">
                <input type="text" v-model="searchQuery" placeholder="Filtrar materiales..."
                  class="input input-bordered w-full">
              </div>

              <div class="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                <div v-for="item in filteredMaterials" :key="item.id_material"
                  class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  :class="{ 'border-success bg-success/5': item.cantidad > 0 }">
                  <div class="flex-1">
                    <h4 class="font-bold text-sm">{{ item.nombre }}</h4>
                    <p class="text-xs text-gray-500">S/. {{ item.precio }}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button class="btn btn-xs btn-circle btn-outline" @click="decrementar(item)"
                      :disabled="item.cantidad <= 0">-</button>
                    <input type="number" class="w-12 text-center text-sm font-bold border-none bg-transparent"
                      v-model.number="item.cantidad" min="0">
                    <button class="btn btn-xs btn-circle btn-primary" @click="incrementar(item)">+</button>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Director Login Button -->
    <div class="fixed bottom-4 right-4 z-50">
      <router-link v-if="!isDirectorAuthenticated" to="/login" class="btn btn-neutral btn-md shadow-lg">
        Iniciar sesión como director de publicaciones
      </router-link>
      <router-link v-else to="/director/dashboard" class="btn btn-success btn-md shadow-lg">
        Diríjase al panel de director de publicaciones
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { usePeriodoStore } from '@/stores/periodoStore';
import { storeToRefs } from 'pinia';
import usePersona from '@/composables/usePersona';
import usePedido from '@/composables/usePedido';

// STORES Y COMPOSABLES
const store = usePeriodoStore()
const { idPeriodoSeleccionado } = storeToRefs(store)

const { filters, setUnion, setCampo, setDistrito, useGetIglesiaUnions, useGetIglesiaCamposByUnion, useGetIglesiaDistritosByCampo, useGetIglesiaIglesiasByDistrito, useSearchPersona } = usePersona()
const { data: iglesiaUnions, isFetching: isFetchingIglesiaUnions } = useGetIglesiaUnions()
const { data: iglesiaCampos, isPending: isPendingIglesiaCampos, isFetching: isFetchingIglesiaCampos } = useGetIglesiaCamposByUnion()
const { data: iglesiaDistritos, isPending: isPendingIglesiaDistritos, isFetching: isFetchingIglesiaDistritos } = useGetIglesiaDistritosByCampo()
const { data: iglesiaIglesias, isPending: isPendingIglesiaIglesias, isFetching: isFetchingIglesiaIglesias } = useGetIglesiaIglesiasByDistrito()
const { data: personas, refetch: refetchPersonas, isFetching: isFetchingPersonas } = useSearchPersona()

const { selectedPersona, materiales, useGetPeriodos, useShowPedidoByIdDestino, useGetMaterialesPersona, useCreatePedido } = usePedido()
const { isLoading: isLoadingPeriodos } = useGetPeriodos()
const { data: materialesPersona, isRefetching: isRefetchingMaterialesPersona, refetch: refetchMaterialesPersona } = useGetMaterialesPersona()
const { mutate: createPedido, isPending: isPendingCreatePedido, isSuccess: isSuccessCreatePedido } = useCreatePedido()
const { data: pedidoDestino, refetch: refetchPedidoDestino } = useShowPedidoByIdDestino()

// ESTADOS LOCALES
const searchQuery = ref('')
const messageSuccces = ref(false)

// COMPUTED PROPERTIES

const isDirectorAuthenticated = computed(() => {
  return localStorage.getItem('isDirectorAuth') === 'true';
});

const pedidoTipoPersonal = computed(() => {
  if (!pedidoDestino.value || !Array.isArray(pedidoDestino.value)) return null
  return pedidoDestino.value.find((p: any) => p.tipo === 'P' && p.id_periodo === idPeriodoSeleccionado.value) || null
})

const filteredMaterials = computed(() => {
  if (!materiales.value) return []
  const query = searchQuery.value?.toLowerCase().trim() || ''
  if (!query) return materiales.value
  return materiales.value.filter((m: any) => m.nombre?.toLowerCase().includes(query) || m.descripcion?.toLowerCase().includes(query))
})

const totalItems = computed(() => materiales.value.reduce((sum: number, item: any) => sum + (item.cantidad || 0), 0))
const totalPrecio = computed(() => materiales.value.reduce((sum: number, item: any) => sum + ((item.cantidad || 0) * item.precio), 0))

// WATCHERS
// ⚠️ Reemplazamos watchEffect por un watch específico para evitar bucles
watch(materialesPersona, (newVal) => {
  if (newVal) {
    materiales.value = newVal.map((m: any) => ({ ...m, cantidad: 0 }))
  }
}, { immediate: true })

// FUNCIONES
const selectPersona = async (persona: any) => {
  selectedPersona.value = persona
  searchQuery.value = ''

  // ⚠️ NO asignamos null a las variables de Query (Read-only)
  // Simplemente disparamos el refetch, TanStack Query se encarga del resto
  await refetchPedidoDestino()

  const tienePedidoPrevio = pedidoTipoPersonal.value !== null

  if (!tienePedidoPrevio) {
    await refetchMaterialesPersona()
  }
}

const searchPerson = () => {
  selectedPersona.value = null
  searchQuery.value = ''
  refetchPersonas()
}

const incrementar = (item: any) => item.cantidad++
const decrementar = (item: any) => { if (item.cantidad > 0) item.cantidad-- }

const enviarPedido = () => {
  const payload: any = {
    id_persona: selectedPersona.value?.id_persona,
    id_destino: selectedPersona.value?.id_persona,
    id_periodo: store.periodoPredeterminado?.id_periodo || idPeriodoSeleccionado.value,
    id_iglesia: selectedPersona.value?.iglesia.id_iglesia,
    tipo: 'P',
    tipo_suscripcion: 'V',
    detalles: materiales.value
      .filter((item: any) => item.cantidad > 0)
      .map((item: any) => ({ id_material: item.id_material, cantidad: item.cantidad }))
  }
  createPedido(payload)
}

// Reset tras éxito
watch(isSuccessCreatePedido, (success) => {
  if (success) {
    messageSuccces.value = true
    selectedPersona.value = null
    setTimeout(() => messageSuccces.value = false, 3000)
  }
})

onMounted(() => {
  selectedPersona.value = null
  filters.documento = ''
})
</script>