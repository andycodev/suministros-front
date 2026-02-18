import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePeriodoStore = defineStore('periodo', () => {
    const periodosStore = ref<any[]>([])
    const idPeriodoSeleccionado = ref<number | null>(null)

    // Getter para encontrar el periodo marcado como es_actual
    const periodoPredeterminado = computed(() =>
        periodosStore.value.find(p => p.es_actual === true) || periodosStore.value[0]
    )

    const periodoActivo = computed(() =>
        periodosStore.value.find(p => p.id_periodo === idPeriodoSeleccionado.value) || periodoPredeterminado.value
    )

    function setPeriodos(lista: any[]) {
        periodosStore.value = lista

        // Si no hay selección manual previa, forzamos que sea el predeterminado
        // Esto hará que en tu Landing el select marque el que tiene es_actual = true
        if (periodoPredeterminado.value) {
            idPeriodoSeleccionado.value = periodoPredeterminado.value.id_periodo
        }
    }

    function cambiarPeriodo(id: number) {
        idPeriodoSeleccionado.value = id
    }

    return { periodosStore, idPeriodoSeleccionado, periodoActivo, setPeriodos, cambiarPeriodo, periodoPredeterminado }
})