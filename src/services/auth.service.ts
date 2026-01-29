import baseApi from '@/api/baseApi';

const endPointUrl = '/api/auth';

export const loginFn = async (payload: any) => {
    const { data } = await baseApi.post(`${endPointUrl}/login`, payload);
    return data;
}
