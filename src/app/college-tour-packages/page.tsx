import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "College Tour Packages from Tamil Nadu | SKY QUEST HOLIDAYS – Tour Operator",
  description:
    "Looking for the best college tour operator in Tamil Nadu? SKY QUEST HOLIDAYS organizes college IV trips, educational tours to Kerala, Goa, Munnar & Ooty with luxury buses, DJ nights, and faculty accommodations.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/college-tour-packages",
  },
  openGraph: {
    title: "College Tour Packages from Tamil Nadu | SKY QUEST HOLIDAYS",
    description:
      "Premier college tour operator in Tamil Nadu. Complete IV packages with luxury 50-seater pushback buses, DJ nights, campfires, and verified security.",
    url: "https://sky-quest-holidays.web.app/college-tour-packages",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "College Tour Packages from Tamil Nadu | SKY QUEST HOLIDAYS",
    description:
      "Top-rated college tour operator in Tamil Nadu. Custom college industrial visits and group excursions.",
  },
};

export default function CollegeTourPackagesPage() {
  // Select packages popular for college groups
  const packages = INITIAL_PACKAGES.filter(
    (p) =>
      p.category === "college" ||
      p.id.includes("munnar") ||
      p.id.includes("vagamon") ||
      p.id.includes("ooty") ||
      p.id.includes("goa") ||
      p.id.includes("wayanad")
  ).slice(0, 8);

  const guideSections: SeoGuideSection[] = [
    {
      title: "Premier College Tour Operator in Tamil Nadu",
      subtitle: "Safe, Exciting & Educational College IV Packages",
      content:
        "SKY QUEST HOLIDAYS is recognized as the leading college tour operator in Tamil Nadu, organizing memorable Industrial Visits (IV) and graduation tours for engineering, arts, science, and medical colleges across Chennai, Coimbatore, Salem, Namakkal, Trichy, and Madurai.\n\nWe understand the unique balance needed for an exceptional college trip: thrilling adventure activities, memorable DJ nights with campfires, comfortable luxury transport, verified factory/industrial visits for curriculum requirements, and ironclad safety standards with separate, premium accommodations for accompanying faculty members.",
      bullets: [
        "Luxury 40 & 50-seater AC pushback air-suspension buses with powerful audio systems",
        "Exclusive DJ sound & lights setups and open campfire arrangements at private resorts",
        "Complimentary separate AC rooms and personalized hospitality for faculty coordinators",
        "24/7 dedicated on-board tour manager to coordinate logistics, entry passes, and schedule",
      ],
    },
    {
      title: "Top College Tour Destinations from Tamil Nadu",
      subtitle: "Most Popular Student Itineraries Curated by SKY QUEST HOLIDAYS",
      content:
        "Based on our experience organizing hundreds of college tours, here are the top student-favorite destinations:\n\n1. Kerala Circuit (Cochin – Munnar – Vagamon – Alleppey): 3 to 4 days of misty hill stations, jeep safaris, pine forests, tea estates, and houseboats.\n2. Goa Beach & Adventure Tour: 4 to 5 days including North & South Goa beaches, water sports at Calangute/Baga, Mandovi river cruise, and heritage churches.\n3. Ooty & Kodaikanal Mountain Retreat: 2 to 3 days of scenic mountain viewpoints, botanical gardens, pine forests, boating, and chocolate factories.\n4. Dandeli & Gokarna Adventure IV: White water river rafting, jungle night campfires, trekking, and beach camping.\n5. Mysore – Coorg – Chikmagalur: Coffee plantation tours, river rafting, historical palaces, and bamboo rafting.",
      bullets: [
        "Kerala Hills & Backwaters (Munnar, Vagamon, Alleppey, Wayanad)",
        "Goa Sun & Sand (Calangute, Baga, Water Sports, Sunset Cruise)",
        "Karnataka Adventures (Dandeli White Water Rafting, Coorg Coffee Valleys)",
        "Tamil Nadu Hill Stations (Ooty, Kodaikanal, Yercaud)",
      ],
    },
    {
      title: "Student Safety, Permissions & Teacher Hospitality",
      subtitle: "Why HODs and College Principals Trust SKY QUEST HOLIDAYS",
      content:
        "College tours require meticulous planning. We provide official industry invitation letters and documentation required for university permissions. Our hotels and resorts undergo strict background screening to ensure student safety, clean buffet catering (North/South Indian menus), and secure boundaries. Accompanying staff and professors receive dedicated executive rooms with prioritized service.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "Which travel agency in Namakkal and Tamil Nadu is best for college tour packages?",
      a: "SKY QUEST HOLIDAYS is rated as one of the best college tour operators in Tamil Nadu, based out of Namakkal. We have successfully conducted over 150+ college industrial visits (IV) with luxury buses, DJ nights, campfires, and comprehensive safety protocols.",
    },
    {
      q: "What is included in SKY QUEST HOLIDAYS college tour packages?",
      a: "Our college packages include round-trip luxury AC pushback bus transport, hotel/resort accommodations (separate for boys, girls, and faculty), buffet meals, DJ night setup, campfire, sightseeing entry permits, toll/parking charges, and an on-tour manager.",
    },
    {
      q: "Do you arrange official permissions for Industrial Visits (IV)?",
      a: "Yes, we assist college departments with formal industry visit request letters, schedule coordination with manufacturing units, tea factories, IT hubs, or power plants along your travel route.",
    },
    {
      q: "Can college tour itineraries be customized?",
      a: "Yes, 100%! The student coordinators and staff can adjust the number of days, destinations, DJ night durations, adventure activities, and meal preferences.",
    },
    {
      q: "How can student coordinators get a group quote?",
      a: "Call or WhatsApp our dedicated group travel desk at +91 73387 10611. Provide your college name, branch, expected student count, dates, and destination for an immediate itemized quote.",
    },
  ];

  const relatedLinks = [
    { title: "Industrial Visit Packages", href: "/industrial-visit-packages" },
    { title: "College IV Packages", href: "/iv-packages" },
    { title: "College Excursion Packages", href: "/college-excursion-packages" },
    { title: "Student Tour Packages", href: "/student-tour-packages" },
    { title: "Tour Operators in Tamil Nadu", href: "/tour-operators-tamil-nadu" },
    { title: "Educational Tours", href: "/educational-tours" },
    { title: "Kerala Tour Packages", href: "/kerala-tour-packages" },
    { title: "All Tour Packages", href: "/tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="college-tour-packages"
      pageTitle="College Tour Packages from Tamil Nadu | SKY QUEST HOLIDAYS"
      pageDescription="Experienced college tour operator in Tamil Nadu organizing college IV trips, educational tours to Kerala, Goa, Munnar & Ooty with luxury buses, DJ nights, and faculty care."
      h1="College Tour Packages from Tamil Nadu – SKY QUEST HOLIDAYS"
      badgeText="Tamil Nadu College IV Specialist"
      heroSubtitle="Exciting, safe, and flawlessly organized college industrial visits and group tours. Luxury pushback AC buses, DJ nights, campfires, and verified faculty rooms."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
      serviceType="College Tour Operator Services"
    />
  );
}
