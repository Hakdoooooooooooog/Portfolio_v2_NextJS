import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Darenz Jasper Hicap — Junior Full-Stack Developer",
    short_name: "Hicap Portfolio",
    description:
      "Personal portfolio of Darenz Jasper Hicap, junior full-stack developer specializing in Next.js, NestJS, TypeScript, and cloud architecture.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F7F7FB",
    theme_color: "#0A0F2C",
    orientation: "portrait",
    dir: "ltr",
    lang: "en",
    categories: ["portfolio", "developer", "technology"],
    icons: [
      {
        src: "/images/pwa-icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/pwa-icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/pwa-icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/pwa-icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/pwa-icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcuts: [
      {
        name: "Selected Work",
        short_name: "Work",
        description: "View featured full-stack projects and case studies",
        url: "/#projects",
        icons: [{ src: "/images/pwa-icons/android-chrome-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Experience",
        short_name: "Experience",
        description: "View professional work history and timeline",
        url: "/#experiences",
        icons: [{ src: "/images/pwa-icons/android-chrome-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Skills & Credentials",
        short_name: "Skills",
        description: "Inspect technical skills and verified credentials",
        url: "/#skills",
        icons: [{ src: "/images/pwa-icons/android-chrome-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Contact Me",
        short_name: "Contact",
        description: "Send a message or request a project walkthrough",
        url: "/#contact",
        icons: [{ src: "/images/pwa-icons/android-chrome-192x192.png", sizes: "192x192" }],
      },
    ],
    screenshots: [
      {
        src: "/images/pwa-icons/desktop-screenshot.png",
        sizes: "1200x630",
        type: "image/png",
        form_factor: "wide",
        label: "Desktop view of Darenz Hicap Portfolio",
      },
      {
        src: "/images/pwa-icons/mobile-screenshot.png",
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
        label: "Mobile view of Darenz Hicap Portfolio",
      },
    ],
  };
}
