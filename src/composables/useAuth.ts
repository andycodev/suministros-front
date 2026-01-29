import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { loginFn } from '@/services/auth.service';

const useAuth = () => {

    const queryClient: any = useQueryClient();
    const router: any = useRouter()

    function useLogin() {
        const { mutate, isPending, isSuccess, isError, error } = useMutation({
            mutationKey: ['login'],
            mutationFn: (payload) => loginFn(payload),
            // useAuth.ts
            onSuccess: (data) => {
                localStorage.setItem('isDirectorAuth', 'true');

                // Guardamos todo el objeto convertido a texto
                localStorage.setItem('directorData', JSON.stringify(data));

                const routePath = `/director/dashboard`;
                router.push(routePath);
            }
        });
        return { mutate, isPending, isSuccess, isError, error };
    }

    function useLogout() {
        localStorage.removeItem('isDirectorAuth');
        localStorage.removeItem('directorData');
        router.push('/login');
    }

    return {
        useLogin,
        useLogout,
    }
}

export default useAuth;

