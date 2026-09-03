import type { Metadata } from "next";
import { Outfit, Chakra_Petch, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const chakra = Chakra_Petch({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-chakra",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sky Quest Holidays | Best Tour Packages in Kerala, Tamil Nadu & International",
  description: "Sky Quest Holidays offers customized tour packages for Munnar, Ooty, Kodaikanal, Coorg, Goa, Thailand & Malaysia. Book honeymoon, family & college group tours at lowest rates.",
  keywords: ["Sky Quest Holidays", "Kerala tour packages", "Munnar tour", "Ooty package", "Kodaikanal tour", "Coorg tour", "Goa college IV", "Thailand tour package"],
  openGraph: {
    title: "Sky Quest Holidays - Explore Beyond Horizons",
    description: "Premium customized tour packages across South India & International destinations.",
    url: "https://skyquestholidays.com",
    siteName: "Sky Quest Holidays",
    images: [
      {
        url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
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
    <html lang="en" className={`${outfit.variable} ${chakra.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <WhatsAppWidget />
        <Footer />
      </body>
    </html>
  );
}
