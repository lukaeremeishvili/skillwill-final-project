import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { fetchPhotos, searchPhotos } from '../api/unsplash';
import type { UnsplashPhoto } from '../types/image.interface';

interface UsePhotosParams {
    query: string;
}

export interface PageResult {
    results: UnsplashPhoto[];
    nextPage?: number;
}

const PAGE_SIZE = 20;
const CACHE_PREFIX = 'photos_';

export const usePhotos = ({ query }: UsePhotosParams) => {
    const isSearch = !!query;
    const queryKey: [string] = [CACHE_PREFIX + (isSearch ? 'search_' + query : 'popular')];

    return useInfiniteQuery<
        PageResult,
        Error,
        InfiniteData<PageResult>,
        [string]
    >({
        queryKey,
        queryFn: async ({ pageParam = 1 }) => {
            const page = pageParam as number;

            let results: UnsplashPhoto[];
            if (isSearch) {
                const data = await searchPhotos(query, page);
                results = data.results;
            } else {
                results = await fetchPhotos(page);
            }

            return {
                results,
                nextPage: results.length === PAGE_SIZE ? page + 1 : undefined,
            };
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};
