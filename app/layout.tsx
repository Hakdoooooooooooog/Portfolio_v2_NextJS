import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/portfolio/components/Navbar";
import Footer from "@/portfolio/components/footer";
import { themeInitScript } from "@/portfolio/components/theme-script";
import SplashScreen from "@/portfolio/components/splash-screen";
import PwaRegister from "@/portfolio/components/pwa-register";
import {
  SITE_URL,
  aboutData,
  socialLinks,
} from "@/portfolio/utils/constants";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
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
  title: "Darenz Jasper Hicap — Full-Stack & Cloud Infrastructure Engineer",
  description:
    "Personal engineering portfolio of Darenz Jasper Hicap. Full-stack TypeScript systems, AWS & Terraform infrastructure, and practical AI tooling.",
  authors: [{ name: "Darenz Jasper A. Hicap" }],
  keywords: [
    "Darenz Jasper Hicap",
    "Full-Stack Engineer",
    "Full-Stack Developer",
    "Next.js",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Terraform",
    "AWS",
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
      {
        url: "/images/pwa-icons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/pwa-icons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/pwa-icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Darenz Jasper Hicap — Full-Stack & Cloud Infrastructure Engineer",
    description:
      "Building reliable full-stack systems, cloud infrastructure, and practical AI tooling with Next.js, NestJS, TypeScript, PostgreSQL, and Terraform.",
    url: SITE_URL,
    siteName: "Darenz Jasper Hicap",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Darenz Jasper Hicap — Full-Stack & Cloud Infrastructure Engineer",
    description:
      "Building reliable full-stack systems, cloud infrastructure, and practical AI tooling.",
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
      jobTitle: "Full-Stack Developer",
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
        "Terraform",
        "Amazon Web Services",
        "Full-Stack Development",
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Darenz Jasper Hicap — Engineering Portfolio",
      about: { "@id": `${SITE_URL}/#person` },
      isPartOf: {
        "@type": "WebSite",
        name: "Darenz Jasper Hicap",
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
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} transition-colors duration-200 ease-in-out`}
    >
      <body
        className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <script
          id="theme-script"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SplashScreen />
        <PwaRegister />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
