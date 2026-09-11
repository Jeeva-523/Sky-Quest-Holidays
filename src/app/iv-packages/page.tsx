import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "College IV Packages (Industrial Visits) | SKY QUEST HOLIDAYS",
  description:
    "Explore thrilling and safe College IV packages across Kerala, Munnar, Vagamon, Bangalore & Goa with SKY QUEST HOLIDAYS. Luxury pushback AC buses, DJ nights, campfires, and faculty care.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/iv-packages",
  },
  openGraph: {
    title: "College IV Packages (Industrial Visits) | SKY QUEST HOLIDAYS",
    description:
      "All-inclusive college IV tour packages with factory walk-throughs, luxury 50-seater pushback buses, DJ nights, and campfire parties across South India.",
    url: "https://sky-quest-holidays.web.app/iv-packages",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "College IV Packages | SKY QUEST HOLIDAYS",
    description:
      "Unforgettable college IV trips with luxury buses, DJ night setups, factory visits, and verified security.",
  },
};

export default function IvPackagesPage() {
  const packages = INITIAL_PACKAGES.filter(
    (p) =>
      p.category === "college" ||
      p.id.includes("munnar") ||
      p.id.includes("vagamon") ||
      p.id.includes("goa")
  ).slice(0, 8);

  const guideSections: SeoGuideSection[] = [
    {
      title: "Thrilling & Safe College IV Packages Across South India",
      subtitle: "The Ultimate Balance of Academic Requirements and Unforgettable Memories",
      content:
        "College Industrial Visits (IV) are once-in-a-lifetime milestones for students. It's the trip where classmates bond before entering the professional world, create lifelong memories around campfires, and gain vital practical industry exposure.\n\nAt SKY QUEST HOLIDAYS, our College IV Packages are engineered specifically around student excitement and institutional safety. We provide luxury 40 and 50-seater AC pushback air-suspension buses with premium sound systems, private resort bookings that allow vibrant DJ nights and open campfires, delicious non-stop buffet catering, and verified factory walk-throughs.",
      bullets: [
        "Air-suspension luxury 40/50-seater pushback buses with powerful audio and dynamic lighting",
        "Private resort bookings featuring open-air campfires and verified DJ sound systems",
        "Curated student circuits: Kerala Highlands, Goa Beaches, and Karnataka Nature Trails",
        "Complimentary separate AC executive rooms and VIP hospitality for accompanying staff",
      ],
    },
    {
      title: "Student-Favorite IV Circuits",
      subtitle: "Most Popular Multi-Day College Itineraries",
      content:
        "• Kerala IV Circuit (Cochin – Munnar – Vagamon – Alleppey / 3D to 4D): Tea factory visit in Munnar, offroad jeep safari in Vagamon pine forests, and backwater views in Alleppey.\n• Goa Beach & Adventure IV (4D to 5D): Port logistics review, Calangute and Baga water sports, Mandovi river sunset cruise, and lively beach evenings.\n• Karnataka Tech & Adventure Circuit (3D/2N): Bangalore IT infrastructure walk-through, Mysore royal heritage palaces, and Coorg coffee plantation nature walks.\n• Dandeli & Coastal Karnataka IV: White water rafting on Kali River, jungle night safaris, and beach camping.",
    },
    {
      title: "Student Safety and Faculty Peace of Mind",
      subtitle: "Zero Tolerance for Compromises on Student Well-Being",
      content:
        "We coordinate closely with faculty coordinators to enforce strict security boundaries. Boys and girls are housed in separate secure wings or villas, alcohol-free premises are guaranteed where required by institutional rules, speed-regulated commercial drivers ensure safe night transit, and on-board tour managers manage all ticketing so professors enjoy a smooth trip.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "What makes SKY QUEST HOLIDAYS IV packages unique for college students?",
      a: "We combine top-tier student entertainment (luxury pushback buses with music systems, resort campfires, and DJ nights) with ironclad safety, separate luxury rooms for faculty coordinators, and official industry visit coordination.",
    },
    {
      q: "Are DJ nights and campfires included in the IV package?",
      a: "Yes, our packages include DJ audio setups and open campfire arrangements at our verified partner resorts, subject to local sound curfew regulations.",
    },
    {
      q: "Can the IV package itinerary be customized by student representatives?",
      a: "Absolutely. Student coordinators can select their preferred sightseeing spots, meal menus, travel dates, and activity choices.",
    },
    {
      q: "How can we get an immediate IV package quotation for our batch?",
      a: "Call or WhatsApp our team at +91 73387 10611 with your college name, department, batch size, and preferred destination. We provide a full itemized quote within minutes.",
    },
  ];

  const relatedLinks = [
    { title: "Industrial Visit Packages", href: "/industrial-visit-packages" },
    { title: "Industrial Visit Organizers", href: "/industrial-visit-organizers" },
    { title: "College Tour Packages", href: "/college-tour-packages" },
    { title: "College Excursion Packages", href: "/college-excursion-packages" },
    { title: "Student Tour Packages", href: "/student-tour-packages" },
    { title: "Tour Operators in Tamil Nadu", href: "/tour-operators-tamil-nadu" },
    { title: "All Tour Packages", href: "/tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="iv-packages"
      pageTitle="College IV Packages (Industrial Visits) | SKY QUEST HOLIDAYS"
      pageDescription="Thrilling and safe College IV packages across Kerala, Munnar, Vagamon, Bangalore & Goa. Luxury pushback AC buses, DJ nights, campfires, and faculty care."
      h1="College IV Packages (Industrial Visits) with Sightseeing & Campfire"
      badgeText="College IV Trip Specialist"
      heroSubtitle="Unforgettable student IV experiences: factory visits, luxury 50-seater pushback buses, resort campfire DJ nights, and complete faculty hospitality."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
      serviceType="College IV Tour Packages"
    />
  );
}
