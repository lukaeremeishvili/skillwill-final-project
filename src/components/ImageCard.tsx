import React from "react";
import type { UnsplashPhoto } from "../types/image.interface";

interface ImageCardProps {
  photo: UnsplashPhoto;
  onClick: (photo: UnsplashPhoto) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ photo, onClick }) => {
  return (
    <div
      className="relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 border border-transparent hover:border-blue-400"
      onClick={() => onClick(photo)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick(photo);
      }}
      aria-label={`Open details for photo by ${photo.user.name}`}
    >
      <div className="w-full h-64 relative">
        <img
          src={photo.urls.small}
          alt={photo.alt_description || "Unsplash photo"}
          className="w-full h-full object-cover rounded-lg select-none"
          loading="lazy"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-3">
          <p className="text-sm text-white font-semibold drop-shadow-md truncate">
            {photo.user.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
