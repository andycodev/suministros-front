<template>
    <div class="space-y-6">
        <div class="flex justify-between items-center">
            <h1 class="text-3xl font-bold">Reportes</h1>
            <button class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exportar Reporte
            </button>
        </div>

        <!-- Tarjetas de Resumen -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-base-100 rounded-lg shadow p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Ventas del Mes</p>
                        <p class="text-2xl font-bold text-primary">S/. 45,670</p>
                        <p class="text-xs text-success">+12% vs mes anterior</p>
                    </div>
                    <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="bg-base-100 rounded-lg shadow p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Pedidos Totales</p>
                        <p class="text-2xl font-bold text-secondary">234</p>
                        <p class="text-xs text-success">+8% vs mes anterior</p>
                    </div>
                    <div class="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="bg-base-100 rounded-lg shadow p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Clientes Activos</p>
                        <p class="text-2xl font-bold text-accent">1,240</p>
                        <p class="text-xs text-success">+15% vs mes anterior</p>
                    </div>
                    <div class="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="bg-base-100 rounded-lg shadow p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Materiales Vendidos</p>
                        <p class="text-2xl font-bold text-info">892</p>
                        <p class="text-xs text-success">+5% vs mes anterior</p>
                    </div>
                    <div class="w-12 h-12 bg-info/10 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-info" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- Gráficos -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-base-100 rounded-lg shadow p-6">
                <h2 class="text-xl font-bold mb-4">Ventas por Mes</h2>
                <div class="h-64 flex items-center justify-center bg-base-200 rounded-lg">
                    <div class="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-2" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <p class="text-gray-500">Gráfico de ventas mensuales</p>
                    </div>
                </div>
            </div>

            <div class="bg-base-100 rounded-lg shadow p-6">
                <h2 class="text-xl font-bold mb-4">Materiales Más Vendidos</h2>
                <div class="space-y-3">
                    <div v-for="item in topMaterials" :key="item.id" class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <span class="text-xs font-bold text-primary">{{ item.position }}</span>
                            </div>
                            <div>
                                <p class="font-medium">{{ item.name }}</p>
                                <p class="text-sm text-gray-500">{{ item.units }} unidades</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-semibold">S/. {{ item.revenue }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tabla de Reportes -->
        <div class="bg-base-100 rounded-lg shadow overflow-hidden">
            <div class="p-4 border-b">
                <h2 class="text-xl font-bold">Reportes Generados</h2>
            </div>
            <div class="overflow-x-auto">
                <table class="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Fecha Generación</th>
                            <th>Tamaño</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="report in reports" :key="report.id">
                            <td class="font-semibold">{{ report.name }}</td>
                            <td>
                                <span class="badge badge-outline">{{ report.type }}</span>
                            </td>
                            <td>{{ report.date }}</td>
                            <td>{{ report.size }}</td>
                            <td>
                                <div class="flex space-x-2">
                                    <button class="btn btn-sm btn-outline btn-primary">Descargar</button>
                                    <button class="btn btn-sm btn-outline btn-secondary">Ver</button>
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

const topMaterials = ref([
    { id: 1, position: 1, name: 'Biblia Estudio', units: 45, revenue: 2250 },
    { id: 2, position: 2, name: 'Libro de Himnos', units: 38, revenue: 1140 },
    { id: 3, position: 3, name: 'Guía de Estudio', units: 32, revenue: 960 },
    { id: 4, position: 4, name: 'Revista Mensual', units: 28, revenue: 560 }
]);

const reports = ref([
    { id: 1, name: 'Reporte Ventas Enero', type: 'Ventas', date: '27/01/2026', size: '2.5 MB' },
    { id: 2, name: 'Reporte Inventario', type: 'Inventario', date: '26/01/2026', size: '1.8 MB' },
    { id: 3, name: 'Reporte Clientes', type: 'Clientes', date: '25/01/2026', size: '3.2 MB' }
]);
</script>
