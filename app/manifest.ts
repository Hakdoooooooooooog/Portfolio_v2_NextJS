import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hicap's Portfolio",
    short_name: "Hicap Portfolio",
    description:
      "My personal portfolio showcasing my skills and projects as a Full Stack Developer.",
    start_url: "/",
    display: "standalone",
    background_color: "#f0f4f8",
    theme_color: "#0b1120",
    orientation: "portrait",
    dir: "ltr",
    lang: "en",
    icons: [
      {
        src: "/images/pwa-icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/pwa-icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/pwa-icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/images/pwa-icons/desktop-screenshot.png",
        sizes: "1200x630",
        type: "image/png",
        form_factor: "wide",
        label:
          "Desktop view of Hicap's Portfolio showcasing projects and skills",
      },
      {
        src: "/images/pwa-icons/mobile-screenshot.png",
        sizes: "1200x630",
        type: "image/png",
        form_factor: "narrow",
        label: "Mobile view of Hicap's Portfolio with responsive design",
      },
    ],
  };
}
