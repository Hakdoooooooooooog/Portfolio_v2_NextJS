import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Darenz Jasper Hicap — Full-Stack & Cloud Infrastructure Engineer",
    short_name: "Darenz Hicap",
    description:
      "Personal engineering portfolio of Darenz Jasper Hicap. Full-stack TypeScript systems, AWS & Terraform infrastructure, and practical AI tooling.",
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
        icons: [
          { src: "/images/pwa-icons/android-chrome-192x192.png", sizes: "192x192" },
        ],
      },
      {
        name: "Experience",
        short_name: "Experience",
        description: "View engineering background and work history",
        url: "/#experiences",
        icons: [
          { src: "/images/pwa-icons/android-chrome-192x192.png", sizes: "192x192" },
        ],
      },
      {
        name: "About & Stack",
        short_name: "About",
        description: "Inspect engineering approach, stack, and credentials",
        url: "/#skills",
        icons: [
          { src: "/images/pwa-icons/android-chrome-192x192.png", sizes: "192x192" },
        ],
      },
      {
        name: "Contact",
        short_name: "Contact",
        description: "Direct email and links",
        url: "/#contact",
        icons: [
          { src: "/images/pwa-icons/android-chrome-192x192.png", sizes: "192x192" },
        ],
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
