<template>
    <div class="p-4">
        <div class="overflow-x-auto shadow-lg rounded-lg">
            <table class="table w-full">
                <thead>
                    <tr class="bg-base-200">
                        <th>ID</th>
                        <th>Código</th>
                        <th>Solicitante</th>
                        <th>Destinatario</th>
                        <th>Total</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pedido in misPedidos" :key="pedido.id_pedido" class="hover">
                        <th>{{ pedido.id_pedido }}</th>
                        <td class="font-mono font-bold text-primary">
                            {{ pedido.codigo }}
                        </td>
                        <td>
                            {{ pedido.persona.nombres }} {{ pedido.persona.ap_paterno }}
                        </td>
                        <td>
                            {{ pedido.destino.nombres }} {{ pedido.destino.ap_paterno }}
                        </td>
                        <td class="font-semibold">
                            ${{ pedido.total_monto }}
                        </td>
                        <td>
                            <span class="badge badge-success gap-2">
                                {{ pedido.estado }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import useReport from '@/composables/useReport';

const { filters, useGetMisPedidos } = useReport();

const { data: misPedidos, isPending: isPendingMisPedidos, refetch: refetchMisPedidos, isRefetching: isRefetchingMisPedidos } = useGetMisPedidos();



</script>