"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface ImageModalProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  src,
  alt,
  width = 300,
  height = 200,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className="cursor-pointer transition-transform hover:scale-105 relative group"
        onClick={openModal}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && openModal()}
        aria-label={`Open image modal for ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority
          sizes="(max-width: 768px) 300px, (max-width: 1200px) 500px, 300px"
          className={`${className}`}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mx-auto mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
            <span className="text-sm font-medium">Click to enlarge</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl max-h-[75vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-0 right-4 z-10 border border-gray-300 dark:border-gray-600 text-white hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image container */}
            <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 95vw, (max-width: 1200px) 80vw, 70vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;
