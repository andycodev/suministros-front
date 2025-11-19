<!-- src/modules/order/views/SearchMemberView.vue -->
<template>
    <div class="p-4">
        <Stepper />

        <h1 class="text-xl font-bold mb-4">Buscar miembro</h1>

        <!-- Filtros: Unión, Campo, Distrito, Iglesia y DNI -->
        <div class="grid grid-cols-1 gap-3 max-w-lg mx-auto">
            <input v-model="union" placeholder="Unión" class="input" />
            <input v-model="field" placeholder="Campo" class="input" />
            <input v-model="district" placeholder="Distrito" class="input" />
            <input v-model="church" placeholder="Iglesia" class="input" />
            <input v-model="dni" placeholder="N° documento (DNI)" class="input" />
            <button class="btn-primary" @click="doSearch">Buscar</button>
        </div>

        <div v-if="results.length" class="mt-4 max-w-lg mx-auto space-y-2">
            <p class="font-medium">Resultados:</p>
            <button v-for="r in results" :key="r.id" @click="select(r)"
                class="w-full text-left border rounded px-3 py-2 hover:bg-gray-50">
                {{ r.name }} — DNI: {{ r.dni ?? '-' }}
            </button>
        </div>

        <div v-else-if="searched" class="mt-4 text-sm text-gray-600 max-w-lg mx-auto">
            No se encontraron miembros.
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useOrderStore } from '@/stores/useOrderStore'
import Stepper from '../components/Stepper.vue'
import { useRouter } from 'vue-router'

const store = useOrderStore()
const router = useRouter()

const union = ref('')
const field = ref('')
const district = ref('')
const church = ref('')
const dni = ref('')
const results = ref<Array<{ id: number; name: string; dni?: string }>>([])
const searched = ref(false)

// MOCK: en producción llama a tu API: GET /members?union=&field=&district=&church=&dni=
function doSearch() {
    searched.value = true
    // mock filter logic
    const mock = [
        { id: 1, name: 'Daniel López', dni: '12345678' },
        { id: 2, name: 'Ana Ruiz', dni: '87654321' },
        { id: 3, name: 'Carlos Pérez', dni: '11112222' },
    ]

    results.value = mock.filter(m =>
        (!dni.value || m.dni === dni.value) &&
        (!union.value || union.value.length > 0) // solo mock, reemplaza por lógica real
    )
}

function select(member: { id: number; name: string; dni?: string }) {
    store.setMember(member)
    router.push('/order/materials')
}
</script>

<style scoped>
.input {
    border: 1px solid #ddd;
    padding: 0.5rem;
    border-radius: 0.375rem;
}

.btn-primary {
    background: #2563eb;
    color: white;
    padding: 0.5rem;
    border-radius: 0.375rem;
}
</style>
