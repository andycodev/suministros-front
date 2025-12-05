import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { getMaterialesPersonaFn } from '@/services/materiales.service';

const usePedido = () => {

    function useGetMaterialesPersona() {
        const { data, isPending, refetch, isRefetching } = useQuery({
            queryKey: computed(() => ['materiales-persona']),
            queryFn: async () => {
                const data = await getMaterialesPersonaFn()
                return data
            },
            enabled: computed(() => false),
        });
        return { data, isPending, refetch, isRefetching }
    }

    return {
        useGetMaterialesPersona,
    }
}

export default usePedido;

