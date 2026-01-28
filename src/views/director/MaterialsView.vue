<template>
    <div class="space-y-6">
        <div class="flex justify-between items-center">
            <h1 class="text-3xl font-bold">Gestión de Materiales</h1>
            <button class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Agregar Material
            </button>
        </div>

        <!-- Estadísticas -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="stat bg-base-100 rounded-lg shadow">
                <div class="stat-title">Total Materiales</div>
                <div class="stat-value text-primary">{{ stats.total }}</div>
            </div>
            <div class="stat bg-base-100 rounded-lg shadow">
                <div class="stat-title">Activos</div>
                <div class="stat-value text-success">{{ stats.active }}</div>
            </div>
            <div class="stat bg-base-100 rounded-lg shadow">
                <div class="stat-title">Stock Bajo</div>
                <div class="stat-value text-warning">{{ stats.lowStock }}</div>
            </div>
            <div class="stat bg-base-100 rounded-lg shadow">
                <div class="stat-title">Sin Stock</div>
                <div class="stat-value text-error">{{ stats.outOfStock }}</div>
            </div>
        </div>

        <!-- Filtros -->
        <div class="bg-base-100 rounded-lg shadow p-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Categoría</span>
                    </label>
                    <select class="select select-bordered">
                        <option>Todas</option>
                        <option>Libros</option>
                        <option>Revistas</option>
                        <option>Material de Estudio</option>
                        <option>Música</option>
                    </select>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Estado</span>
                    </label>
                    <select class="select select-bordered">
                        <option>Todos</option>
                        <option>Activo</option>
                        <option>Inactivo</option>
                    </select>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Buscar</span>
                    </label>
                    <input type="text" placeholder="Nombre o código..." class="input input-bordered" />
                </div>
            </div>
        </div>

        <!-- Tabla de Materiales -->
        <div class="bg-base-100 rounded-lg shadow overflow-hidden">
            <div class="overflow-x-auto">
                <table class="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="material in materials" :key="material.id">
                            <td class="font-semibold">{{ material.code }}</td>
                            <td>{{ material.name }}</td>
                            <td>{{ material.category }}</td>
                            <td class="font-semibold">S/. {{ material.price }}</td>
                            <td>
                                <span :class="getStockClass(material.stock)">
                                    {{ material.stock }}
                                </span>
                            </td>
                            <td>
                                <span class="badge"
                                    :class="material.status === 'Activo' ? 'badge-success' : 'badge-error'">
                                    {{ material.status }}
                                </span>
                            </td>
                            <td>
                                <div class="flex space-x-2">
                                    <button class="btn btn-sm btn-outline btn-primary">Ver</button>
                                    <button class="btn btn-sm btn-outline btn-secondary">Editar</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const stats = ref({
    total: 156,
    active: 142,
    lowStock: 8,
    outOfStock: 6
});

const materials = ref([
    { id: 1, code: 'LIB-001', name: 'Biblia Estudio', category: 'Libros', price: 50, stock: 45, status: 'Activo' },
    { id: 2, code: 'LIB-002', name: 'Libro de Himnos', category: 'Libros', price: 30, stock: 38, status: 'Activo' },
    { id: 3, code: 'EST-001', name: 'Guía de Estudio', category: 'Material de Estudio', price: 20, stock: 5, status: 'Activo' },
    { id: 4, code: 'REV-001', name: 'Revista Mensual', category: 'Revistas', price: 15, stock: 0, status: 'Inactivo' },
    { id: 5, code: 'MUS-001', name: 'CD Alabanza', category: 'Música', price: 25, stock: 2, status: 'Activo' }
]);

const getStockClass = (stock: number) => {
    if (stock === 0) return 'text-error font-bold';
    if (stock < 10) return 'text-warning font-bold';
    return 'text-success font-bold';
};
</script>
