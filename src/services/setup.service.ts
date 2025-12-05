import baseApi from '@/api/baseApi';

const endPointUrl = '/api/setup';

export const getIglesiaUnionsFn = async () => {
    const data = await baseApi.get(`${endPointUrl}/iglesia-unions`);
    return data;
}

export const getIglesiaCamposByUnion = async (id_union: number) => {
    const data = await baseApi.get(`${endPointUrl}/iglesia-campos-by-union/${id_union}`);
    return data;
}

export const getIglesiaDistritosByCampo = async (id_campo: number) => {
    const data = await baseApi.get(`${endPointUrl}/iglesia-distritos-by-campo/${id_campo}`);
    return data;
}

export const getIglesiaIglesiasByDistrito = async (id_distrito: number) => {
    const data = await baseApi.get(`${endPointUrl}/iglesia-iglesias-by-distrito/${id_distrito}`);
    return data;
}
