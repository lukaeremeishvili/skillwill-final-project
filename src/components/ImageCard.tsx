import React from "react";
import type { UnsplashPhoto } from "../types/image.interface";

interface ImageCardProps {
  photo: UnsplashPhoto;
  onClick: (photo: UnsplashPhoto) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ photo, onClick }) => {
  return (
    <div
      className="cursor-pointer overflow-hidden rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 transform hover:scale-[1.03]"
      onClick={() => onClick(photo)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick(photo);
      }}
      aria-label={`Open details for photo by ${photo.user.name}`}
    >
      <div className="w-full aspect-[4/3] relative">
        <img
          src={photo.urls.small}
          alt={photo.alt_description || "Unsplash photo"}
          className="w-full h-full object-cover rounded-md"
          loading="lazy"
          draggable={false}
        />
      </div>
      <div className="p-2 text-sm text-black-700 dark:text-black-300 truncate">
         {photo.description || photo.alt_description || `❤️ ${photo.likes} likes`}
      </div>
    </div>
  );
};

export default ImageCard;
