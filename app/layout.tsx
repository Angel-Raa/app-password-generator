import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/lib/provider/query-provider";

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
  themeColor: "#ffffff"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
