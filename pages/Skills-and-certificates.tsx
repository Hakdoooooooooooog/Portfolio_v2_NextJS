"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

// Skill data configuration
const skillsData = [
  {
    src: "/images/skills/react.png",
    name: "React",
    position: { x: 30, y: -20 },
  },
  {
    src: "/images/skills/ts.png",
    name: "TypeScript",
    position: { x: 150, y: -20 },
  },
  {
    src: "/images/skills/postgresql.png",
    name: "PostgreSQL",
    position: { x: 170, y: -150 },
  },
  {
    src: "/images/skills/mysql.png",
    name: "MySQL",
    position: { x: -50, y: 60 },
  },
  { src: "/images/skills/git.png", name: "Git", position: { x: 90, y: 80 } },
  {
    src: "/images/skills/prisma.png",
    name: "Prisma",
    position: { x: -50, y: -100 },
  },
  {
    src: "/images/skills/nodejs-express-js.png",
    name: "Node.js",
    position: { x: -150, y: -150 },
  },
  {
    src: "/images/skills/tailwind-css.png",
    name: "Tailwind",
    position: { x: 60, y: -120 },
  },
  {
    src: "/images/skills/zustand.png",
    name: "Zustand",
    position: { x: -20, y: 140 },
  },
  {
    src: "/images/skills/aws-s3.png",
    name: "AWS S3",
    position: { x: -120, y: -20 },
  },
  {
    src: "/images/skills/react-query.png",
    name: "React Query",
    position: { x: -150, y: 120 },
  },
  { src: "/images/skills/zod.png", name: "Zod", position: { x: 190, y: 120 } },
];

const SkillsAndCertificatesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    setShowImages(true);

    if (!containerRef.current) return;

    const images = containerRef.current.querySelectorAll(".skill-image");

    // Add floating animation
    images.forEach((image) => {
      gsap.to(image, {
        y: "+=10",
        duration: 1 + Math.random() * 2, // Random duration between 2-4 seconds
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2, // Random delay for each image
      });
    });
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-wrap gap-8 items-center justify-center p-4">
      <h2 className="w-full md:w-auto md:flex-1 text-2xl font-bold text-center pb-12">
        Tech Stacks & Skills
      </h2>
      <div
        ref={containerRef}
        className="w-full md:w-96 md:flex-shrink-0 relative h-80 md:h-96"
      >
        {skillsData.map((skill, index) => (
          <ImageCollage
            key={skill.name}
            src={skill.src}
            alt={skill.name}
            position={skill.position}
            index={index}
            show={showImages}
          />
        ))}
      </div>
    </div>
  );
};

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
    "p-2 bg-gray-400/75 border border-amber-600 rounded-lg transition-transform hover:scale-110 cursor-pointer";

  return (
    <div
      className="absolute skill-image"
      style={{
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
        zIndex: 10 + index,
        opacity: show ? 1 : 0,
        transition: "opacity 0.5s",
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

export default SkillsAndCertificatesSection;
