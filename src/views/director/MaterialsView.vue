<template>
    <!-- Main Content -->
    <div>
        <h1>Materiales</h1>
    </div>
    <pre>{{ materialesIglesia }}</pre>
</template>

<script setup lang="ts">
import usePedido from '@/composables/usePedido';

const { useGetMaterialesIglesia } = usePedido()
const { data: materialesIglesia } = useGetMaterialesIglesia()



</script>