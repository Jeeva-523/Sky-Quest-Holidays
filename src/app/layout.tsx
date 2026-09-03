import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, Chakra_Petch } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const chakra = Chakra_Petch({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-chakra",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "SKY QUEST Holidays | Best Tour Packages",
  description: "Book affordable tour packages across Tamil Nadu, Kerala, Karnataka and all over India with SKY QUEST Holidays.",
  keywords: ["Sky Quest Holidays", "Kerala tour packages", "Munnar tour", "Ooty package", "Kodaikanal tour", "Coorg tour", "Goa college IV", "Thailand tour package"],
  openGraph: {
    title: "SKY QUEST Holidays",
    description: "Affordable Tour Packages & Holiday Trips",
    url: "https://sky-quest-holidays.web.app/",
    siteName: "SKY QUEST Holidays",
    images: [
      {
        url: "https://res.cloudinary.com/dciyanu4f/image/upload/v1785239912/bqhxhtx5ozwnhmzcr22u.png",
        width: 600,
        height: 600,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable} ${chakra.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Audiowide&family=Bruno+Ace+SC&family=Playfair+Display:ital,wght@1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans text-base antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <WhatsAppWidget />
        <Footer />
      </body>
    </html>
  );
}
