import type { Metadata } from "next";
import { Fraunces, Noto_Sans, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import ThemeScript from "../components/theme-script";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const notoSansMono = Noto_Sans_Mono({
  variable: "--font-noto-sans-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hicap's Portfolio",
  description:
    "Personal portfolio of Darenz Jasper Hicap — Full Stack Developer. Projects, skills, and experience.",
  authors: [{ name: "Darenz Hicap" }],
  keywords: [
    "Portfolio",
    "Web Development",
    "Projects",
    "Next.js",
    "React",
    "TypeScript",
    "Full Stack Developer",
    "Darenz Hicap",
  ],
  creator: "Darenz Hicap",
  metadataBase: new URL("https://darenzhicap.dev"),
  openGraph: {
    title: "Hicap's Portfolio - Full Stack Developer",
    description:
      "Full Stack Developer working with React, Next.js, and TypeScript. See my projects, skills, and experience.",
    url: "https://darenzhicap.dev",
    siteName: "Hicap's Portfolio",
    images: [
      {
        url: "https://darenzhicap.dev/images/site-thumbnail.webp",
        width: 1200,
        height: 720,
        alt: "Hicap's Portfolio - Full Stack Developer Showcase",
        type: "image/webp",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hicap's Portfolio - Full Stack Developer",
    description:
      "Full Stack Developer working with React, Next.js, and TypeScript. See my projects, skills, and experience.",
    images: ["https://darenzhicap.dev/images/site-thumbnail.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className="transition-colors duration-300 ease-in-out"
    >
      <head>
        <ThemeScript />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/pwa-icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/pwa-icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/pwa-icons/favicon-16x16.png"
        />
      </head>
      <body
        className={`${notoSans.variable} ${notoSansMono.variable} ${fraunces.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
