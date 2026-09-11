import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Educational Tour Packages for Students | SKY QUEST HOLIDAYS",
  description:
    "Explore transparently priced educational tour packages for school and college students across Tamil Nadu, Kerala, and Karnataka. Luxury transport, guided museum and factory visits, and verified security.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/educational-tour-packages",
  },
  openGraph: {
    title: "Educational Tour Packages for Students | SKY QUEST HOLIDAYS",
    description:
      "All-inclusive educational tour packages with private luxury buses, student-friendly buffets, verified accommodations, and official industry entry permits.",
    url: "https://sky-quest-holidays.web.app/educational-tour-packages",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Educational Tour Packages for Students | SKY QUEST HOLIDAYS",
    description:
      "Budget-friendly, high-safety educational tour packages for colleges and schools in South India.",
  },
};

export default function EducationalTourPackagesPage() {
  const packages = INITIAL_PACKAGES.filter(
    (p) =>
      p.category === "college" ||
      p.id.includes("munnar") ||
      p.id.includes("ooty")
  ).slice(0, 8);

  const guideSections: SeoGuideSection[] = [
    {
      title: "All-Inclusive Educational Tour Packages",
      subtitle: "Transparent Per-Student Pricing with Complete Logistical Management",
      content:
        "SKY QUEST HOLIDAYS specializes in curated, transparently budgeted educational tour packages for schools, colleges, and university departments. We understand that educational institutions require rigorous financial accountability and predictable budgeting. Every educational package we provide includes detailed line-item cost breakdowns covering pushback bus transportation, state permits, toll and parking charges, clean student resort stays, nutritious meals, and all pre-booked entrance tickets.\n\nThere are zero hidden charges or on-trip surprises. Accompanying staff and faculty coordinators enjoy complimentary stays and executive dining facilities, allowing teachers to focus entirely on supervising students rather than negotiating local logistics.",
      bullets: [
        "Clear, itemized per-student quote including transport, food, stays, and permits",
        "Complimentary separate AC executive rooms and hospitality for accompanying faculty",
        "Pre-arranged entrance passes to museums, tea factories, planetariums, and national parks",
        "Flexible 2-day, 3-day, and 4-day circuits customized to your syllabus and calendar",
      ],
    },
    {
      title: "Popular Educational Tour Package Circuits",
      subtitle: "Field-Tested Itineraries Across South India",
      content:
        "• Circuit 1: Nilgiri Botanical & Ecology Package (2D/1N or 3D/2N) — Ooty Botanical Gardens, Rose Garden, Pykara Lake, Doddabetta Peak, Tea Factory, and Mudumalai Nature Reserve.\n• Circuit 2: Munnar Tea & High-Altitude Biodiversity Package (3D/2N) — Tea Processing Museum, Mattupetty Dam, Echo Point, Eravikulam National Park, and spice plantations.\n• Circuit 3: Mysore Heritage & Bangalore Science Hub (3D/2N) — Mysore Palace, Srirangapatna Fort, Chamundi Hills, Visvesvaraya Technological Museum, and Bannerghatta National Park.\n• Circuit 4: Kerala Agro-Industry & Backwaters (3D/2N) — Kochi Fort historical zone, Mangrove island boating, and traditional agricultural practices.",
    },
    {
      title: "How We Coordinate Institutional Bookings",
      subtitle: "Step-by-Step Clarity from Proposal to Tour Completion",
      content:
        "1. Requirement Analysis: Share your institutional department, expected student strength, and budget.\n2. Custom Proposal: We share an itemized PDF quotation with schedule details, hotel options, and menu plans.\n3. Institutional Approvals: We provide necessary documentation and vehicle tax permits for university clearance.\n4. Flawless Execution: On the day of departure, our luxury coach and on-tour manager arrive at your college or school campus on time.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "What is the cost per student for an educational tour package?",
      a: "Pricing depends on duration, destination, and student strength. On average, multi-day educational packages range from ₹2,500 to ₹5,500 per student, covering luxury pushback bus travel, hotel stays, buffet meals, sightseeing tickets, and on-tour manager support. Contact us for an exact itemized quotation.",
    },
    {
      q: "Are teacher and faculty accommodations included in educational tour packages?",
      a: "Yes. In all institutional educational tours, accompanying professors and teachers receive complimentary separate executive AC rooms with prioritized room service and meals.",
    },
    {
      q: "What meals are provided on student educational packages?",
      a: "We provide hygienic South Indian and North Indian buffet meals (Breakfast, Lunch, and Dinner). Menus include wholesome options with evening tea and snacks.",
    },
    {
      q: "Can educational tour packages be booked during weekends or holidays?",
      a: "Yes. We operate educational tours throughout the academic year, including weekends, semester breaks, and government holidays.",
    },
  ];

  const relatedLinks = [
    { title: "Educational Tours", href: "/educational-tours" },
    { title: "Industrial Visit Packages", href: "/industrial-visit-packages" },
    { title: "College Tour Packages", href: "/college-tour-packages" },
    { title: "Student Tour Packages", href: "/student-tour-packages" },
    { title: "Group Tour Packages", href: "/group-tour-packages" },
    { title: "Customized Tour Packages", href: "/customized-tour-packages" },
    { title: "Tour Operators in Tamil Nadu", href: "/tour-operators-tamil-nadu" },
    { title: "All Tour Packages", href: "/tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="educational-tour-packages"
      pageTitle="Educational Tour Packages for Students | SKY QUEST HOLIDAYS"
      pageDescription="Transparently priced educational tour packages for colleges and schools. Luxury transport, guided educational visits, verified security, and faculty hospitality."
      h1="Educational Tour Packages with Curriculum-Aligned Itineraries"
      badgeText="Transparent Per-Student Pricing"
      heroSubtitle="All-inclusive educational tours with luxury pushback AC buses, verified student accommodations, healthy buffet meals, and official entry permits across South India."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
      serviceType="Educational Tour Packages"
    />
  );
}
