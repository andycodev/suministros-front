import baseApi from '@/api/baseApi';

const endPointUrl = '/api/suministros';

export const payMassiveFn = async (payload: FormData) => {
    const { data } = await baseApi.post(`${endPointUrl}/pedidos/pago-masivo`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
}


