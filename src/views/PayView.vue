<template>
    <div>
        <h1>Pago {{ id_pedido }}</h1>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    id_pedido: {
        type: Number,
        required: true
    }
})
</script>