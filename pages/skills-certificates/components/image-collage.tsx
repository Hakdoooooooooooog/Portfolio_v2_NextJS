import Image from "next/image";

const ImageCollage = ({
  src,
  alt,
  position,
  index,
  show,
}: {
  src: string;
  alt: string;
  position: { x: number; y: number };
  index: number;
  show: boolean;
}) => {
  const baseStyles =
    "p-2 bg-gray-400/75 border border-amber-600 rounded-lg transition-transform hover:scale-110 duration-300";

  return (
    <div
      className="absolute skill-image top-1/2 left-1/2"
      style={{
        transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
        zIndex: 10 + index,
        opacity: show ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <Image
        src={src}
        alt={alt}
        height={75}
        width={75}
        className={baseStyles}
      />
    </div>
  );
};

export default ImageCollage;
