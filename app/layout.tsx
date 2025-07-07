import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";

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
    "Welcome to my portfolio! Explore my projects, skills, and experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${notoSansMono.variable} antialiased`}
      >
        <header>
          <Navbar />
        </header>
        {children}
        <footer className="text-center p-4 bg-gray-100 dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} Hicap&apos;s Portfolio. All rights
            reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
