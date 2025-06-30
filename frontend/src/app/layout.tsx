import "./globals.css"; // MUST be first

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HealthEcho Symptom Analyzer",
  description: "AI-powered symptom checker built with Next.js & TailwindCSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
