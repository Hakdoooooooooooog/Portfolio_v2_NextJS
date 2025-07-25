import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import ThemeProvider from "../components/theme-provider";
import ThemeScript from "../components/theme-script";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const notoSansMono = Noto_Sans_Mono({
  variable: "--font-noto-sans-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hicap's Portfolio",
  description:
    "Welcome to my portfolio! Explore my projects, skills, and experiences as a Full Stack Developer.",
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
  metadataBase: new URL("https://darenzhicap.netlify.app"),
  openGraph: {
    title: "Hicap's Portfolio - Full Stack Developer",
    description:
      "Welcome to my portfolio! Explore my projects, skills, and experiences as a Full Stack Developer specializing in React, Next.js, and TypeScript.",
    url: "https://darenzhicap.netlify.app",
    siteName: "Hicap's Portfolio",
    images: [
      {
        url: "https://darenzhicap.netlify.app/images/site-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Hicap's Portfolio - Full Stack Developer Showcase",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hicap's Portfolio - Full Stack Developer",
    description:
      "Welcome to my portfolio! Explore my projects, skills, and experiences as a Full Stack Developer.",
    images: ["https://darenzhicap.netlify.app/images/site-thumbnail.png"],
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
      </head>
      <body
        className={`${notoSans.variable} ${notoSansMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
