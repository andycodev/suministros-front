import baseApi from '@/api/baseApi';

const endPointUrl = '/api/suministros';

export const getPeriodosFn = async () => {
    const { data: { data } } = await baseApi.get(`${endPointUrl}/periodos`);
    return data;
}

export const showPedidoByIdPedidoFn = async (id_pedido: number) => {
    const { data: { data } } = await baseApi.get(`${endPointUrl}/pedidos/${id_pedido}`);
    return data;
}

export const showPedidoByIdPersonaFn = async (id_persona: number) => {
    const { data: { data } } = await baseApi.get(`${endPointUrl}/pedidos/persona/${id_persona}`);
    return data;
}

export const showPedidoByIdDestinoFn = async (id_destino: number) => {
    const { data: { data } } = await baseApi.get(`${endPointUrl}/pedidos/destino/${id_destino}`);
    return data;
}

export const createPedidoFn = async (payload: any) => {
    const { data: { data } } = await baseApi.post(`${endPointUrl}/pedidos`, payload);
    return data;
}

/* export const createPedidoFn2 = async (data: any) => {
    const { data: response } = await baseApi.post(`${endPointUrl}/pedidos`, data);
    return response;
} */

export const updatePedidoFn = async (id_pedido: number, payload: any) => {
    const { data: { data } } = await baseApi.put(`${endPointUrl}/pedidos/${id_pedido}`, payload);
    return data;
}

export const deletePedidoFn = async (id_pedido: number) => {
    const { data: { data } } = await baseApi.delete(`${endPointUrl}/pedidos/${id_pedido}`);
    return data;
}

export const payAbono = async (payload: any) => {
    const { data: { data } } = await baseApi.post(`${endPointUrl}/pedidos/pago-abono`, payload);
    return data;
}

export const payPasarela = async (payload: any) => {
    const { data: { data } } = await baseApi.post(`${endPointUrl}/pedidos/pago-pasarela`, payload);
    return data;
}

export const payMasivo = async (payload: any) => {
    const { data: { data } } = await baseApi.post(`${endPointUrl}/pedidos/pago-masivo`, payload);
    return data;
}