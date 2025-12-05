import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

//configuracion global de vue-query
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // Desactiva los reintentos
            refetchOnWindowFocus: false, // Opcional: evita que las consultas se vuelvan a ejecutar al enfocar la ventana
        },
    },
});

const app = createApp(App)
app.use(VueQueryPlugin, { queryClient })
app.use(router)
app.mount('#app')
