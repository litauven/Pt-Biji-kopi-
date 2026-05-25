import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { AppProvider } from "../context/AppContext";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["italic", "normal"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "PT Biji Kopi Nusantara | Premium Indonesian Specialty Coffee Beans",
  description: "Direct-trade organic single-origin specialty coffee beans from Gayo, Toraja, Kintamani, Flores, and Java. Micro-roasted to thermodynamic perfection and shipped fresh.",
  keywords: ["kopi nusantara", "specialty coffee", "indonesian coffee beans", "biji kopi premium", "aceh gayo", "toraja sapan", "bali kintamani honey", "flores bajawa", "java preanger", "pt biji kopi nusantara"],
  authors: [{ name: "PT Biji Kopi Nusantara" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-warm-cream text-espresso-dark">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

