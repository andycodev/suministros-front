import baseApi from '@/api/baseApi';

const endPointUrl = '/api/suministros';

export const getMaterialesPersonaFn = async () => {
    const { data } = await baseApi.get(`${endPointUrl}/materiales-personas`);
    return data;
}

export const createPedidoFn = async (payload: any) => {
    const { data } = await baseApi.post(`${endPointUrl}/pedidos`, payload);
    return data;
}
