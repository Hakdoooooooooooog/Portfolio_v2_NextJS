"use client";

import useIsSmallDevice from "@/portfolio/utils/hooks/useIsSmallDevice";
import { TSkillData } from "@/portfolio/utils/types";
import Image from "next/image";
import { useMemo } from "react";

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

  const imageSize = isSmallDevice ? 50 : 75;

  const adjustedPosition = useMemo(() => {
    if (!position) return { x: 0, y: 0 };

    const scaleFactor = isSmallDevice ? 0.65 : 1;
    return {
      x: position.x * scaleFactor,
      y: position.y * scaleFactor,
    };
  }, [position, isSmallDevice]);

  const baseStyles = `bg-gray-300/75 dark:bg-gray-800/75 border border-amber-600 rounded-lg duration-300 ${
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
