import { ref, computed } from 'vue';
import { useQuery, /* useQueryClient */ } from '@tanstack/vue-query';
import { getMisPedidosFn } from '@/services/report.service';
import usePersona from '@/composables/usePersona';


const useReport = () => {

    const { userData } = usePersona();
    /* Variables */
    //const queryClient: any = useQueryClient()
    const filters: any = ref({
        id_persona: userData.value?.id_persona ?? null,
        tipo: null,
        modalidad: null,
        estado: null,
        codigo: null,
    })

    function useGetMisPedidos() {
        const { data, isPending, refetch, isRefetching } = useQuery({
            queryKey: computed(() => ['mis-pedidos', filters.value]),
            queryFn: async () => {
                const data = await getMisPedidosFn(filters.value);
                return data
            },
            enabled: computed(() => true),
        });
        return { data, isPending, refetch, isRefetching }
    }

    return {
        filters,
        useGetMisPedidos,
    }
}

export default useReport;

