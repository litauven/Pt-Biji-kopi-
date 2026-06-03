import type { Metadata, Viewport } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import { AppProvider } from "../context/AppContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://acewinmello.com"),
  title: "PT Acewin Mello International | Trading & Industrial Solutions",
  description: "An Indonesian trading and solution company specializing in Food Ingredients, Technology Solutions, Industrial Machinery, and Commercial Cooking Equipment.",
  keywords: [
    "PT Acewin Mello International",
    "Indonesia Trading Company",
    "Food Ingredients Supplier Indonesia",
    "Coffee Supplier Indonesia",
    "Spice Supplier Indonesia",
    "Industrial Machinery Supplier Indonesia",
    "Software Development Indonesia",
    "AI Solutions Indonesia"
  ],
  authors: [{ name: "PT Acewin Mello International" }],
  openGraph: {
    title: "PT Acewin Mello International",
    description: "Premium Food Ingredients, Innovative Technology, and Industrial Machinery from Indonesia.",
    url: "https://acewinmello.com",
    siteName: "PT Acewin Mello International",
    images: [
      {
        url: "/og-image.jpg", // Make sure to add this image later
        width: 1200,
        height: 630,
        alt: "PT Acewin Mello International B2B Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PT Acewin Mello International",
    description: "Empowering Industries Through Quality Products, Technology & Industrial Solutions.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-zinc-950 font-sans">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
