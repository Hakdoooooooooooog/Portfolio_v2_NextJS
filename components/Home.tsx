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
      className={`relative p-8 gap-12 w-full m-auto opacity-0`}
    >
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-[1200px] m-auto text-center md:text-left px-10">
        <div className="flex-1 order-2 md:order-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Hello! My name is{" "}
            <span ref={refSpanText} className="text-blue-500 relative" />
          </h1>
          <p className="text-sm md:text-md leading-8 mb-4 text-justify">
            A 22-years old web developer, lived in Rosario, Cavite, Philippines.
            A Bachelor of Science in Information Technology in Cavite State
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
        <div className="relative flex-1 w-full max-w-2xs order-1 md:order-2">
          <div className="h-[20rem]">
            <Image
              priority
              loading="eager"
              src="/images/profile.jpg"
              alt="Profile Picture"
              fill
              sizes="(max-width: 768px) 320px, (max-width: 1200px) 320px, 320px"
              className="relative z-1 rounded-lg m-auto"
            />
            <span className="absolute z-0 top-4 left-4 border-3 border-gray-500 text-white text-xs px-2 py-1 rounded size-full" />
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-3">
        {/* GitHub */}
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800/50 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <svg
            className="w-6 h-6 text-gray-700 dark:text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>

        {/* Facebook */}
        <a
          href="https://facebook.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800/50 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <svg
            className="w-6 h-6 text-blue-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>

        {/* Indeed */}
        <a
          href="https://profile.indeed.com/p/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800/50 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <svg
            className="w-6 h-6 text-blue-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M14.822 10.308a3.018 3.018 0 111.32-4.038 3.006 3.006 0 01-1.32 4.044zM11.6.572c2.47-.901 5.294-.852 7.408.982a3.587 3.587 0 011.023 1.37c.213.69-.749-.07-.88-.168a9.407 9.407 0 00-2.15-1.095C12.837.386 8.897 2.707 6.463 6.316a19.505 19.505 0 00-2.248 5.126 2.918 2.918 0 01-.213.642c-.107.204-.049-.547-.049-.572a15.821 15.821 0 01.43-2.239C5.511 5.34 8.01 2.065 11.6.565zm.037 20.993v-8.763c.249.025.486.037.736.037a6.167 6.167 0 003.219-.895v9.62c0 .822-.15 1.43-.52 1.826A1.874 1.874 0 0113.62 24a1.825 1.825 0 01-1.427-.609c-.368-.404-.56-1.013-.56-1.825z"
            />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800/50 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <svg
            className="w-6 h-6 text-blue-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HomeSection;
