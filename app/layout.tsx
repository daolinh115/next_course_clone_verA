import type { Metadata } from "next";
import { Martian_Mono, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import LightRays from '@/components/LightRays'
import NavBar from "@/components/NavBar";

const martinMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted-grotest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vacation web Hub",
  description: "Where you can share everything about web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${martinMono.variable} ${schibsted.variable} antialiased min-h-screen`}
      >
        <NavBar />
        <div className="absolute z-[-1] inset-0 min-h-screen">
            <LightRays
              raysOrigin="top-center"
              raysColor="#00ffff"
              raysSpeed={0.7}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="custom-rays"
            />
        </div>
        <main className="flex-center">
          {children}  
        </main>
      </body>
    </html>
  );
}
