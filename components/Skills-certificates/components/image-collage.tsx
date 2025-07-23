"use client";

import { TSkillData } from "@/portfolio/utils/types";
import Image from "next/image";
import { useState, useEffect } from "react";

// Custom hook to detect small viewport
const useIsSmallDevice = (breakpoint: number = 768) => {
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallDevice(window.innerWidth < breakpoint);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);

  return isSmallDevice;
};

const ImageCollage = ({
  src,
  name,
  position,
  index,
  show,
}: TSkillData & {
  index: number;
  show: boolean;
}) => {
  const isSmallDevice = useIsSmallDevice();

  // Adjust size based on device
  const imageSize = isSmallDevice ? 50 : 75;

  // Scale down position for small devices
  const adjustedPosition = position
    ? {
        x: isSmallDevice ? position.x * 0.6 : position.x,
        y: isSmallDevice ? position.y * 0.6 : position.y,
      }
    : { x: 0, y: 0 };

  const baseStyles = `p-2 bg-gray-400/75 border border-amber-600 rounded-lg transition-transform hover:scale-110 duration-300 ${
    isSmallDevice ? "p-1" : "p-2"
  }`;

  return (
    <div
      className="absolute skill-image top-1/2 left-1/2"
      style={{
        transform: `translate(-50%, -50%) translate(${adjustedPosition.x}px, ${adjustedPosition.y}px)`,
        zIndex: 10 + index,
        opacity: show ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <Image
        src={src}
        alt={name}
        height={imageSize}
        width={imageSize}
        className={baseStyles}
      />
    </div>
  );
};

export default ImageCollage;
