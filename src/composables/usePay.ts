import { ref, computed } from 'vue';
import { useRoute } from 'vue-router'
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { showPedidoByIdPedidoFn } from '@/services/pedido.service';

const usePay = () => {

    const queryClient: any = useQueryClient();
    const route = useRoute()
    const idPedido = ref(route.params.id_pedido)

    function useShowPedidoByIdPedidoFn() {
        const { data, isLoading, isPending, refetch, isRefetching } = useQuery({
            queryKey: computed(() => ['show-pedido-by-id-pedido', idPedido.value]),
            queryFn: async () => {
                const data = await showPedidoByIdPedidoFn(Number(idPedido.value))
                return data
            },
            enabled: computed(() => true),
        });
        return { data, isLoading, isPending, refetch, isRefetching }
    }

    return {
        useShowPedidoByIdPedidoFn,
    }
}

export default usePay;

