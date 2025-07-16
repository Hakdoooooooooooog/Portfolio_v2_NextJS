import { TSkillData } from "@/portfolio/utils/types";
import Image from "next/image";

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
  const baseStyles =
    "p-2 bg-gray-400/75 border border-amber-600 rounded-lg transition-transform hover:scale-110 duration-300";

  // Provide default position if undefined
  const safePosition = position || { x: 0, y: 0 };

  return (
    <div
      className="absolute skill-image top-1/2 left-1/2"
      style={{
        transform: `translate(-50%, -50%) translate(${safePosition.x}px, ${safePosition.y}px)`,
        zIndex: 10 + index,
        opacity: show ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <Image
        src={src}
        alt={name}
        height={75}
        width={75}
        className={baseStyles}
      />
    </div>
  );
};

export default ImageCollage;
