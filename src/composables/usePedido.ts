import { ref, computed } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { createPedidoFn, getMaterialesPersonaFn } from '@/services/pedido.service';

const usePedido = () => {

    const queryClient: any = useQueryClient();
    const selectedPersona: any = ref(null);
    const materiales: any = ref([])

    function useGetMaterialesPersona() {
        const { data, isLoading, isPending, refetch, isRefetching } = useQuery({
            queryKey: computed(() => ['materiales-persona']),
            queryFn: async () => {
                const data = await getMaterialesPersonaFn()
                return data
            },
            enabled: computed(() => false),
        });
        return { data, isLoading, isPending, refetch, isRefetching }
    }

    function useCreatePedido() {
        const { mutate, isPending, isError, isSuccess } = useMutation({
            mutationKey: ['create-pedido'],
            mutationFn: (data: any) => createPedidoFn(data),
            onSuccess: () => queryClient.refetchQueries({ queryKey: ['pedidos'] })
        });
        return { mutate, isPending, isError, isSuccess };
    }

    return {
        selectedPersona,
        materiales,
        useGetMaterialesPersona,
        useCreatePedido,
    }
}

export default usePedido;

