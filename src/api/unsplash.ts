import axiosInstance from '../services/axios';
import type { UnsplashPhoto } from '../types/image.interface';

interface SearchResponse {
  results: UnsplashPhoto[];
  total: number;
  total_pages: number;
}

export const fetchPhotos = async (page: number): Promise<UnsplashPhoto[]> => {
  const response = await axiosInstance.get<UnsplashPhoto[]>('/photos', {
    params: { page, per_page: 20 },
  });
  return response.data;
};

export const searchPhotos = async (
  query: string,
  page: number
): Promise<SearchResponse> => {
  const response = await axiosInstance.get<SearchResponse>('/search/photos', {
    params: {
      query,
      page,
      per_page: 20,
    },
  });
  return response.data;
};
