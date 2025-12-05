<template>
    <div class="h-full flex flex-col">
        <div class="rounded-lg border border-base-300 overflow-hidden flex-1 flex flex-col">
            <div class="overflow-hidden flex-1">
                <div class="h-full flex flex-col">
                    <div class="overflow-y-auto flex-1">
                        <table class="table table-zebra w-full">
                            <thead class="sticky top-0 z-10">
                                <tr class="bg-base-200">
                                    <th class="w-16">N°</th>
                                    <th>Nombre</th>
                                    <th>Unidad Base</th>
                                    <th>Precio Venta</th>
                                    <th>Costo Unidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="producto in productos" :key="producto.id_producto"
                                    class="hover:bg-base-200 transition-colors duration-200">
                                    <td class="font-medium">{{ producto.id_producto }}</td>
                                    <td class="whitespace-nowrap">{{ producto.nombre }}</td>
                                    <td class="whitespace-nowrap">{{ producto.unidad_base }}</td>
                                    <td class="whitespace-nowrap">S/ {{ producto.precio_venta.toFixed(2) }}</td>
                                    <td class="whitespace-nowrap">S/ {{ producto.costo_unidad.toFixed(2) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const productos = ref([
    { id_producto: 1, nombre: 'Cerveza Pilsen', unidad_base: 'Botella', precio_venta: 7.50, costo_unidad: 5.75 },
    { id_producto: 2, nombre: 'Cerveza Cristal', unidad_base: 'Botella', precio_venta: 8.50, costo_unidad: 6.75 },
    { id_producto: 3, nombre: 'Cigarros', unidad_base: 'Cigarro', precio_venta: 1.50, costo_unidad: 1.00 },
])
</script>