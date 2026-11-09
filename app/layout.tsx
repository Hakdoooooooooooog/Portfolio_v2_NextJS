import type { Metadata, Viewport } from "next";
import { Fraunces, Noto_Sans, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/portfolio/components/Navbar";
import Footer from "@/portfolio/components/footer";
import ThemeScript from "@/portfolio/components/theme-script";
import SplashScreen from "@/portfolio/components/splash-screen";
import PwaRegister from "@/portfolio/components/pwa-register";
import {
  SITE_URL,
  aboutData,
  socialLinks,
} from "@/portfolio/utils/constants";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  display: "swap",
});

const notoSansMono = Noto_Sans_Mono({
  variable: "--font-noto-sans-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  weight: "variable",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F7FB" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0F2C" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Darenz Jasper Hicap — Junior Full-Stack Developer",
  description:
    "Personal portfolio of Darenz Jasper Hicap, Junior Full-Stack Developer. Production projects, system architecture, verified credentials, and contact.",
  authors: [{ name: "Darenz Jasper A. Hicap" }],
  keywords: [
    "Darenz Jasper Hicap",
    "Junior Full-Stack Developer",
    "Full-Stack Developer",
    "Next.js",
    "NestJS",
    "TypeScript",
    "React",
    "PostgreSQL",
    "Redis",
    "Docker",
    "AWS",
    "Software Engineer",
    "Philippines",
  ],
  creator: "Darenz Jasper A. Hicap",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Hicap Portfolio",
  },
  icons: {
    icon: [
      { url: "/images/pwa-icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/pwa-icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/images/pwa-icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Darenz Jasper Hicap — Full-Stack Developer",
    description:
      "Full-stack developer building robust web applications end-to-end with Next.js, NestJS, TypeScript, and PostgreSQL.",
    url: SITE_URL,
    siteName: "Darenz Jasper Hicap Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Darenz Jasper Hicap — Junior Full-Stack Developer",
    description:
      "Junior full-stack developer building web applications end-to-end with Next.js, NestJS, TypeScript, and PostgreSQL.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: aboutData.name,
      jobTitle: "Junior Full-Stack Developer",
      url: SITE_URL,
      email: aboutData.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cavite",
        addressCountry: "Philippines",
      },
      sameAs: socialLinks.map((s) => s.href),
      knowsAbout: [
        "TypeScript",
        "React",
        "Next.js",
        "NestJS",
        "PostgreSQL",
        "Redis",
        "Docker",
        "Amazon Web Services",
        "Full-Stack Development",
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Darenz Jasper Hicap — Junior Full-Stack Developer Portfolio",
      about: { "@id": `${SITE_URL}/#person` },
      isPartOf: {
        "@type": "WebSite",
        name: "Darenz Jasper Hicap Portfolio",
        url: SITE_URL,
      },
    },
  ],
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
      className={`${notoSans.variable} ${notoSansMono.variable} ${fraunces.variable} transition-colors duration-300 ease-in-out`}
    >
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${notoSans.variable} ${notoSansMono.variable} ${fraunces.variable} antialiased`}
      >
        <SplashScreen />
        <PwaRegister />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
