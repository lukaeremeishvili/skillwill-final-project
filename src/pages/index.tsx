import React, { useState, useEffect, useCallback } from "react";
import { usePhotos } from "../hooks/usePhotos";
import SearchInput from "../components/SearchInput";
import ImageCard from "../components/ImageCard";
import ImageModal from "../components/ImageModal";
import { useDebounce } from "../hooks/useDebounce";
import type { UnsplashPhoto } from "../types/image.interface";
import type { PageResult } from "../hooks/usePhotos";

const IndexPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [selectedPhoto, setSelectedPhoto] = useState<UnsplashPhoto | null>(
    null
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = usePhotos({ query: debouncedSearchTerm });
  if (error) {
    console.error(error);
  }

  const allPhotos =
    data?.pages.flatMap((page: PageResult) => page.results) || [];

  const filteredPhotos = allPhotos;

  const handleScroll = useCallback(() => {
    if (isFetchingNextPage || !hasNextPage) return;
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 300;
    if (scrollPosition >= threshold) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-white transition-colors duration-300">
      <div className="fixed top-0 left-0 right-0 p-4 shadow-md z-50">
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
      </div>

      <div className="pt-20 max-w-7xl mx-auto px-4">
        {status === "success" && filteredPhotos.length === 0 && (
          <p className="text-center mt-4">No photos found.</p>
        )}
        {status === "error" && (
          <p className="text-center mt-4 text-red-500">Error loading photos.</p>
        )}

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center">
          {filteredPhotos.map((photo: UnsplashPhoto) => (
            <ImageCard
              key={photo.id}
              photo={photo}
              onClick={setSelectedPhoto}
            />
          ))}
        </div>

        {isFetchingNextPage && (
          <p className="text-center mt-4">Loading more...</p>
        )}
      </div>

      <ImageModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
};

export default IndexPage;
