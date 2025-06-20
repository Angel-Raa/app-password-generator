import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Password Generator",
  description:
    "Genera contraseñas seguras y aleatorias fácilmente con nuestra aplicación.",
  keywords: [
    "password",
    "generator",
    "contraseña",
    "seguridad",
    "aleatorio",
    "app",
  ],
  authors: [{ name: "Angel Aguero" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Password Generator",
    description:
      "Genera contraseñas seguras y aleatorias fácilmente con nuestra aplicación.",
    url: "https://your-app-url.com",
    siteName: "Password Generator",
    locale: "es_ES",
    type: "website",
  },
  themeColor: "#ffffff",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
