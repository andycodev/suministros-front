<template>
    <div class="w-full relative" @keydown.esc="abierto = false">
        <label v-if="titulo" class="label"><span class="label-text font-bold">{{ titulo }}</span></label>

        <div class="relative">
            <label class="input input-bordered flex items-center gap-2">
                <input v-model="busqueda" type="text" class="grow" :placeholder="placeholder" @focus="abierto = true"
                    @input="onInput" @keydown.down.prevent="bajar" @keydown.up.prevent="subir"
                    @keydown.enter.prevent="seleccionarActual" />
                <button v-if="busqueda" @click.prevent="limpiar" type="button"
                    class="btn btn-ghost btn-xs btn-circle font-bold">✕</button>
            </label>

            <ul v-if="abierto && filtrados.length > 0"
                class="absolute left-0 w-full p-2 shadow-2xl bg-base-100 rounded-box mt-1 z-[100] border border-base-300 menu block">
                <li v-for="(item, i) in filtrados" :key="i">
                    <button type="button" @mousedown.prevent @click="seleccionar(item)"
                        :class="{ 'bg-base-300 text-base-content': i === indiceActivo }"
                        class="w-full text-left px-4 py-3 rounded-lg transition-colors">
                        {{ item[campo] }}
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
    items: { type: Array, default: () => [] },
    campo: { type: String, default: 'nombre' },
    titulo: { type: String, default: '' },
    placeholder: { type: String, default: 'Buscar...' }
});

const emit = defineEmits(['elegido']);

const busqueda = ref('');
const abierto = ref(false);
const indiceActivo = ref(-1);

// Filtrado reactivo
const filtrados = computed(() => {
    const q = busqueda.value.toLowerCase().trim();
    if (!q || !props.items) return [];

    return props.items.filter(item => {
        const val = item[props.campo];
        return val ? val.toString().toLowerCase().includes(q) : false;
    }).slice(0, 10);
});

// Resetear índice cuando cambia la búsqueda
watch(busqueda, () => {
    indiceActivo.value = -1;
});

const onInput = () => {
    abierto.value = true;
};

const seleccionar = (item) => {
    busqueda.value = item[props.campo];
    abierto.value = false;
    indiceActivo.value = -1;
    emit('elegido', item);
};

// --- Lógica de Teclado ---
const bajar = () => {
    if (indiceActivo.value < filtrados.value.length - 1) {
        indiceActivo.value++;
    }
};

const subir = () => {
    if (indiceActivo.value > 0) {
        indiceActivo.value--;
    }
};

const seleccionarActual = () => {
    if (indiceActivo.value >= 0 && filtrados.value[indiceActivo.value]) {
        seleccionar(filtrados.value[indiceActivo.value]);
    } else if (filtrados.value.length > 0) {
        seleccionar(filtrados.value[0]);
    }
};

const limpiar = () => {
    busqueda.value = '';
    abierto.value = false;
    indiceActivo.value = -1;
    emit('elegido', null);
};

// Cerrar si se hace click fuera del componente
if (typeof window !== 'undefined') {
    window.addEventListener('click', (e) => {
        if (!e.target.closest('.relative')) {
            abierto.value = false;
        }
    });
}
</script>