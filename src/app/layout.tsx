import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, Chakra_Petch } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

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
  metadataBase: new URL("https://sky-quest-holidays.web.app"),
  applicationName: "SKY QUEST Holidays",
  appleWebApp: {
    title: "SKY QUEST Holidays",
    statusBarStyle: "default",
    capable: true,
  },
  title: {
    default: "SKY QUEST Holidays | Tour Operators & Educational Tour Packages",
    template: "%s | SKY QUEST Holidays",
  },
  description:
    "Sky Quest Holidays offers educational tours, industrial visit packages, college excursions, group tours and customized travel packages across South India.",
  keywords: [
    "Tour Operators",
    "Tour Operators in Tamil Nadu",
    "Tour Operators in South India",
    "Educational Tour Operators",
    "Educational Tours",
    "Educational Tour Packages",
    "College Tour Packages",
    "College Educational Tours",
    "Industrial Visit Packages",
    "Industrial Visit Organizers",
    "Industrial Visit Packages in Tamil Nadu",
    "Industrial Visit Organizers in Tamil Nadu",
    "IV Packages",
    "IV Tour Packages",
    "College IV Packages",
    "Group Tour Packages",
    "Group Tours in Tamil Nadu",
    "Customized Tour Packages",
    "Customized Tours in South India",
    "Student Tour Packages",
    "College Excursion Packages",
    "Best travel agency in Namakkal",
    "Sky Quest Holidays",
  ],
  alternates: {
    canonical: "https://sky-quest-holidays.web.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "SKY QUEST Holidays | Tour Operators & Educational Tour Packages",
    description:
      "Sky Quest Holidays offers educational tours, industrial visit packages, college excursions, group tours and customized travel packages across South India.",
    url: "https://sky-quest-holidays.web.app/",
    siteName: "SKY QUEST Holidays",
    images: [
      {
        url: "https://res.cloudinary.com/dciyanu4f/image/upload/v1785239912/bqhxhtx5ozwnhmzcr22u.png",
        width: 600,
        height: 600,
        alt: "SKY QUEST Holidays - Best Travel Agency & Tour Operator in Namakkal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SKY QUEST Holidays | Tour Operators & Educational Tour Packages",
    description: "Educational tours, college IV packages, and customized South India tour packages.",
    images: ["https://res.cloudinary.com/dciyanu4f/image/upload/v1785239912/bqhxhtx5ozwnhmzcr22u.png"],
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
        <meta name="google-site-verification" content="rcByJrq3QdCjzyW-htDw-onjd5Q5Lqp0Qk1W299hvP0" />
        <meta name="application-name" content="SKY QUEST Holidays" />
        <meta name="apple-mobile-web-app-title" content="SKY QUEST Holidays" />
        <meta property="og:site_name" content="SKY QUEST Holidays" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Audiowide&family=Bruno+Ace+SC&family=Playfair+Display:ital,wght@1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans text-base antialiased">
        <StructuredData type="home" />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <WhatsAppWidget />
        <Footer />
      </body>
    </html>
  );
}
