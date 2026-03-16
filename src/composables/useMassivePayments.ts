import { ref, computed } from 'vue';
import { useQuery, /* useQueryClient */ } from '@tanstack/vue-query';
import { getMisPedidosFn, getMisPedidosPagosFn } from '@/services/report.service';
import { getTipoPedidosFn, getTiposuscripcionPedidosFn, getEstadoPedidosFn } from '@/services/setup.service';
import usePersona from '@/composables/usePersona';


const useMassivePayments = () => {

    const { userData } = usePersona();
    /* Variables */
    //const queryClient: any = useQueryClient()
    const filters: any = ref({
        id_persona: userData.value?.id_persona ?? null,
        estado: '',
    })

    const estadoPedidos = getEstadoPedidosFn();

    function useGetMisPedidosPagos() {
        const { data, isPending, refetch, isRefetching } = useQuery({
            queryKey: computed(() => ['mis-pedidos-pagos', filters.value]),
            queryFn: async () => {
                const data = await getMisPedidosPagosFn(filters.value);
                return data
            },
            enabled: computed(() => true),
        });
        return { data, isPending, refetch, isRefetching }
    }

    return {
        filters,
        useGetMisPedidosPagos,
        estadoPedidos,
    }
}

export default useMassivePayments;

