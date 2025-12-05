<template>

  <!-- <pre>{{ filters }}</pre> -->
  <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 p-6 bg-white rounded-lg border border-gray-200">

    <div class="col-span-1 space-y-5 p-2 border-r border-gray-100 md:border-gray-200">
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
    </div>

    <div class="col-span-1 md:col-span-2 space-y-4 p-2">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Resultados de la Búsqueda</h2>

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
            <p class="text-sm text-gray-500">DNI: {{ persona.documento }} | Iglesia: {{ persona.iglesia.nombre }}</p>
            <div class="card-actions justify-end">
              <button class="btn btn-xs btn-outline btn-neutral" @click="refetchMaterialesPersona()">
                {{ isRefetchingMaterialesPersona ? 'Cargando materiales ...' : 'Ver materiales' }}
              </button>
            </div>
          </div>
        </div>
        <pre>{{ materialesPersona }}</pre>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import usePersona from '@/composables/usePersona';
import usePedido from '@/composables/usePedido';

const { filters, useGetIglesiaUnions, useGetIglesiaCamposByUnion, useGetIglesiaDistritosByCampo, useGetIglesiaIglesiasByDistrito, useSearchPersona } = usePersona()
const { data: iglesiaUnions } = useGetIglesiaUnions()
const { data: iglesiaCampos } = useGetIglesiaCamposByUnion()
const { data: iglesiaDistritos } = useGetIglesiaDistritosByCampo()
const { data: iglesiaIglesias } = useGetIglesiaIglesiasByDistrito()
const { data: personas, refetch: refetchPersonas, isRefetching: isRefetchingPersonas } = useSearchPersona()

const { useGetMaterialesPersona } = usePedido()
const { data: materialesPersona, refetch: refetchMaterialesPersona, isRefetching: isRefetchingMaterialesPersona } = useGetMaterialesPersona()
</script>