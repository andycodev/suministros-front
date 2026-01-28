import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { createPedidoFn, getMaterialesPersonaFn, getMaterialesIglesiaFn, showPedidoByIdPersonaFn } from '@/services/pedido.service';

const usePedido = () => {

    const queryClient: any = useQueryClient();
    const router: any = useRouter()
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

    function useGetMaterialesIglesia() {
        const { data, isLoading, isPending, refetch, isRefetching } = useQuery({
            queryKey: computed(() => ['materiales-iglesia']),
            queryFn: async () => {
                const data = await getMaterialesIglesiaFn()
                return data
            },
            enabled: computed(() => false),
        });
        return { data, isLoading, isPending, refetch, isRefetching }
    }

    function useShowPedidoByIdPersona() {
        const { data, isLoading, isPending, refetch, isRefetching } = useQuery({
            queryKey: computed(() => ['show-pedido-by-id-persona', selectedPersona.value?.id_persona]),
            queryFn: async () => {
                const data = await showPedidoByIdPersonaFn(selectedPersona.value?.id_persona)
                return data
            },
            enabled: computed(() => false),
        });
        return { data, isLoading, isPending, refetch, isRefetching }
    }

    /*     function useCreatePedido() {
            const { mutate, isPending, isError, isSuccess } = useMutation({
                mutationKey: ['create-pedido'],
                mutationFn: (payload: any) => createPedidoFn(payload),
                onSuccess: (data) => {
                    //queryClient.refetchQueries({ queryKey: ['pedidos'] })
                    console.log('dataResponse', data)
                    router.push(`/order/pay/${data.id_pedido}`)
                }
            });
            return { mutate, isPending, isError, isSuccess };
        } */

    function useCreatePedido() {
        const { mutate, isPending, isSuccess, isError } = useMutation({
            mutationKey: ['create-pedido'],
            mutationFn: (payload) => createPedidoFn(payload),
            onSuccess: (data) => {
                console.log('dataResponse', data)
                const { id_pedido } = data;
                if (id_pedido) {
                    const routePath = `/order/pay/${id_pedido}`;
                    router.push(routePath);
                }
                return data;
            }
        });
        return { mutate, isPending, isSuccess, isError };
    }

    return {
        selectedPersona,
        materiales,
        useGetMaterialesPersona,
        useGetMaterialesIglesia,
        useShowPedidoByIdPersona,
        useCreatePedido,
    }
}

export default usePedido;

