import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer";
import CyberBackground from "./components/CyberBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhi | AI Engineer & Full Stack Architect",
  description: "Abhilash's Portfolio - AI Engineer, Full Stack Architect, Generative AI & Agentic Systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#030712] bg-grid-pattern text-white relative overflow-x-hidden selection:bg-[#00f2fe]/30 selection:text-white`}
      >
        <CyberBackground />
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen pt-20 relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
