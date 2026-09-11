import React from "react";
import { COMPANY_INFO } from "@/lib/data";

interface FAQItem {
  q: string;
  a: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface StructuredDataProps {
  type?: "home" | "faq" | "breadcrumb" | "page";
  faqs?: FAQItem[];
  breadcrumbs?: BreadcrumbItem[];
  pageTitle?: string;
  pageDescription?: string;
  pageUrl?: string;
  serviceType?: string;
}

export default function StructuredData({
  type = "home",
  faqs,
  breadcrumbs,
  pageTitle,
  pageDescription,
  pageUrl = "https://sky-quest-holidays.web.app",
  serviceType,
}: StructuredDataProps) {
  const schemas: any[] = [];

  // 1. TravelAgency / LocalBusiness Schema (Always relevant for local SEO in Namakkal)
  if (type === "home") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "@id": "https://sky-quest-holidays.web.app/#travelagency",
      name: COMPANY_INFO.name,
      alternateName: ["Sky Quest Holidays Namakkal", "Sky Quest Tour Operator"],
      url: "https://sky-quest-holidays.web.app",
      logo: "https://sky-quest-holidays.web.app/images/logo.png",
      image: "https://sky-quest-holidays.web.app/images/logo.png",
      description:
        "Premier tour operator in Namakkal, Tamil Nadu offering customized South India holiday packages, college industrial visits (IV), Kerala backwater tours, and domestic family trips.",
      telephone: "+917338710611",
      email: COMPANY_INFO.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Namakkal Main Road",
        addressLocality: "Namakkal",
        addressRegion: "Tamil Nadu",
        postalCode: "627015",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "11.2189",
        longitude: "78.1674",
      },
      areaServed: [
        { "@type": "City", name: "Namakkal" },
        { "@type": "City", name: "Salem" },
        { "@type": "City", name: "Erode" },
        { "@type": "City", name: "Tiruchirappalli" },
        { "@type": "State", name: "Tamil Nadu" },
        { "@type": "Country", name: "India" },
      ],
      priceRange: "₹₹",
      identifier: COMPANY_INFO.govtRegNumber,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "500",
        bestRating: "5",
        worstRating: "1",
      },
      sameAs: [
        "https://www.facebook.com/skyquestholidays",
        "https://www.instagram.com/skyquestholidays",
      ],
    });

    // 2. WebSite Schema (Google Search Site Name Official Standard)
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://sky-quest-holidays.web.app/#website",
      name: "Sky Quest Holidays",
      alternateName: [
        "Sky Quest Holidays",
        "SkyQuest Holidays",
        "Sky Quest",
        "Sky Quest Holidays Namakkal",
        "SQH"
      ],
      url: "https://sky-quest-holidays.web.app/",
      description: "Best travel agency and tour operator in Namakkal, Tamil Nadu.",
      publisher: {
        "@id": "https://sky-quest-holidays.web.app/#travelagency",
      },
    });
  }

  // 3. FAQPage Schema (For Google Rich Snippets & AI/ChatGPT search engines)
  if (faqs && faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    });
  }

  // 4. BreadcrumbList Schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((b, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: b.name,
        item: b.url,
      })),
    });
  }

  // 5. WebPage Schema for SEO Landing Pages
  if (pageTitle && pageDescription) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: pageTitle,
      description: pageDescription,
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: COMPANY_INFO.name,
        url: "https://sky-quest-holidays.web.app",
      },
      about: {
        "@type": "TravelAgency",
        name: COMPANY_INFO.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Namakkal",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
      },
    });

    // 6. Schema.org Service Schema (Crucial for AI Engine Optimization & Service discovery)
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: serviceType || pageTitle,
      serviceType: serviceType || pageTitle,
      provider: {
        "@type": "TravelAgency",
        name: COMPANY_INFO.name,
        url: "https://sky-quest-holidays.web.app",
        telephone: "+917338710611",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Namakkal",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
      },
      areaServed: [
        { "@type": "State", name: "Tamil Nadu" },
        { "@type": "State", name: "Kerala" },
        { "@type": "State", name: "Karnataka" },
        { "@type": "Country", name: "India" },
      ],
      description: pageDescription,
      url: pageUrl,
    });
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
