import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "College Excursion Packages & Adventure Trips | SKY QUEST HOLIDAYS",
  description:
    "Plan thrilling college excursion packages and graduation batch trips with SKY QUEST HOLIDAYS. Luxury pushback AC buses, DJ nights, campfires, adventure sports, and faculty care across South India.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/college-excursion-packages",
  },
  openGraph: {
    title: "College Excursion Packages & Adventure Trips | SKY QUEST HOLIDAYS",
    description:
      "Action-packed college excursion packages with luxury coaches, verified adventure activities, campfire evenings, and dedicated faculty care.",
    url: "https://sky-quest-holidays.web.app/college-excursion-packages",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "College Excursion Packages | SKY QUEST HOLIDAYS",
    description:
      "Top-rated college excursion trips with luxury buses, DJ parties, and adventure activities across Kerala, Goa & Karnataka.",
  },
};

export default function CollegeExcursionPackagesPage() {
  const packages = INITIAL_PACKAGES.filter(
    (p) =>
      p.category === "college" ||
      p.id.includes("goa") ||
      p.id.includes("vagamon") ||
      p.id.includes("ooty")
  ).slice(0, 8);

  const guideSections: SeoGuideSection[] = [
    {
      title: "Exciting College Excursion Packages Across South India",
      subtitle: "Unforgettable Batch Trips, Graduation Tours, and Adventure Escapes",
      content:
        "A college excursion is more than just sightseeing — it is the ultimate celebration of student life, camaraderie, and shared milestones. Whether it's a final-year farewell trip, a departmental bonding excursion, or an adventure-seeking holiday, SKY QUEST HOLIDAYS crafts excursions that deliver high adrenaline and non-stop fun while maintaining complete safety.\n\nWe provide luxury 40 and 50-seater pushback air-suspension coaches fitted with high-performance audio systems, verified resort bookings with campfire and DJ party arrangements, professional adventure guides, and separate executive accommodations for faculty coordinators.",
      bullets: [
        "Air-suspension luxury pushback buses with vibrant party sound systems and LED lighting",
        "Curated adventure activities: offroad jeep safaris, river rafting, trekking, and beach sports",
        "Private resort venues with open-air campfires and verified DJ sound permissions",
        "VIP faculty care: complimentary executive AC rooms and dedicated tour manager support",
      ],
    },
    {
      title: "Top Student Excursion Destinations",
      subtitle: "Where College Batches Love to Travel",
      content:
        "1. Goa Beach & Adventure Excursion (4D/3N or 5D/4N): Water sports at Baga/Calangute, sunset Mandovi river cruise, beach volleyball, and heritage church tours.\n2. Vagamon & Munnar Highland Adventure (3D/2N): Offroad 4x4 jeep safaris through misty pine valleys, paragliding viewpoints, campfire barbecue, and tea estate walks.\n3. Dandeli & Gokarna Rafting Expedition: White water rafting on Kali River, jungle night safaris, and beach camping.\n4. Ooty & Kodaikanal Mountain Tour: Mountain train rides, pine forest trekking, boating, and scenic ridge viewpoints.",
    },
    {
      title: "Student Safety and Faculty Peace of Mind",
      subtitle: "Professional Oversight on Every College Journey",
      content:
        "Student excursions require experienced leadership. Our on-board tour managers coordinate all timings, hotel check-ins, meals, and ticketing so that faculty coordinators can relax. Resorts are thoroughly vetted for student security, clean dining facilities, and clear boundaries.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "What is included in a college excursion package?",
      a: "Our packages include round-trip luxury AC pushback bus transport, verified resort accommodations, buffet meals, DJ night setup, campfire, sightseeing entrance permits, toll/parking charges, and an experienced on-tour manager.",
    },
    {
      q: "Can students customize the excursion itinerary?",
      a: "Yes. Student representatives and staff can customize the destinations, days, activity choices (water sports, jeep safaris, trekking), and meal menus.",
    },
    {
      q: "Are separate rooms provided for professors and staff?",
      a: "Yes. In all our college packages, accompanying professors receive complimentary private executive AC rooms with prioritized hospitality.",
    },
    {
      q: "How can student coordinators get a quote for their batch?",
      a: "Call or WhatsApp our team at +91 73387 10611 with your college name, batch strength, and desired destination for an immediate itemized PDF quote.",
    },
  ];

  const relatedLinks = [
    { title: "College Tour Packages", href: "/college-tour-packages" },
    { title: "College IV Packages", href: "/iv-packages" },
    { title: "Industrial Visit Packages", href: "/industrial-visit-packages" },
    { title: "Student Tour Packages", href: "/student-tour-packages" },
    { title: "Group Tour Packages", href: "/group-tour-packages" },
    { title: "Tour Operators in Tamil Nadu", href: "/tour-operators-tamil-nadu" },
    { title: "All Tour Packages", href: "/tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="college-excursion-packages"
      pageTitle="College Excursion Packages & Adventure Trips | SKY QUEST HOLIDAYS"
      pageDescription="Thrilling college excursion packages and graduation batch trips with SKY QUEST HOLIDAYS. Luxury pushback AC buses, DJ nights, campfires, and faculty care."
      h1="College Excursion Packages & Adventure Trips"
      badgeText="College Excursion Specialist"
      heroSubtitle="Unforgettable student excursions: luxury 50-seater pushback buses, resort campfires, DJ nights, thrilling adventure activities, and complete faculty care."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
      serviceType="College Excursion Packages"
    />
  );
}
