<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="isGlobalLoading"
                class="fixed inset-0 z-[99999] flex items-center justify-center bg-base-300/60 backdrop-blur-[2px] cursor-wait">

                <div
                    class="bg-base-100 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border border-base-content/5 scale-up">

                    <span class="loading loading-spinner w-12 h-12" :class="getColorClass"></span>

                    <p v-if="loadingText" class="text-sm font-medium text-base-content/80 text-center max-w-xs"
                        :class="getColorClass">
                        {{ loadingText }}
                    </p>

                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useLoadingStore } from '@/stores/loadingStore';

const store = useLoadingStore();
const { isGlobalLoading, loadingText, loadingColor } = storeToRefs(store);

const getColorClass = computed(() => {
    const colorKey = (loadingColor.value || 'primary').toLowerCase();
    const colors = {
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        info: 'text-info',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error',
        neutral: 'text-neutral',
        white: 'text-white',
    };
    return colors[colorKey] || 'text-primary';
});
</script>

<style scoped>
/* Transición de entrada/salida suave (Fade) */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Animación de escala sutil para la tarjeta */
.scale-up {
    animation: scale-up 0.3s ease-out;
}

@keyframes scale-up {
    0% {
        transform: scale(0.9);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>