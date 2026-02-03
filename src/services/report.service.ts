import baseApi from '@/api/baseApi';

const endPointUrl = '/api/reportes';

export const getMisPedidosFn = async (filters: any) => {
    const { data } = await baseApi.get(`${endPointUrl}/mis-pedidos`, { params: filters });
    return data;
}

