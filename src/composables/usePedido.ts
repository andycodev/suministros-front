import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { createPedidoFn, getMaterialesPersonaFn, getMaterialesIglesiaFn, showPedidoByIdPersonaFn, showPedidoByIdDestinoFn, getPeriodosFn } from '@/services/pedido.service';

const usePedido = () => {

    const queryClient: any = useQueryClient();
    const route = useRoute();
    const router = useRouter();
    const selectedPersona: any = ref(null);
    const materiales: any = ref([])


    function useGetPeriodos() {
        const { data, isLoading, isPending, refetch, isRefetching } = useQuery({
            queryKey: computed(() => ['periodos']),
            queryFn: async () => {
                const data = await getPeriodosFn()
                return data
            },
            enabled: computed(() => true),
        });
        return { data, isLoading, isPending, refetch, isRefetching }
    }

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

    function useShowPedidoByIdDestino() {
        const { data, isLoading, isPending, refetch, isRefetching } = useQuery({
            queryKey: computed(() => ['show-pedido-by-id-destino', selectedPersona.value?.id_persona]),
            queryFn: async () => {
                const data = await showPedidoByIdDestinoFn(selectedPersona.value?.id_persona)
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
                const { id_pedido } = data;
                if (id_pedido) {
                    // 1. Detectamos si la ruta actual contiene "/director"
                    const isDirector = route.path.includes('/director');

                    // 2. Construimos la ruta base según el caso
                    const basePath = isDirector ? '/director/order/pay' : '/order/pay';

                    // 3. Redireccionamos
                    router.push(`${basePath}/${id_pedido}`);
                }
                return data;
            }
        });
        return { mutate, isPending, isSuccess, isError };
    }

    return {
        selectedPersona,
        materiales,
        useGetPeriodos,
        useGetMaterialesPersona,
        useGetMaterialesIglesia,
        useShowPedidoByIdPersona,
        useShowPedidoByIdDestino,
        useCreatePedido,
    }
}

export default usePedido;

