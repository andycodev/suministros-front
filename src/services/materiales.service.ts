import baseApi from '@/api/baseApi';

const endPointUrl = '/api/suministros';

export const getMaterialesPersonaFn = async () => {
    const { data: { data } } = await baseApi.get(`${endPointUrl}/materiales-personas`);
    return data;
}

export const getMaterialesIglesiaFn = async () => {
    const { data: { data } } = await baseApi.get(`${endPointUrl}/materiales-iglesias`);
    return data;
}


