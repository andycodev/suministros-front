<template>
    <div class="space-y-6">
        <!-- Welcome Section -->
        <div class="bg-gradient-to-r from-primary to-primary-focus text-primary-content rounded-xl p-6 shadow-lg">
            <h1 class="text-3xl font-bold mb-2">¡Bienvenido, Director!</h1>
            <p class="text-lg opacity-90">Panel de Control de Publicaciones</p>
            <p class="text-sm opacity-75 mt-2">Gestiona pedidos, materiales y reportes desde un solo lugar</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const stats = ref({
    todayOrders: 24,
    ordersIncrease: 12,
    monthlyRevenue: 45670,
    revenueIncrease: 8,
    activeMaterials: 156,
    lowStock: 8,
    activeUsers: 1240,
    newUsers: 45
});

const recentOrders = ref([
    { id: 1, code: 'PED-001', customer: 'Juan Pérez', total: 250, status: 'Pendiente' },
    { id: 2, code: 'PED-002', customer: 'María García', total: 180, status: 'Completado' },
    { id: 3, code: 'PED-003', customer: 'Carlos López', total: 320, status: 'En Proceso' },
    { id: 4, code: 'PED-004', customer: 'Ana Martínez', total: 150, status: 'Pendiente' }
]);

const topMaterials = ref([
    { id: 1, position: 1, name: 'Biblia Estudio', units: 45, revenue: 2250 },
    { id: 2, position: 2, name: 'Libro de Himnos', units: 38, revenue: 1140 },
    { id: 3, position: 3, name: 'Guía de Estudio', units: 32, revenue: 960 },
    { id: 4, position: 4, name: 'Revista Mensual', units: 28, revenue: 560 }
]);

const getStatusClass = (status: string) => {
    switch (status) {
        case 'Completado':
            return 'badge-success';
        case 'En Proceso':
            return 'badge-warning';
        case 'Pendiente':
            return 'badge-info';
        default:
            return 'badge-ghost';
    }
};

onMounted(() => {
    // Aquí podrías cargar datos reales desde una API
    console.log('Dashboard mounted');
});
</script>
