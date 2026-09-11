import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Industrial Visit Organizers in Tamil Nadu | SKY QUEST HOLIDAYS",
  description:
    "Looking for experienced industrial visit organizers in Tamil Nadu? SKY QUEST HOLIDAYS handles complete IV tour planning, industry permission letters, luxury transport, and student safety across South India.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/industrial-visit-organizers",
  },
  openGraph: {
    title: "Industrial Visit Organizers in Tamil Nadu | SKY QUEST HOLIDAYS",
    description:
      "Expert industrial visit organizers helping colleges across Tamil Nadu with seamless IV tours, factory walk-throughs, and luxury group transport.",
    url: "https://sky-quest-holidays.web.app/industrial-visit-organizers",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industrial Visit Organizers in Tamil Nadu | SKY QUEST HOLIDAYS",
    description:
      "Professional industrial visit organizers for engineering, arts, and science colleges in Tamil Nadu.",
  },
};

export default function IndustrialVisitOrganizersPage() {
  const packages = INITIAL_PACKAGES.filter(
    (p) =>
      p.category === "college" ||
      p.id.includes("munnar") ||
      p.id.includes("cochin") ||
      p.id.includes("vagamon")
  ).slice(0, 8);

  const guideSections: SeoGuideSection[] = [
    {
      title: "Professional Industrial Visit Organizers in Tamil Nadu",
      subtitle: "Relieving Faculty and Student Coordinators from Complex Logistics",
      content:
        "Organizing an Industrial Visit (IV) for 50 to 120 college students involves complex logistics: coordinating with factory plant directors for entry permits, booking luxury commercial buses that comply with state inter-state tax norms, screening student-safe resorts, organizing buffet catering, and securing campfire and audio permits.\n\nAs professional industrial visit organizers based in Namakkal, Tamil Nadu, SKY QUEST HOLIDAYS shoulders this entire responsibility. We act as your single-point operational partner, ensuring that your college IV is executed with precision, punctuality, and complete peace of mind for accompanying staff members.",
      bullets: [
        "Single-point operational management for transportation, stays, meals, and industry visits",
        "Direct network of luxury 40 and 50-seater pushback air-suspension coaches",
        "Pre-verified resorts with enclosed perimeters and dedicated security staff",
        "Experienced full-time tour managers accompanying every college group",
      ],
    },
    {
      title: "What Sets Us Apart from Generic Travel Agents",
      subtitle: "Specialized Student Travel Protocol & Institutional Understanding",
      content:
        "Generic travel agents often book random hotels and unverified third-party buses that can lead to breakdown delays, inadequate food, or safety issues. In contrast, SKY QUEST HOLIDAYS specializes in institutional group travel:\n\n• Verified Driver Credentials: Our drivers are commercially licensed with years of mountain and inter-state highway experience.\n• Faculty Hospitality: Accompanying HODs and professors are given separate executive accommodations, prioritized check-in, and personalized assistance.\n• Emergency Preparedness: First-aid kits on board, direct hospital contacts along the route, and 24/7 helpline access to our central operations desk.",
    },
    {
      title: "How to Collaborate with Our Planning Desk",
      subtitle: "Transparent, Step-by-Step Coordination for College Committees",
      content:
        "1. Initial Discussion: Share your college branch, expected count, and tentative travel dates.\n2. Itinerary Drafting: We present 2 to 3 curated circuit options balancing company visits with leisure viewpoints.\n3. Institutional Paperwork: We supply vehicle permits, driver contact cards, and hotel confirmations needed for principal approvals.\n4. Flawless Execution: Our tour manager coordinates daily timings, meal services, and entry passes from start to finish.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "Why should colleges hire an industrial visit organizer rather than planning independently?",
      a: "Planning independently exposes colleges to risks like unverified bus breakdowns, hidden state tax fines, poor hotel food, and scheduling mismatches with factories. A specialized organizer handles all logistics, guarantees vehicle reliability, secures bulk group rates, and provides on-site emergency support.",
    },
    {
      q: "Which colleges does SKY QUEST HOLIDAYS organize IV trips for?",
      a: "We organize IV trips for engineering, arts, science, polytechnic, and management institutions across Namakkal, Salem, Erode, Coimbatore, Tiruchirappalli, Madurai, Chennai, and throughout Tamil Nadu.",
    },
    {
      q: "Do you provide tour managers on the bus?",
      a: "Yes. Every college tour is accompanied by a professional tour manager who manages hotel room allocations, toll plaza transitions, restaurant coordination, and sightseeing passes.",
    },
    {
      q: "How early should a college committee contact SKY QUEST HOLIDAYS?",
      a: "We recommend booking 3 to 6 weeks in advance, especially during peak academic IV seasons (August to March), to ensure first-choice luxury coaches and resort availability.",
    },
  ];

  const relatedLinks = [
    { title: "Industrial Visit Packages", href: "/industrial-visit-packages" },
    { title: "College IV Packages", href: "/iv-packages" },
    { title: "College Tour Packages", href: "/college-tour-packages" },
    { title: "Educational Tours", href: "/educational-tours" },
    { title: "Tour Operators in Tamil Nadu", href: "/tour-operators-tamil-nadu" },
    { title: "Group Tour Packages", href: "/group-tour-packages" },
    { title: "All Tour Packages", href: "/tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="industrial-visit-organizers"
      pageTitle="Industrial Visit Organizers in Tamil Nadu | SKY QUEST HOLIDAYS"
      pageDescription="Experienced industrial visit organizers in Tamil Nadu providing turnkey college IV tour packages, company visits, luxury transport, and faculty care."
      h1="Industrial Visit Organizers in Tamil Nadu & South India"
      badgeText="Trusted Institutional Tour Partner"
      heroSubtitle="End-to-end college IV organization: company permission liaison, luxury 50-seater pushback buses, verified student resorts, and 24/7 on-tour management."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
      serviceType="Industrial Visit Organization"
    />
  );
}
