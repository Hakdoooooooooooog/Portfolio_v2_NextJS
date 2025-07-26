import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hicap's Portfolio",
    short_name: "Hicap Portfolio",
    description:
      "Portfolio of Hicap showcasing projects, skills, and experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    orientation: "portrait",
    dir: "ltr",
    lang: "en",
    icons: [
      {
        src: "/images/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/images/desktop-screenshot.png",
        sizes: "1200x630",
        type: "image/png",
        form_factor: "wide",
        label:
          "Desktop view of Hicap's Portfolio showcasing projects and skills",
      },
      {
        src: "/images/mobile-screenshot.png",
        sizes: "1200x630",
        type: "image/png",
        form_factor: "narrow",
        label: "Mobile view of Hicap's Portfolio with responsive design",
      },
    ],
  };
}
