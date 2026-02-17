import baseApi from '@/api/baseApi';

const endPointUrl = '/api/suministros';

export const getPeriodosFn = async () => {
    const { data } = await baseApi.get(`${endPointUrl}/periodos`);
    return data;
}

export const getMaterialesPersonaFn = async () => {
    const { data } = await baseApi.get(`${endPointUrl}/materiales-personas`);
    return data;
}

export const getMaterialesIglesiaFn = async () => {
    const { data } = await baseApi.get(`${endPointUrl}/materiales-iglesias`);
    return data;
}

export const showPedidoByIdPedidoFn = async (id_pedido: number) => {
    const { data } = await baseApi.get(`${endPointUrl}/pedidos/${id_pedido}`);
    return data;
}

export const showPedidoByIdPersonaFn = async (id_persona: number) => {
    const { data } = await baseApi.get(`${endPointUrl}/pedidos/persona/${id_persona}`);
    return data;
}

export const showPedidoByIdDestinoFn = async (id_destino: number) => {
    const { data } = await baseApi.get(`${endPointUrl}/pedidos/destino/${id_destino}`);
    return data;
}

export const createPedidoFn = async (payload: any) => {
    const { data } = await baseApi.post(`${endPointUrl}/pedidos`, payload);
    return data;
}
