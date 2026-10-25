import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sweta Kardam | Software Engineer & Full-Stack Developer",
  description:
    "Portfolio of Sweta Kardam, a Computer Science undergraduate and full-stack developer specializing in React, Node.js, Express, and MongoDB.",
  generator: "v0.app",
  openGraph: {
    title: "Sweta Kardam | Software Engineer & Full-Stack Developer",
    description:
      "Portfolio of Sweta Kardam, a Computer Science undergraduate and full-stack developer specializing in React, Node.js, Express, and MongoDB.",
    type: "website",
    images: [
      { url: "/favicon.png", width: 512, height: 512, alt: "SK monogram" },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#123024",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-[#f6f1e7]">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
