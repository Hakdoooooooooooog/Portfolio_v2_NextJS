"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CertificatesData, skillsData } from "../../utils/constants";
import { ImageCollage } from "./components/image-collage";
import { Certificates } from "./components/Certificates";

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

export default SkillsAndCertificatesSection;
