"use client";
import Image from "next/image";
import { gsap } from "gsap";
import React, { useRef, useEffect, useState } from "react";

const HomeSection = () => {
  const refSpanText = useRef<HTMLSpanElement>(null);
  const refSection = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    const drawer = drawerRef.current;
    const arrow = arrowRef.current;

    if (!drawer || !arrow) return;

    if (isDrawerOpen) {
      // Close drawer - slide out to the right
      gsap.to(drawer, {
        x: "100%",
        duration: 0.5,
        ease: "power2.inOut",
      });

      // Rotate arrow back
      gsap.to(arrow, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      // Open drawer - slide in from the right
      gsap.to(drawer, {
        x: "0",
        duration: 0.5,
        ease: "power2.inOut",
      });

      // Rotate arrow
      gsap.to(arrow, {
        rotation: 180,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    setIsDrawerOpen(!isDrawerOpen);
  };

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
    if (drawerRef.current) {
      gsap.set(drawerRef.current, { x: "100%" });
    }
  }, []);

  return (
    <>
      <section
        id="hero"
        ref={refSection}
        className={`relative px-8 size-full opacity-0 py-20 md:py-0`}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 h-full max-w-6xl m-auto text-center md:text-left">
          <div className="flex-1 order-2 md:order-1 px-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              Hello! My name is{" "}
              <span ref={refSpanText} className="text-blue-500 relative" />
            </h1>
            <p className="text-sm md:text-md leading-8 mb-4 text-justify">
              A 22-years old web developer, lived in Rosario, Cavite,
              Philippines. A Bachelor of Science in Information Technology in
              Cavite State University - Main Campus{" "}
              <span
                className="text-blue-500 font-semibold relative before:absolute before:content-[''] before:w-full before:h-[1px] before:bg-blue-500 before:-bottom-1 before:left-0 before:transition-all before:duration-300 hover:before:w-0 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-300"
                title="Full Stack Web Developer"
              >
                specializing in full-stack web development{" "}
              </span>
              . I am highly motivated and eager to learn new web technologies
              and frameworks to help me improve my skills as a developer.
            </p>
          </div>
          <div className="relative flex-1 w-full max-w-xs order-1 md:order-2">
            <div className="relative h-[20rem]">
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

        <div
          ref={drawerRef}
          className="fixed z-50 top-1/2 right-0 transform -translate-y-1/2 flex flex-col gap-3 bg-white dark:bg-gray-900 p-4 rounded-l-lg shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <button
            onClick={toggleDrawer}
            className="absolute -left-[41px] top-1/2 transform -translate-y-1/2 p-2 rounded-l-lg bg-gray-900 hover:bg-gray-600 border border-gray-200 dark:border-gray-700 border-r-0 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Toggle social links"
          >
            <svg
              ref={arrowRef}
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* GitHub */}
          <a
            href="https://github.com/Hakdoooooooooooog"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800/50 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-300 group"
            title="GitHub Profile"
          >
            <svg
              className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform duration-200"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/drnz.hcp"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800/50 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-300 group"
            title="Facebook Profile"
          >
            <svg
              className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform duration-200"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:hicap.darenzjasper@gmail.com"
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800/50 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-300 group"
            title="Send Email"
          >
            <svg
              className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform duration-200"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.273L12 9.982l10.091-6.16h.273c.904 0 1.636.731 1.636 1.635z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/darenz-jasper-hicap"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800/50 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-300 group"
            title="LinkedIn Profile"
          >
            <svg
              className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform duration-200"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
};

export default HomeSection;
