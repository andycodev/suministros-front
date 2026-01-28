<template>
    <div class="flex h-screen bg-base-200">
        <!-- Sidebar -->
        <aside class="w-64 bg-base-100 shadow-xl flex-shrink-0 relative">
            <div class="p-4">
                <div class="flex items-center space-x-3 mb-8">
                    <div
                        class="w-12 h-12 bg-primary text-primary-content rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <div>
                        <h2 class="font-bold text-lg">Director</h2>
                        <p class="text-sm text-gray-500">Publicaciones</p>
                    </div>
                </div>

                <!-- Church Name Header -->
                <div class="mb-6 p-3 bg-gradient-to-r from-primary to-primary/80 rounded-lg shadow-md">
                    <div class="text-center">
                        <p class="text-xs text-primary-content/80 font-medium uppercase tracking-wider mb-1">Iglesia</p>
                        <h3 class="text-lg font-bold text-primary-content">EL INTI</h3>
                    </div>
                </div>

                <ul class="menu p-0 text-base-content">
                    <li>
                        <router-link to="/director/dashboard" class="flex items-center space-x-3"
                            :class="{ 'active': isActive('/director/dashboard') }">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>Dashboard</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/director/order" class="flex items-center space-x-3"
                            :class="{ 'active': isActive('/director/order') }">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span>Pedidos</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/director/materials" class="flex items-center space-x-3"
                            :class="{ 'active': isActive('/director/materials') }">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span>Materiales</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/director/reports" class="flex items-center space-x-3"
                            :class="{ 'active': isActive('/director/reports') }">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1m3-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v6m9-1h-6" />
                            </svg>
                            <span>Reportes</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/director/settings" class="flex items-center space-x-3"
                            :class="{ 'active': isActive('/director/settings') }">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Configuración</span>
                        </router-link>
                    </li>
                </ul>
            </div>

            <!-- Fixed Action Button at Bottom -->
            <div class="absolute bottom-0 left-0 right-0 p-4 bg-base-100 border-t border-base-300">
                <router-link to="/order"
                    class="block w-full bg-secondary text-secondary-content font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-center">
                    <div class="flex items-center justify-center space-x-2">
                        <span>Realizar Pedido Personal</span>
                    </div>
                </router-link>
            </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col">
            <!-- Navbar -->
            <header class="bg-base-100 shadow-lg">
                <div class="navbar">
                    <div class="flex-1">
                        <!-- <h1 class="text-xl font-bold">Panel de Control - Director de Publicaciones</h1> -->
                    </div>
                    <div class="flex-none">
                        <div class="dropdown dropdown-end">
                            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                                <div
                                    class="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </label>
                            <ul tabindex="0"
                                class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                <li><a @click="logout" class="text-error">Cerrar sesión</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Page Content -->
            <main class="flex-1 p-6 overflow-auto">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const isActive = (path: string) => {
    return route.path === path;
};

const logout = () => {
    localStorage.removeItem('isDirectorAuth');
    localStorage.removeItem('directorUser');
    router.push('/login-director');
};
</script>

<style scoped>
.active {
    background-color: hsl(var(--p));
    color: blue;
}
</style>
