import { ref, watch, computed } from 'vue';
import { useQuery, /* useQueryClient */ } from '@tanstack/vue-query';
import { getIglesiaUnionsFn, getIglesiaCamposByUnion, getIglesiaDistritosByCampo, getIglesiaIglesiasByDistrito } from '@/services/setup.service';
import { searchPersonaFn } from '@/services/persona.service';

const usePersona = () => {

    /* Variables */
    //const queryClient: any = useQueryClient()
    const filters: any = ref({
        id_union: 17112,
        id_campo: null,
        id_distrito: null,
        id_iglesia: null,
        documento: null,
    })

    /* Methods */
    function useGetIglesiaUnions() {
        const { data, isPending } = useQuery({
            queryKey: computed(() => ['iglesia-unions']),
            queryFn: async () => {
                const data = await getIglesiaUnionsFn()
                //  filters.value.id_union = data[0]?.id_union || null
                return data
            },
            enabled: computed(() => true),
        });
        return { data, isPending }
    }

    function useGetIglesiaCamposByUnion() {
        const { data, isPending } = useQuery({
            queryKey: computed(() => ['iglesia-campos-by-union', filters.value.id_union]),
            queryFn: async () => {
                const data = await getIglesiaCamposByUnion(filters.value.id_union);
                // filters.value.id_campo = data[0]?.id_campo || null
                return data
            },
            enabled: computed(() => !!filters.value.id_union),
        });
        watch(() => filters.value.id_union, () => filters.value.id_campo = null);
        return { data, isPending }
    }

    function useGetIglesiaDistritosByCampo() {
        const { data, isPending } = useQuery({
            queryKey: computed(() => ['iglesia-distritos-by-campo', filters.value.id_campo]),
            queryFn: async () => {
                const data = await getIglesiaDistritosByCampo(filters.value.id_campo);
                // filters.value.id_distrito = data[0]?.id_distrito || null
                return data
            },
            enabled: computed(() => !!filters.value.id_campo),
        });
        watch(() => filters.value.id_campo, () => filters.value.id_distrito = null);
        return { data, isPending }
    }

    function useGetIglesiaIglesiasByDistrito() {
        const { data, isPending } = useQuery({
            queryKey: computed(() => ['iglesia-iglesias-by-distrito', filters.value.id_distrito]),
            queryFn: async () => {
                const data = await getIglesiaIglesiasByDistrito(filters.value.id_distrito);
                // filters.value.id_iglesia = data[0]?.id_iglesia || null
                return data
            },
            enabled: computed(() => !!filters.value.id_distrito),
        });
        watch(() => filters.value.id_distrito, () => filters.value.id_iglesia = null);
        return { data, isPending }
    }

    function useSearchPersona() {
        const { data, isPending, refetch, isRefetching } = useQuery({
            queryKey: computed(() => ['search-persona', filters.value]),
            queryFn: async () => {
                const data = await searchPersonaFn(filters.value);
                return data
            },
            enabled: computed(() => false),
        });
        return { data, isPending, refetch, isRefetching }
    }


    return {
        filters,
        useGetIglesiaUnions,
        useGetIglesiaCamposByUnion,
        useGetIglesiaDistritosByCampo,
        useGetIglesiaIglesiasByDistrito,
        useSearchPersona
    }
}

export default usePersona;

