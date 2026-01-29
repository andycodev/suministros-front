<template>
    <div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
        <div class="card w-full max-w-sm bg-base-100 shadow-2xl">
            <div class="card-body">
                <div class="card-header text-center">
                    <h1 class="text-2xl font-bold">Iniciar Sesión</h1>
                    <h2 class="text-sm font-semibold">Director de Publicaciones</h2>
                </div>
                <form @submit.prevent="handleLogin" class="space-y-4">

                    <div v-if="isErrorLogin" class="alert alert-error shadow-lg py-2">
                        <span class="text-sm font-medium">
                            {{ errorLogin?.message || 'Error de credenciales' }}
                        </span>
                    </div>

                    <div class="form-control">
                        <label class="label"><span class="label-text font-semibold">Usuario</span></label>
                        <input v-model="form.email" type="text" class="input input-bordered" required />
                    </div>

                    <div class="form-control">
                        <label class="label"><span class="label-text font-semibold">Contraseña</span></label>
                        <input v-model="form.password" type="password" class="input input-bordered" required />
                    </div>

                    <div class="form-control mt-6">
                        <button type="submit" class="btn btn-primary btn-block no-animation"
                            :class="{ 'loading': isPendingLogin }" :disabled="isPendingLogin">
                            {{ isPendingLogin ? 'Verificando...' : 'Entrar al Sistema' }}
                        </button>
                        <router-link to="/order" class="btn btn-outline btn-block btn-warning mt-4">
                            Volver al pedidos
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import useAuth from '@/composables/useAuth';

const { useLogin } = useAuth();
const { mutate: login, isPending: isPendingLogin, isError: isErrorLogin, error: errorLogin } = useLogin();

const form: any = reactive({
    email: 'juanperez@gmail.com',
    password: '12345678'
});

const handleLogin = () => {
    // TanStack Query se encarga de no duplicar si ya está 'isPending'
    login(form);
};
</script>