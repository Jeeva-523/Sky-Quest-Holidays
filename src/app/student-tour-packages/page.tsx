import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Student Tour Packages with Safety & Care | SKY QUEST HOLIDAYS",
  description:
    "Explore budget-friendly student tour packages for schools and colleges across Tamil Nadu, Kerala & South India. Luxury transport, nutritious meals, verified security, and 24/7 tour managers.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/student-tour-packages",
  },
  openGraph: {
    title: "Student Tour Packages with Safety & Care | SKY QUEST HOLIDAYS",
    description:
      "All-inclusive student tour packages designed for safety, education, and fun. Luxury pushback buses, verified student resorts, and faculty hospitality.",
    url: "https://sky-quest-holidays.web.app/student-tour-packages",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Tour Packages | SKY QUEST HOLIDAYS",
    description:
      "Safe, fun, and transparently priced student tour packages for schools and colleges in South India.",
  },
};

export default function StudentTourPackagesPage() {
  const packages = INITIAL_PACKAGES.filter(
    (p) =>
      p.category === "college" ||
      p.id.includes("munnar") ||
      p.id.includes("ooty")
  ).slice(0, 8);

  const guideSections: SeoGuideSection[] = [
    {
      title: "Student Tour Packages Designed for Safety, Learning & Fun",
      subtitle: "Transparent Per-Student Pricing with Dedicated On-Tour Supervision",
      content:
        "Traveling as a student group requires careful coordination, transparent budgeting, and unwavering attention to safety. At SKY QUEST HOLIDAYS, we have organized student tours for hundreds of schools, polytechnics, arts & science colleges, and engineering universities.\n\nOur student tour packages are structured to provide maximum value per student. We combine luxury air-suspension pushback transport, safe and vetted hotel/resort accommodations with separate wings for male and female students, wholesome buffet dining, pre-arranged entry tickets, and full-time on-tour managers.",
      bullets: [
        "Fixed, transparent per-student pricing with zero hidden surcharges",
        "Complimentary separate AC executive rooms and dining care for accompanying teachers",
        "Vetted student resorts with enclosed security perimeters and clear guidelines",
        "Luxury pushback coaches with commercial speed-regulated drivers and first aid",
      ],
    },
    {
      title: "What Makes Our Student Packages Reliable?",
      subtitle: "Built Around the Needs of Institutions, Parents & Students",
      content:
        "• Health & Hygiene: We prioritize clean, freshly cooked South Indian and North Indian buffet meals from certified kitchens.\n• Safe Pacing: Itineraries are designed with realistic driving hours, avoiding late-night travel on risky mountain stretches.\n• Educational Value: Sightseeing is balanced with experiential learning, museum visits, and nature walks.\n• Faculty Support: Accompanying staff are freed from vendor negotiations so they can supervise students comfortably.",
    },
    {
      title: "How to Book a Student Tour Package",
      subtitle: "Simple, Transparent Institutional Coordination",
      content:
        "Contact our student travel desk via phone or WhatsApp at +91 73387 10611. Share your student strength, faculty count, preferred travel dates, and destination. We provide a detailed PDF proposal with itinerary breakdowns and cost calculations for management or principal approval.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "What is the average cost per student for student tour packages?",
      a: "Depending on duration (2, 3, or 4 days) and destination, student packages generally range from ₹2,500 to ₹5,500 per student, covering private luxury transport, hotel stays, all buffet meals, sightseeing tickets, and on-tour manager services.",
    },
    {
      q: "Do you accommodate dietary requirements for students?",
      a: "Yes. Our buffet spreads cater to both vegetarian and non-vegetarian students, with provisions for specific dietary requirements upon advance notice.",
    },
    {
      q: "How are rooms allocated for students and faculty?",
      a: "Students are accommodated in clean, comfortable rooms (typically 3 or 4 sharing based on budget), with strict separation between male and female wings. Accompanying faculty receive private executive AC rooms.",
    },
    {
      q: "What emergency support is provided on student tours?",
      a: "Every bus carries a medical first-aid kit, and our on-tour manager maintains direct contact with verified clinics and hospitals along the route.",
    },
  ];

  const relatedLinks = [
    { title: "Educational Tours", href: "/educational-tours" },
    { title: "Educational Tour Packages", href: "/educational-tour-packages" },
    { title: "College Tour Packages", href: "/college-tour-packages" },
    { title: "Industrial Visit Packages", href: "/industrial-visit-packages" },
    { title: "College Excursion Packages", href: "/college-excursion-packages" },
    { title: "Tour Operators in Tamil Nadu", href: "/tour-operators-tamil-nadu" },
    { title: "All Tour Packages", href: "/tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="student-tour-packages"
      pageTitle="Student Tour Packages with Safety & Care | SKY QUEST HOLIDAYS"
      pageDescription="Budget-friendly student tour packages for schools and colleges across Tamil Nadu & South India. Luxury transport, nutritious meals, and 24/7 tour managers."
      h1="Student Tour Packages with Complete Safety & 24/7 Tour Coordination"
      badgeText="Student Travel Specialist"
      heroSubtitle="Transparent per-student pricing: luxury pushback AC buses, verified student accommodations, healthy buffet meals, and complete faculty care across South India."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
      serviceType="Student Tour Packages"
    />
  );
}
