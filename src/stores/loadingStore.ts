import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('loading', () => {
    const isGlobalLoading = ref(false);
    const loadingText = ref('');
    const loadingColor = ref('neutral'); // Valor por defecto

    return { isGlobalLoading, loadingText, loadingColor };
});