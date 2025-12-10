import baseApi from '@/api/baseApi';

const endPointUrl = '/api/suministros';

export const searchPersonaFn = async (filters: any) => {
    const { data } = await baseApi.get(`${endPointUrl}/personas/buscar`, { params: filters });
    return data;
}

