"use client";
import Image from "next/image";
import { gsap } from "gsap";
import React, { useRef, useEffect } from "react";

const HomeSection = () => {
  const refSpanText = useRef<HTMLSpanElement>(null);
  const refSection = useRef<HTMLDivElement>(null);

  const animateText = () => {
    if (refSpanText.current) {
      const text = "Darenz Jasper A. Hicap";
      refSpanText.current.textContent = "";
      const tl = gsap.timeline();

      tl.to(refSection.current, {
        opacity: 1,
        duration: 0.5,
        ease: "none",
      }).to(refSpanText.current, {
        duration: 0.5,
        ease: "none",
        onUpdate: function () {
          const progress = this.progress();
          const currentLength = Math.floor(progress * text.length);
          if (refSpanText.current) {
            refSpanText.current.textContent =
              text.substring(0, currentLength) + "|";
          }
        },
        onComplete: function () {
          if (refSpanText.current) {
            refSpanText.current.innerHTML =
              text + '<span class="inline-block animate-pulse">|</span>';
          }
        },
      });
    }
  };

  useEffect(() => {
    animateText();
  }, []);

  return (
    <section
      id="hero"
      ref={refSection}
      className={`flex items-center p-8 gap-12 m-auto max-w-[1200px] flex-wrap-reverse opacity-0`}
    >
      <div className="flex-[1_0_70%] mb-6 text-justify self-start">
        <h1 className="text-3xl font-bold mb-4">
          Hello! My name is{" "}
          <span ref={refSpanText} className="text-blue-500 relative" />
        </h1>
        <p className="text-md leading-8 mb-4">
          A 22-years old web developer, lived in Rosario, Cavite, Philippines. A
          Bachelor of Science in Information Technology in Cavite State
          University - Main Campus{" "}
          <span
            className="text-blue-500 font-semibold relative before:absolute before:content-[''] before:w-full before:h-[1px] before:bg-blue-500 before:-bottom-1 before:left-0 before:transition-all before:duration-300 hover:before:w-0 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-300"
            title="Full Stack Web Developer"
          >
            specializing in full-stack web development{" "}
          </span>
          . I am highly motivated and eager to learn new web technologies and
          frameworks to help me improve my skills as a developer.
        </p>
      </div>
      <div className="relative flex-[1_1_auto] w-full max-w-[256px] max-h-[20rem] m-auto">
        <div className="h-[20rem]">
          <Image
            priority
            loading="eager"
            src="/profile.jpg"
            alt="Profile Picture"
            fill
            sizes="(max-width: 768px) 320px, (max-width: 1200px) 320px, 320px"
            className="relative z-1 rounded-lg m-auto"
          />
          <span className="absolute z-0 top-4 left-4 border-3 border-gray-500 text-white text-xs px-2 py-1 rounded size-full" />
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
