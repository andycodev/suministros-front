// composables/useLoadingTracker.ts
import { useQueryClient } from '@tanstack/vue-query';
import { useLoadingStore } from '@/stores/loadingStore';

export const useLoadingTracker = () => {
    const queryClient = useQueryClient();
    const loadingStore = useLoadingStore();

    const update = () => {
        const activeQuery = queryClient.getQueryCache().findAll({ fetchStatus: 'fetching' })
            .find(q => q.meta?.show === true);

        const activeMutation = queryClient.getMutationCache().findAll({ status: 'pending' })
            .find(m => m.meta?.show === true);

        const current = activeQuery || activeMutation;

        if (current) {
            loadingStore.isGlobalLoading = true;
            loadingStore.loadingText = (current.meta?.text as string) || '';
            loadingStore.loadingColor = (current.meta?.color as string) || 'neutral';
        } else {
            loadingStore.isGlobalLoading = false;
            loadingStore.loadingText = '';
            loadingStore.loadingColor = 'neutral';
        }
    };

    queryClient.getQueryCache().subscribe(update);
    queryClient.getMutationCache().subscribe(update);
};