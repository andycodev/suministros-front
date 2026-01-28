<template>
    <div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
        <div class="card w-full max-w-sm bg-base-100 shadow-2xl">
            <div class="card-body">
                <div class="flex flex-col items-center mb-4">
                    <div
                        class="w-16 h-16 bg-primary text-primary-content rounded-full flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h2 class="card-title text-center text-xl uppercase tracking-wider">Iniciar sesión</h2>
                    <span class="badge badge-ghost">Acceso Directores de Publicaciones</span>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-4">

                    <div v-if="errorMessage" class="alert alert-error shadow-lg py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-sm font-medium">{{ errorMessage }}</span>
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Usuario</span>
                        </label>
                        <input v-model="form.username" type="text" placeholder="director.publicaciones"
                            class="input input-bordered focus:input-primary" required />
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Contraseña</span>
                        </label>
                        <input v-model="form.password" type="password" placeholder="••••••••"
                            class="input input-bordered focus:input-primary" required />
                        <label class="label">
                            <a href="#" class="label-text-alt link link-hover">¿Olvidó su contraseña?</a>
                        </label>
                    </div>

                    <div class="form-control mt-6">
                        <button class="btn btn-primary btn-block no-animation" :class="{ 'loading': isLoading }"
                            :disabled="isLoading">
                            {{ isLoading ? 'Verificando...' : 'Entrar al Sistema' }}
                        </button>
                    </div>

                    <div class="form-control mt-4">
                        <router-link to="/order" class="btn btn-outline btn-block">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver a Pedidos
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Usamos reactive para agrupar campos del formulario
const form = reactive({
    username: '',
    password: ''
});

const isLoading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
    isLoading.value = true;
    errorMessage.value = '';

    // Simulación de validación
    setTimeout(() => {
        if (form.username === 'director' && form.password === 'admin123') {
            // Éxito: Guardamos un "token" ficticio y redirigimos al panel de control
            localStorage.setItem('isDirectorAuth', 'true');
            localStorage.setItem('directorUser', form.username);
            router.push('/director/dashboard');
        } else {
            // Error
            errorMessage.value = 'Credenciales inválidas para el director.';
            isLoading.value = false;
        }
    }, 1200);
};
</script>

<style scoped>
/* Estilo opcional para que el fondo se vea más profesional */
.bg-base-200 {
    background-image: radial-gradient(circle at center, rgba(0, 0, 0, 0.05) 0%, transparent 100%);
}
</style>