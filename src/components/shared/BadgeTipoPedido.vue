<template>
    <div class="badge badge-soft" :class="config.clase">
        {{ config.texto }}
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    tipo?: string;
}

// Definimos los props que recibe el componente
const props = withDefaults(defineProps<Props>(), {
    tipo: 'I' // Valor por defecto en caso de que llegue undefined
});

// 1. Definimos el objeto de configuración (fuera del computed para que no se redefine)
const MAPA_TIPOS: Record<string, { clase: string; texto: string }> = {
    'P': { clase: 'badge-primary', texto: 'PERSONAL' },
    'I': { clase: 'badge-warning', texto: 'IGLESIA' },
};

// 2. Usamos el computed para buscar la configuración según el prop
const config = computed(() => {
    // Retornamos la configuración del mapa, o un valor por defecto si el tipo no existe
    return MAPA_TIPOS[props.tipo as string] || { clase: 'badge-ghost', texto: 'DESCONOCIDO' };
});
</script>