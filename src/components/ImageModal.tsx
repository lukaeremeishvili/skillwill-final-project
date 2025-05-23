import React from "react";
import type { UnsplashPhoto } from "../types/image.interface";

interface ImageModalProps {
  photo: UnsplashPhoto | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <img
          src={photo.urls.regular}
          alt={photo.alt_description || "Photo"}
          className="w-full max-h-[65vh] object-contain rounded-md mb-6"
          loading="lazy"
        />

        <div className="space-y-3 text-gray-800 dark:text-gray-200">
          <h2 className="text-xl font-semibold leading-tight">
            {photo.description || photo.alt_description || "No Description"}
          </h2>
          <p className="text-sm">
            By <span className="font-medium">{photo.user.name}</span> (@
            {photo.user.username})
          </p>
          <p className="text-sm">Likes: {photo.likes}</p>
          <a
            href={photo.links.html}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            View on Unsplash
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
