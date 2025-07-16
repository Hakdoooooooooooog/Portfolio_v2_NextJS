"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CertificatesData, skillsData } from "../utils/constants";
import { TCertificate } from "../utils/types";
import ImageModal from "../components/modal-image";

gsap.registerPlugin(ScrollTrigger);

const SkillsAndCertificatesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const certificatesRef = useRef<HTMLDivElement>(null);
  const [showImages, setShowImages] = useState(false);

  const floatingAnimation = () => {
    if (!containerRef.current) return;
    const images = containerRef.current.querySelectorAll(".skill-image");

    images.forEach((image) => {
      if (!image || !(image instanceof HTMLElement)) return;

      gsap.to(image, {
        y: "+=10",
        duration: 1 + Math.random() * 2, // Random duration between 1-4 seconds
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2, // Random delay for each image
      });
    });
  };

  const showCertificatesOnScroll = () => {
    if (!certificatesRef.current) return;
    const certificates =
      certificatesRef.current.querySelectorAll(".certificates");
    certificates.forEach((cert) => {
      if (cert instanceof HTMLDivElement) {
        gsap.fromTo(
          cert,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: cert,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  };

  useEffect(() => {
    setShowImages(true);

    // Initialize animations
    floatingAnimation();
    showCertificatesOnScroll();
  }, []);

  return (
    <>
      <section className="w-full max-w-5xl mx-auto min-h-screen flex flex-wrap gap-8 items-center justify-center p-4">
        <h2
          className={`w-full md:w-auto md:flex-1 text-2xl font-bold text-center transition-opacity duration-500 ${
            showImages ? "opacity-100" : "opacity-0"
          }`}
        >
          Tech Stacks & Skills
        </h2>
        <div
          ref={containerRef}
          className="w-full md:w-96 md:flex-shrink-0 relative h-96 md:h-80"
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
      </section>

      <section className="w-full max-w-5xl mx-auto min-h-screen flex flex-col items-center gap-8 pb-20">
        <h2 className="text-2xl font-bold text-center pb-12">Certificates</h2>
        <div
          ref={certificatesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CertificatesData.sort(
            (a, b) =>
              new Date(b.metadata?.date || 0).getTime() -
              new Date(a.metadata?.date || 0).getTime()
          ).map((cert) => (
            <Certificates
              key={cert.id}
              src={cert.src}
              alt={cert.alt}
              metadata={cert.metadata}
              link={cert.link}
            />
          ))}
        </div>
      </section>
    </>
  );
};

const Certificates = ({ src, alt, metadata }: Omit<TCertificate, "id">) => {
  return (
    <div className="certificates bg-white dark:bg-gray-800/80 rounded-lg shadow-lg overflow-clip">
      <ImageModal
        src={src}
        alt={alt}
        width={300}
        height={200}
        className="w-full h-60 object-cover"
      />
      {metadata && (
        <div className="p-4">
          <div className="mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Issued: {new Date(metadata.date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Tags tags={metadata.tags} />
          </div>
        </div>
      )}
    </div>
  );
};

const Tags = ({ tags }: { tags: string[] }) => {
  return tags.map((tag, index) => (
    <span
      key={index}
      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
    >
      {tag}
    </span>
  ));
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

export default SkillsAndCertificatesSection;
